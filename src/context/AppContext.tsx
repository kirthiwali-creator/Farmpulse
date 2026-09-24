import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { 
  Language, 
  UserRole, 
  UserProfile, 
  ProduceListing, 
  Deal, 
  AppNotification 
} from '../types';
import { 
  CURRENT_FARMER_PROFILE, 
  INITIAL_PRODUCE_LISTINGS, 
  INITIAL_DEALS, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';
import { throttledFetch, isUnderRateLimitCooldown } from '../utils/apiClient';

export type NavigationTab = 
  | 'home' 
  | 'dashboard' 
  | 'prices' 
  | 'ai-prediction' 
  | 'add-produce' 
  | 'marketplace' 
  | 'deals' 
  | 'admin' 
  | 'presentation'
  | 'profile'
  | 'datasources';

interface AppContextType {
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  farmerProfile: UserProfile;
  setFarmerProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  listings: ProduceListing[];
  addListing: (listing: Omit<ProduceListing, 'id' | 'farmerId' | 'farmerName' | 'farmerLocation' | 'inquiriesCount' | 'listedAt'>) => void;
  deals: Deal[];
  createDeal: (deal: Omit<Deal, 'id' | 'farmerId' | 'farmerName' | 'createdAt' | 'contractHash'>) => Deal;
  updateDealStatus: (dealId: string, newStatus: Deal['status']) => void;
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  selectedCropId: string;
  setSelectedCropId: (cropId: string) => void;
  selectedMandiId: string;
  setSelectedMandiId: (mandiId: string) => void;
  isRunInstructionsOpen: boolean;
  setIsRunInstructionsOpen: (open: boolean) => void;
  t: (key: string) => string;
  demoStep: number;
  jumpToDemoStep: (step: number) => void;
  backendConnected: boolean;
}

const UI_TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    appName: 'Farmpulse',
    tagline: 'SIH26132: Smart Market Linkages & Price Discovery for Farmers',
    home: 'Home',
    dashboard: 'Kisan Dashboard',
    prices: 'Mandi Discovery',
    aiPrediction: 'AI Hold/Sell Forecast',
    addProduce: 'List Harvest',
    marketplace: 'Direct Buyers',
    deals: 'Deals & Escrow',
    admin: 'Mandi Radar',
    presentation: 'PPT Slides & Guide',
    profile: 'Kisan Profile',
    datasources: 'Data Sources & APIs',
    netRealization: 'Net In-Hand Payout',
    distanceToMandi: 'Distance to Mandi',
    freightDeduction: 'Transport Cost Deduction',
    holdVsSell: 'AI Hold vs Sell Advice',
    verifiedBuyers: 'Verified Direct Buyers',
    digitalEscrow: 'Digital Escrow Safeguard',
    quickDemoJudge: 'SIH Feature Tour'
  },
  hi: {
    appName: 'फार्मपल्स (Farmpulse)',
    tagline: 'किसानों के लिए पारदर्शी मंडी भाव और सीधा बाजार',
    home: 'होम',
    dashboard: 'किसान डैशबोर्ड',
    prices: 'मंडी भाव खोज',
    aiPrediction: 'AI रोको या बेचो सलाह',
    addProduce: 'फसल लिस्ट करें',
    marketplace: 'सीधे खरीदार (FPO)',
    deals: 'समझौते और बैंक भुगतान',
    admin: 'राज्य मंडी निगरानी',
    presentation: 'प्रेजेंटेशन (PPT स्लाइड)',
    profile: 'किसान प्रोफाइल (KCC)',
    datasources: 'डेटा स्रोत और API',
    netRealization: 'हाथ में शुद्ध बचत',
    distanceToMandi: 'मंडी की दूरी',
    freightDeduction: 'ट्रक भाड़ा कटौती',
    holdVsSell: 'AI भाव भविष्यवाणी',
    verifiedBuyers: 'सत्यापित खरीदार',
    digitalEscrow: 'सुरक्षित एस्क्रो भुगतान',
    quickDemoJudge: 'SIH प्रस्तुति टूर'
  },
  kn: {
    appName: 'ಫಾರ್ಮ್‌ಪಲ್ಸ್ (Farmpulse)',
    tagline: 'ರೈತರಿಗೆ ನೇರ ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಪಾರದರ್ಶಕ ಬೆಲೆ ಶೋಧನೆ',
    home: 'ಮುಖಪುಟ',
    dashboard: 'ರೈತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    prices: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು',
    aiPrediction: 'AI ಬೆಲೆ ಭವಿಷ್ಯವಾಣಿ',
    addProduce: 'ಬೆಳೆ ಪಟ್ಟಿ ಮಾಡಿ',
    marketplace: 'ನೇರ ಖರೀದಿದಾರರು',
    deals: 'ಒಪ್ಪಂದಗಳು ಮತ್ತು ಪಾವತಿ',
    admin: 'ಎಪಿಎಂಸಿ ವಿಶ್ಲೇಷಣೆ',
    presentation: 'ಪಿಪಿಟಿ ಸ್ಲೈಡ್‌ಗಳು',
    profile: 'ರೈತ ಪ್ರೊಫೈಲ್',
    datasources: 'ಮಾಹಿತಿ ಮೂಲಗಳು & API',
    netRealization: 'ಕೈಗೆ ಸಿಗುವ ನಿವ್ವಳ ಹಣ',
    distanceToMandi: 'ಮಾರುಕಟ್ಟೆ ದೂರ',
    freightDeduction: 'ಸಾರಿಗೆ ವೆಚ್ಚ ಕಡಿತ',
    holdVsSell: 'AI ಕಾಯಿರಿ ಅಥವಾ ಮಾರಿ ಸಲಹೆ',
    verifiedBuyers: 'ದೃಢೀಕೃತ ಖರೀದಿದಾರರು',
    digitalEscrow: 'ಸುರಕ್ಷಿತ ಬ್ಯಾಂಕ್ ಪಾವತಿ',
    quickDemoJudge: 'ಡೆಮೊ ಟೂರ್'
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRole] = useState<UserRole>('farmer');
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<NavigationTab>('home'); // Default to full website homepage!
  const [farmerProfile, setFarmerProfile] = useState<UserProfile>(CURRENT_FARMER_PROFILE);
  const [selectedCropId, setSelectedCropId] = useState<string>('onion');
  const [selectedMandiId, setSelectedMandiId] = useState<string>('mandi-01');
  const [isRunInstructionsOpen, setIsRunInstructionsOpen] = useState<boolean>(false);
  const [demoStep, setDemoStep] = useState<number>(1);
  const [backendConnected, setBackendConnected] = useState<boolean>(false);
  const [backendMeta, setBackendMeta] = useState<{ uptimeSeconds?: number; geminiConfigured?: boolean } | null>(null);
  const isSyncingRef = useRef(false);

  // Sync with backend API on mount with throttling, debouncing, and 429 backoff
  useEffect(() => {
    let isMounted = true;

    async function syncWithBackend() {
      // Guard against overlapping sync calls
      if (isSyncingRef.current) return;
      // Skip background polling if browser tab is hidden
      if (typeof document !== 'undefined' && document.hidden) return;
      // Skip polling if 429 rate limit backoff is active
      if (isUnderRateLimitCooldown()) {
        return;
      }

      isSyncingRef.current = true;
      try {
        const data = await throttledFetch('/api/health', {}, { 
          cacheTtlMs: 30000, 
          throttleMs: 4000, 
          isBackgroundSync: true 
        });

        if (isMounted) {
          setBackendConnected(true);
          setBackendMeta({ uptimeSeconds: data.uptimeSeconds, geminiConfigured: data.geminiConfigured });
        }

        // Slight stagger to prevent simultaneous socket congestion
        await new Promise(r => setTimeout(r, 250));

        // Fetch live listings from backend
        try {
          const listData = await throttledFetch('/api/listings', {}, { 
            cacheTtlMs: 30000, 
            throttleMs: 4000, 
            isBackgroundSync: true 
          });
          if (isMounted && Array.isArray(listData?.data) && listData.data.length > 0) {
            setListings(prev => {
              // Avoid unnecessary state re-renders if content hasn't changed
              if (prev.length === listData.data.length && prev[0]?.id === listData.data[0]?.id) {
                return prev;
              }
              return listData.data;
            });
          }
        } catch {
          // Gracefully fallback to local state
        }

        // Slight stagger
        await new Promise(r => setTimeout(r, 250));

        // Fetch live deals from backend
        try {
          const dealsData = await throttledFetch('/api/deals', {}, { 
            cacheTtlMs: 30000, 
            throttleMs: 4000, 
            isBackgroundSync: true 
          });
          if (isMounted && Array.isArray(dealsData?.data) && dealsData.data.length > 0) {
            setDeals(prev => {
              // Avoid unnecessary state re-renders if content hasn't changed
              if (prev.length === dealsData.data.length && prev[0]?.id === dealsData.data[0]?.id && prev[0]?.status === dealsData.data[0]?.status) {
                return prev;
              }
              return dealsData.data;
            });
          }
        } catch {
          // Gracefully fallback to local state
        }
      } catch {
        if (isMounted) {
          setBackendConnected(false);
        }
      } finally {
        isSyncingRef.current = false;
      }
    }

    // Initial sync
    syncWithBackend();

    // Relaxed 45-second poll interval to prevent 429 rate limit exhaustion
    const interval = setInterval(syncWithBackend, 45000);

    // Also sync when user switches back to this tab
    const handleVisibilityChange = () => {
      if (!document.hidden && !isUnderRateLimitCooldown()) {
        syncWithBackend();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isMounted = false;
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Persistent listings
  const [listings, setListings] = useState<ProduceListing[]>(() => {
    try {
      const saved = localStorage.getItem('farmpulse_listings');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCE_LISTINGS;
    } catch {
      return INITIAL_PRODUCE_LISTINGS;
    }
  });

  // Persistent deals
  const [deals, setDeals] = useState<Deal[]>(() => {
    try {
      const saved = localStorage.getItem('farmpulse_deals');
      return saved ? JSON.parse(saved) : INITIAL_DEALS;
    } catch {
      return INITIAL_DEALS;
    }
  });

  // Persistent notifications
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const saved = localStorage.getItem('farmpulse_notifs');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('farmpulse_listings', JSON.stringify(listings));
    } catch {
      // ignore
    }
  }, [listings]);

  useEffect(() => {
    try {
      localStorage.setItem('farmpulse_deals', JSON.stringify(deals));
    } catch {
      // ignore
    }
  }, [deals]);

  useEffect(() => {
    try {
      localStorage.setItem('farmpulse_notifs', JSON.stringify(notifications));
    } catch {
      // ignore
    }
  }, [notifications]);

  const addListing = (newListingData: Omit<ProduceListing, 'id' | 'farmerId' | 'farmerName' | 'farmerLocation' | 'inquiriesCount' | 'listedAt'>) => {
    const newListing: ProduceListing = {
      ...newListingData,
      id: `list-${Date.now().toString().slice(-4)}`,
      farmerId: farmerProfile.id,
      farmerName: farmerProfile.name,
      farmerLocation: `${farmerProfile.location}, ${farmerProfile.state}`,
      inquiriesCount: 1,
      listedAt: 'Just now'
    };

    setListings(prev => [newListing, ...prev]);

    // Asynchronously notify backend if running with throttling
    throttledFetch('/api/listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newListing)
    }, { throttleMs: 1000, isBackgroundSync: true }).catch(() => {});

    // Add alert notification
    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: 'Produce Listed Successfully',
      message: `${newListing.quantityQuintals} Quintals of ${newListing.cropName} listed at ₹${newListing.expectedPricePerQuintal}/Q. Verified buyers notified!`,
      timestamp: 'Just now',
      type: 'system',
      read: false,
      actionUrl: 'marketplace'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const createDeal = (dealData: Omit<Deal, 'id' | 'farmerId' | 'farmerName' | 'createdAt' | 'contractHash'>): Deal => {
    const newDeal: Deal = {
      ...dealData,
      id: `DEAL-2026-${Math.floor(100 + Math.random() * 900)}`,
      farmerId: farmerProfile.id,
      farmerName: farmerProfile.name,
      contractHash: '0x' + Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      createdAt: 'Just now'
    };

    setDeals(prev => [newDeal, ...prev]);

    throttledFetch('/api/deals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newDeal)
    }, { throttleMs: 1000, isBackgroundSync: true }).catch(() => {});

    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `Deal Agreement Created: ${newDeal.id}`,
      message: `Direct contract created with ${newDeal.buyerName} for ₹${newDeal.totalDealValue.toLocaleString('en-IN')}. Escrow initiated.`,
      timestamp: 'Just now',
      type: 'deal_update',
      read: false,
      actionUrl: 'deals'
    };
    setNotifications(prev => [notif, ...prev]);

    return newDeal;
  };

  const updateDealStatus = (dealId: string, newStatus: Deal['status']) => {
    setDeals(prev => prev.map(d => d.id === dealId ? { ...d, status: newStatus } : d));

    throttledFetch(`/api/deals/${encodeURIComponent(dealId)}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    }, { throttleMs: 1000, isBackgroundSync: true }).catch(() => {});

    const notif: AppNotification = {
      id: `notif-${Date.now()}`,
      title: `Deal ${dealId} Status Updated`,
      message: `Status transitioned to "${newStatus}".`,
      timestamp: 'Just now',
      type: 'deal_update',
      read: false,
      actionUrl: 'deals'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const jumpToDemoStep = (step: number) => {
    setDemoStep(step);
    switch (step) {
      case 1:
        setActiveTab('presentation');
        break;
      case 2:
        setActiveTab('prices');
        setSelectedCropId('onion');
        break;
      case 3:
        setActiveTab('ai-prediction');
        setSelectedCropId('onion');
        break;
      case 4:
        setActiveTab('marketplace');
        break;
      case 5:
        setActiveTab('dashboard');
        break;
      case 6:
        setActiveTab('add-produce');
        break;
      case 7:
        setActiveTab('deals');
        break;
      case 8:
        setActiveTab('admin');
        break;
      case 9:
        setActiveTab('datasources');
        break;
      default:
        setActiveTab('presentation');
    }
  };

  const t = (key: string): string => {
    return UI_TRANSLATIONS[language]?.[key] || UI_TRANSLATIONS['en']?.[key] || key;
  };

  return (
    <AppContext.Provider
      value={{
        activeRole,
        setActiveRole,
        language,
        setLanguage,
        activeTab,
        setActiveTab,
        farmerProfile,
        setFarmerProfile,
        listings,
        addListing,
        deals,
        createDeal,
        updateDealStatus,
        notifications,
        markNotificationRead,
        selectedCropId,
        setSelectedCropId,
        selectedMandiId,
        setSelectedMandiId,
        isRunInstructionsOpen,
        setIsRunInstructionsOpen,
        t,
        demoStep,
        jumpToDemoStep,
        backendConnected
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
