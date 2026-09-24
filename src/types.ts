export type Language = 'en' | 'hi' | 'kn';
export type UserRole = 'farmer' | 'buyer' | 'admin';

export type DataSourceCategory = 
  | 'mandi_prices' 
  | 'enam_trade' 
  | 'weather_agromet' 
  | 'warehouses' 
  | 'retail_indices' 
  | 'logistics_fuel'
  | 'farmer_identity';

export interface DataSourceField {
  name: string;
  type: string;
  description: string;
  exampleValue: string;
}

export interface DataSourceInfo {
  id: string;
  name: string;
  shortName: string;
  organization: string;
  ministry: string;
  category: DataSourceCategory;
  portalUrl: string;
  apiEndpoint: string;
  resourceId?: string;
  syncFrequency: string;
  coverage: string;
  status: 'active' | 'syncing' | 'verified';
  latencyMs: number;
  lastSynced: string;
  reliabilityScore: number;
  license: string;
  recordsCountEstimate: string;
  description: string;
  keyFields: DataSourceField[];
  samplePayloadJson: string;
  usageInApp: string;
  openGovPortalId?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  phone: string;
  location: string;
  state: string;
  district: string;
  landAreaAcres?: number;
  kisanId?: string;
  verifiedKCC: boolean;
  avatarUrl?: string;
  preferredLanguage: Language;
}

export type CropCategory = 'Cereal' | 'Pulse' | 'Oilseed' | 'Vegetable' | 'Commercial' | 'Spice' | 'Fruit' | 'Flower' | 'Plantation' | 'Medicinal';

export interface Crop {
  id: string;
  name: string;
  hindiName: string;
  category: CropCategory;
  mspPrice: number; // Minimum Support Price in INR/Quintal (if applicable)
  unit: string;
  typicalShelfLifeDays: number;
}

export interface LiveCropRate {
  cropId: string;
  cropName: string;
  hindiName: string;
  category: CropCategory;
  variety: string;
  currentRateQuintal: number; // Current modal price in INR per quintal
  currentRateKg: number; // Rate in INR per kg
  minRateQuintal: number;
  maxRateQuintal: number;
  mspPrice: number; // Government Minimum Support Price (0 if not applicable)
  mspDifference: number; // Difference from MSP
  isAboveMsp: boolean;
  change24hAmount: number; // e.g. +45
  change24hPercent: number; // e.g. +1.8%
  trend: 'up' | 'down' | 'stable';
  benchmarkMandi: string;
  benchmarkDistrict: string;
  benchmarkState: string;
  dailyArrivalsMetricTonnes: number;
  tradingStatus: 'LIVE_TRADING' | 'MARKET_SETTLED_24_7';
  lastUpdatedTimestamp: string;
  lastUpdatedRelative: string;
  isPresentValue: boolean; // Explicitly confirms this is verified present market value
  dataSource: {
    name: string;
    code: string;
    resourceId: string;
    bulletinRef: string;
    verificationHash: string;
    license: string;
  };
  qualityStandard: string;
}

export interface CropPresentValueVerification {
  cropId: string;
  cropName: string;
  currentRateQuintal: number;
  currentRateKg: number;
  isPresentValue: boolean;
  verificationStatus: 'CONFIRMED_GENUINE_PRESENT_VALUE' | 'OUTDATED_OR_DISCREPANCY';
  auditTimestamp: string;
  verificationBadge: string;
  marketOpen247Status: string;
  benchmarks: {
    officialMsp: number | null;
    mspStatusText: string;
    apmcModalCorridorMin: number;
    apmcModalCorridorMax: number;
    isWithinCorridor: boolean;
    reportedArrivalsQuintals: number;
    reportedArrivalsTonnes: number;
  };
  reportingAPMCsCount: number;
  reportingMandis: {
    mandiName: string;
    district: string;
    state: string;
    modalPrice: number;
    minPrice: number;
    maxPrice: number;
    arrivalsQuintals: number;
    updatedAt: string;
  }[];
  regulatoryNotice: string;
  dataGovResourceId: string;
}

export interface CropSellPlace {
  id: string;
  name: string;
  type: 'Principal APMC Yard' | 'Sub-Market Yard' | 'e-NAM Integrated Mandi' | 'Rythu / Farmers Bazaar' | 'Gramin Rural Haat' | 'Specialized Commodity Yard';
  district: string;
  taluk: string; // Also known as Tehsil or Block
  state: string;
  pincode?: string;
  commoditiesHandled: string[];
  auctionTimings: string;
  facilities: string[];
  enamEnabled: boolean;
  contactHelpline?: string;
  dailyAvgVolumeTonnes: number;
}

export interface MandiRecord {
  id: string;
  mandiName: string;
  district: string;
  state: string;
  cropId: string;
  cropName: string;
  variety: string;
  modalPrice: number; // INR per quintal
  minPrice: number;
  maxPrice: number;
  dailyArrivalQuintals: number;
  priceTrend: 'up' | 'down' | 'stable';
  changePercent: number;
  distanceKmFromNashik: number;
  updatedAt: string;
}

export interface PriceHistoryPoint {
  date: string;
  modalPrice: number;
  arrivalQuintals: number;
  mandi: string;
}

export interface AIPredictionResult {
  cropId: string;
  cropName: string;
  currentPrice: number;
  predictedPrice7Days: number;
  predictedPrice14Days: number;
  recommendedAction: 'HOLD' | 'SELL_NOW' | 'STAGGER_SELL';
  expectedNetGainPercent: number;
  confidenceScore: number;
  holdingCostPerQuintalPerWeek: number;
  keyDrivers: {
    factor: string;
    impact: 'positive' | 'negative' | 'neutral';
    description: string;
  }[];
  forecastCurve: {
    day: number;
    date: string;
    predictedPrice: number;
    upperBand: number;
    lowerBand: number;
  }[];
  bestMandiRecommendation: {
    mandiName: string;
    distanceKm: number;
    grossPrice: number;
    transportCostPerQ: number;
    netRealizationPerQ: number;
    advantageOverLocalMandi: number;
  };
  aiInsightText: string;
}

export interface ProduceListing {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  cropId: string;
  cropName: string;
  variety: string;
  quantityQuintals: number;
  expectedPricePerQuintal: number;
  qualityGrade: 'Grade A (Export)' | 'Grade B (Standard)' | 'Grade C (Fair)';
  moisturePercent: number;
  storageCondition: 'Warehouse / Cold Storage' | 'Farm Shed' | 'Open Yard';
  harvestDate: string;
  availableUntil: string;
  status: 'Available' | 'Under Offer' | 'Sold';
  inquiriesCount: number;
  listedAt: string;
}

export interface Buyer {
  id: string;
  name: string;
  type: 'FPO / Cooperative' | 'Food Processor / Mill' | 'Institutional Buyer' | 'Retail Aggregator';
  location: string;
  state: string;
  distanceKm: number;
  rating: number;
  dealsCompleted: number;
  verifiedBuyer: boolean;
  activelyBuyingCrops: string[];
  buyingCapacityQuintals: number;
  offeredPriceRange: string;
  contactPerson: string;
  phone: string;
}

export interface Deal {
  id: string;
  listingId: string;
  farmerId: string;
  farmerName: string;
  buyerId: string;
  buyerName: string;
  cropName: string;
  quantityQuintals: number;
  agreedPricePerQuintal: number;
  totalDealValue: number;
  freightBearer: 'Buyer' | 'Farmer' | 'Shared 50-50';
  paymentTerms: '100% Escrow on Dispatch' | '50% Advance, 50% on Delivery' | 'Instant DBT on Weighbridge';
  status: 'Draft' | 'Offer Sent' | 'Accepted' | 'Dispatched' | 'Inspected' | 'Completed' | 'Disputed';
  pickupDate: string;
  contractHash: string;
  createdAt: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'price_alert' | 'deal_update' | 'buyer_inquiry' | 'system';
  read: boolean;
  actionUrl?: string;
}

export interface SlideAdvantage {
  audience: 'Farmer' | 'Buyer' | 'Government / Nation';
  benefit: string;
  simpleExplanation: string;
}

export interface SlideRealWorldExample {
  title: string;
  location: string;
  farmerName: string;
  crop: string;
  quantity: string;
  oldWayScenario: {
    description: string;
    pricePerQ: number;
    hiddenCosts: number;
    netInHand: number;
    totalEarnings: number;
  };
  newWayScenario: {
    description: string;
    pricePerQ: number;
    transparentCosts: number;
    netInHand: number;
    totalEarnings: number;
  };
  netExtraCash: number;
  keyLesson: string;
}

export interface PresentationSlide {
  id: number;
  slideNumber: number;
  title: string;
  simpleTitle: string; // Plain simple words
  subtitle: string;
  simpleSummary: string; // 1-2 sentences in simple, everyday language
  keyPoints: string[];
  simpleKeyPoints: string[]; // Bullet points in simple words
  advantages?: SlideAdvantage[];
  realWorldExample?: SlideRealWorldExample;
  metricsOrHighlight?: string;
  topicFocus: string;
  sihFocus: string;
  speakerNotes: string;
  suggestedAppTab?: string;
}
