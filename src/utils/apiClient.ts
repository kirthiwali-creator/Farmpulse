/**
 * Farmpulse Resilient API Client
 * Features:
 * - In-flight request deduplication (prevents duplicate simultaneous calls)
 * - Request throttling and debouncing (configurable intervals)
 * - Short-term response caching (TTL) for GET requests
 * - Infinite loop breaker (detects and suppresses runaway calls in React hooks)
 * - 429 Too Many Requests detection with automated exponential backoff
 */

interface CacheEntry<T = unknown> {
  data: T;
  timestamp: number;
}

interface ThrottleRecord {
  lastCallTime: number;
  callTimestamps: number[];
}

// In-flight promises map to deduplicate identical concurrent requests
const inFlightRequests = new Map<string, Promise<any>>();

// In-memory short-term response cache
const responseCache = new Map<string, CacheEntry>();

// Throttle records per endpoint to detect infinite loops and rapid fire
const endpointRecords = new Map<string, ThrottleRecord>();

// 429 Backoff State
let rateLimitCooldownUntil = 0;
let consecutive429Errors = 0;

const DEFAULT_CACHE_TTL_MS = 15000; // 15 seconds
const MIN_THROTTLE_INTERVAL_MS = 2500; // Min 2.5s between calls to same endpoint unless forced
const MAX_CALLS_PER_10_SECONDS = 5; // Infinite loop breaker threshold

/**
 * Checks if the API client is currently under a 429 rate limit backoff cooldown.
 */
export function isUnderRateLimitCooldown(): boolean {
  return Date.now() < rateLimitCooldownUntil;
}

/**
 * Returns remaining cooldown in seconds, or 0 if active.
 */
export function getRemainingCooldownSeconds(): number {
  const remaining = Math.ceil((rateLimitCooldownUntil - Date.now()) / 1000);
  return Math.max(0, remaining);
}

/**
 * Main Throttled and Resilient Fetch wrapper
 */
export async function throttledFetch<T = any>(
  url: string,
  options: RequestInit = {},
  config: {
    cacheTtlMs?: number;
    throttleMs?: number;
    forceFresh?: boolean;
    isBackgroundSync?: boolean;
  } = {}
): Promise<T> {
  const method = (options.method || 'GET').toUpperCase();
  const cacheKey = `${method}:${url}`;
  const now = Date.now();
  const cacheTtl = config.cacheTtlMs ?? DEFAULT_CACHE_TTL_MS;
  const throttleMs = config.throttleMs ?? MIN_THROTTLE_INTERVAL_MS;

  // 1. Check active 429 Rate Limit Cooldown
  if (now < rateLimitCooldownUntil) {
    const cached = responseCache.get(cacheKey);

    if (cached) {
      return cached.data as T;
    }

    if (config.isBackgroundSync) {
      throw new Error(`429 Too Many Requests: Backoff cooldown active`);
    }
  }

  // 2. Short-term Cache check for GET requests
  if (method === 'GET' && !config.forceFresh) {
    const cached = responseCache.get(cacheKey);
    if (cached && now - cached.timestamp < cacheTtl) {
      // Return cached without hitting network
      return cached.data as T;
    }
  }

  // 3. In-flight Request Deduplication
  // If the exact same request is already traveling across the wire, share the promise
  if (inFlightRequests.has(cacheKey)) {
    return inFlightRequests.get(cacheKey) as Promise<T>;
  }

  // 4. Infinite Loop Breaker & Rapid-Fire Throttling
  let record = endpointRecords.get(cacheKey);
  if (!record) {
    record = { lastCallTime: 0, callTimestamps: [] };
    endpointRecords.set(cacheKey, record);
  }

  // Prune call history older than 10 seconds
  record.callTimestamps = record.callTimestamps.filter(t => now - t < 10000);

  // Check for infinite loop symptom (> MAX_CALLS_PER_10_SECONDS in 10s window)
  if (record.callTimestamps.length >= MAX_CALLS_PER_10_SECONDS) {
    const waitTime = 5000;
    const cached = responseCache.get(cacheKey);
    if (cached) {
      return cached.data as T;
    }

    // Delay execution
    await new Promise(resolve => setTimeout(resolve, waitTime));
  } else if (method === 'GET' && now - record.lastCallTime < throttleMs && !config.forceFresh) {
    // Normal throttle: small throttle delay
    const delayNeeded = throttleMs - (now - record.lastCallTime);
    await new Promise(resolve => setTimeout(resolve, delayNeeded));
  }

  // Record this attempt
  record.lastCallTime = Date.now();
  record.callTimestamps.push(Date.now());

  // 5. Execute Request with In-Flight Tracking
  const fetchPromise = (async () => {
    try {
      const response = await fetch(url, options);

      // Handle 429 Too Many Requests
      if (response.status === 429) {
        consecutive429Errors++;
        // Exponential backoff: 10s, 20s, 40s (max 60s)
        const backoffSeconds = Math.min(60, 10 * Math.pow(2, consecutive429Errors - 1));
        rateLimitCooldownUntil = Date.now() + backoffSeconds * 1000;

        // Check if server sent Retry-After header
        const retryAfter = response.headers.get('Retry-After');
        if (retryAfter) {
          const parsedSeconds = parseInt(retryAfter, 10);
          if (!isNaN(parsedSeconds) && parsedSeconds > 0) {
            rateLimitCooldownUntil = Date.now() + parsedSeconds * 1000;
          }
        }

        // Fallback to cache if available
        const cached = responseCache.get(cacheKey);
        if (cached) {
          return cached.data as T;
        }

        throw new Error(`HTTP 429: Too Many Requests. Cooling down for ${backoffSeconds}s.`);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      // Success! Reset consecutive 429 counter
      if (consecutive429Errors > 0) {
        consecutive429Errors = 0;
      }

      const data = await response.json();

      // Store in short-term cache for GET requests
      if (method === 'GET') {
        responseCache.set(cacheKey, {
          data,
          timestamp: Date.now()
        });
      }

      return data as T;
    } catch (err: any) {
      // If network error occurred but we have stale cache, provide it gracefully
      const cached = responseCache.get(cacheKey);
      if (cached && (err.message?.includes('429') || err.message?.includes('Failed to fetch'))) {
        return cached.data as T;
      }
      throw err;
    } finally {
      // Remove from in-flight map
      inFlightRequests.delete(cacheKey);
    }
  })();

  inFlightRequests.set(cacheKey, fetchPromise);
  return fetchPromise;
}

/**
 * Standard debounce utility function for search inputs and button handlers
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  waitMs: number = 350
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, waitMs);
  };
}

/**
 * Standard throttle utility function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limitMs: number = 1000
): (...args: Parameters<T>) => void {
  let lastRan = 0;
  let lastTimeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastRan >= limitMs) {
      func(...args);
      lastRan = now;
    } else {
      if (lastTimeout) clearTimeout(lastTimeout);
      lastTimeout = setTimeout(() => {
        func(...args);
        lastRan = Date.now();
      }, limitMs - (now - lastRan));
    }
  };
}
