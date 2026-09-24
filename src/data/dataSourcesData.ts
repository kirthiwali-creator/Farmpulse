import { DataSourceInfo } from '../types';

export const OFFICIAL_DATA_SOURCES: DataSourceInfo[] = [
  {
    id: 'agmarknet-prices-api',
    name: 'Agmarknet Daily Mandi Wholesale Prices & Arrivals',
    shortName: 'Agmarknet APMC',
    organization: 'Directorate of Marketing & Inspection (DMI)',
    ministry: 'Ministry of Agriculture & Farmers Welfare, Govt of India',
    category: 'mandi_prices',
    portalUrl: 'https://agmarknet.gov.in',
    apiEndpoint: 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070',
    resourceId: '9ef84268-d588-465a-a308-a864a43d0070',
    openGovPortalId: 'OGD-AGMARKNET-DAILY-2025',
    syncFrequency: 'Every 2 Hours (08:00, 11:30, 14:30, 17:30 IST)',
    coverage: '2,800+ APMC Mandis across 28 States & 8 UTs (48 Target Mandis Active in Farmpulse)',
    status: 'active',
    latencyMs: 142,
    lastSynced: '14 minutes ago',
    reliabilityScore: 99.8,
    license: 'Government Open Data License - India (GODL)',
    recordsCountEstimate: '1,450,000 monthly market entries',
    description: 'The premier national agricultural marketing information network providing daily arrival volume in metric tonnes and commodity price quotes (minimum, maximum, and modal price in ₹/quintal) across Indian wholesale mandis.',
    keyFields: [
      { name: 'state', type: 'string', description: 'State or UT where APMC is located', exampleValue: 'Karnataka' },
      { name: 'district', type: 'string', description: 'District of the APMC market', exampleValue: 'Dharwad' },
      { name: 'market', type: 'string', description: 'Regulated wholesale market name', exampleValue: 'Hubli (Amaragol)' },
      { name: 'commodity', type: 'string', description: 'Agricultural commodity name', exampleValue: 'Onion' },
      { name: 'variety', type: 'string', description: 'Commercial variety or cultivar', exampleValue: 'Red / Garva' },
      { name: 'arrival_date', type: 'date (DD/MM/YYYY)', description: 'Date of recorded market auction', exampleValue: '11/09/2026' },
      { name: 'min_price', type: 'number (₹/Qtl)', description: 'Lowest registered bid price of the day', exampleValue: '2400' },
      { name: 'max_price', type: 'number (₹/Qtl)', description: 'Highest registered bid price of the day', exampleValue: '3200' },
      { name: 'modal_price', type: 'number (₹/Qtl)', description: 'Most common transaction clearing price', exampleValue: '2850' },
      { name: 'arrivals_in_qtl', type: 'number (Quintals)', description: 'Total physical volume registered at gate', exampleValue: '12400' }
    ],
    samplePayloadJson: `{
  "status": "ok",
  "total_records": 1,
  "records": [
    {
      "state": "Karnataka",
      "district": "Dharwad",
      "market": "Hubli (Amaragol)",
      "commodity": "Onion",
      "variety": "Red (Garva)",
      "arrival_date": "11/09/2026",
      "min_price": "2400",
      "max_price": "3200",
      "modal_price": "2850",
      "arrivals_in_qtl": "12400",
      "source_agency": "DMI_AGMARKNET",
      "data_verified": true
    }
  ]
}`,
    usageInApp: 'Powers the core Mandi Price Discovery dashboard, live price ticker, historical volatility graphs, and inter-mandi price arbitrage comparisons.'
  },
  {
    id: 'enam-trade-api',
    name: 'National Agriculture Market (e-NAM) Electronic Trading Portal',
    shortName: 'e-NAM Gateway',
    organization: 'Small Farmers\' Agribusiness Consortium (SFAC)',
    ministry: 'Ministry of Agriculture & Farmers Welfare, Govt of India',
    category: 'enam_trade',
    portalUrl: 'https://enam.gov.in',
    apiEndpoint: 'https://enam.gov.in/web/api/v2/live-bids/commodity-trades',
    resourceId: 'SFAC-ENAM-TRADES-V2',
    openGovPortalId: 'ENAM-API-INT-2026',
    syncFrequency: 'Live Streaming / 15-minute polling during active mandi trading hours',
    coverage: '1,361 Integrated APMC wholesale markets across 27 States and 3 Union Territories',
    status: 'active',
    latencyMs: 168,
    lastSynced: '8 minutes ago',
    reliabilityScore: 99.6,
    license: 'e-NAM Data Exchange Protocol / SFAC Certified',
    recordsCountEstimate: '420,000 daily trade lots',
    description: 'Unified electronic trading platform networking physical APMCs across the country. Supplies computerized weighbridge weights, electronic assaying parameters (moisture, foreign matter), and competitive bidding prices.',
    keyFields: [
      { name: 'trade_lot_id', type: 'string', description: 'Unique cryptographic identifier of auction lot', exampleValue: 'LOT-ENAM-KA-HUB-8492' },
      { name: 'mandi_code', type: 'string', description: 'e-NAM unique regulated market code', exampleValue: 'KA_DH_002' },
      { name: 'assaying_grade', type: 'string', description: 'Laboratory quality grade (Grade I / II / Fair)', exampleValue: 'Grade A - Export' },
      { name: 'moisture_percentage', type: 'number (%)', description: 'Moisture content tested at assaying lab', exampleValue: '11.4%' },
      { name: 'winning_bid_price', type: 'number (₹/Qtl)', description: 'Electronic auction hammer price', exampleValue: '2920' },
      { name: 'buyer_category', type: 'string', description: 'Buyer profile (Processor, FPO, Retailer)', exampleValue: 'Registered FPO' },
      { name: 'gate_pass_status', type: 'string', description: 'Electronic gate-in exit verification status', exampleValue: 'Cleared' }
    ],
    samplePayloadJson: `{
  "status": "success",
  "trade_data": {
    "lot_id": "LOT-ENAM-KA-HUB-8492",
    "mandi": "Hubli APMC",
    "commodity": "Onion",
    "lot_weight_quintals": 120.5,
    "winning_bid_rate_inr": 2920,
    "buyer_gstin": "29AABCU9603R1ZM",
    "assaying_metrics": {
      "grade": "Grade A",
      "moisture_content_pct": 11.4,
      "foreign_matter_pct": 0.8
    },
    "settlement_channel": "Escrow_DBT"
  }
}`,
    usageInApp: 'Powers the Direct Buyer & FPO procurement matchmaking, assaying grade classification, and electronic auction benchmarking.'
  },
  {
    id: 'imd-agromet-weather-api',
    name: 'IMD Agromet Advisory & Gramin Krishi Mausam Sewa (GKMS)',
    shortName: 'IMD Weather & Agromet',
    organization: 'India Meteorological Department (IMD)',
    ministry: 'Ministry of Earth Sciences (MoES), Govt of India',
    category: 'weather_agromet',
    portalUrl: 'https://mausam.imd.gov.in',
    apiEndpoint: 'https://agromet.imd.gov.in/api/v1/district-bulletin',
    resourceId: 'IMD-GKMS-AGROMET-BULLETINS',
    openGovPortalId: 'IMD-OPEN-DATA-MET-2025',
    syncFrequency: 'Twice Daily (08:30 IST and 17:30 IST)',
    coverage: '700+ Agro-Climatic Rural Districts and Krishi Vigyan Kendras (KVKs)',
    status: 'active',
    latencyMs: 195,
    lastSynced: '28 minutes ago',
    reliabilityScore: 99.9,
    license: 'Ministry of Earth Sciences Open Data Policy',
    recordsCountEstimate: '1,400 daily district forecasts and weather advisories',
    description: 'High-resolution district and block-level agromet bulletins detailing precipitation probability, maximum/minimum ambient temperatures, relative humidity, and transit spoilage risk.',
    keyFields: [
      { name: 'district_code', type: 'string', description: 'Agro-climatic district identifier', exampleValue: 'DWD-KA-702' },
      { name: 'forecast_date', type: 'date', description: 'Forecast validation timeframe', exampleValue: '11/09/2026 to 18/09/2026' },
      { name: 'max_temp_celsius', type: 'number', description: 'Projected daytime peak temperature', exampleValue: '31.2' },
      { name: 'relative_humidity_pct', type: 'number (%)', description: 'Ambient moisture influencing rot/spoilage', exampleValue: '72%' },
      { name: 'rainfall_forecast_mm', type: 'number (mm)', description: 'Expected rainfall over next 7 days', exampleValue: '14.5 mm' },
      { name: 'storage_spoilage_risk', type: 'string', description: 'Derived biological spoilage risk score', exampleValue: 'Moderate (Ventilation Needed)' }
    ],
    samplePayloadJson: `{
  "bulletin_id": "IMD-GKMS-2026-09-11-DWD",
  "district": "Dharwad",
  "state": "Karnataka",
  "weather_projection_7d": {
    "avg_max_temp_c": 31.2,
    "avg_humidity_pct": 72,
    "cumulative_rain_mm": 14.5,
    "heat_index_c": 34.0
  },
  "agri_risk_advisory": {
    "onion_shelf_life_impact": "Weight loss accelerated by 1.2% per 5 days under humid conditions",
    "harvest_drying_window": "Safe for sun drying from Thursday to Saturday"
  }
}`,
    usageInApp: 'Crucial input for the AI Hold vs Sell predictive algorithm. Determines whether delayed harvesting or holding crop in ambient farm storage risks rain damage or high rotting rates.'
  },
  {
    id: 'wdra-warehouse-registry-api',
    name: 'WDRA Cold Storage & Negotiable Warehouse Registry',
    shortName: 'WDRA Warehousing',
    organization: 'Warehousing Development and Regulatory Authority (WDRA)',
    ministry: 'Ministry of Consumer Affairs, Food & Public Distribution',
    category: 'warehouses',
    portalUrl: 'https://wdra.gov.in',
    apiEndpoint: 'https://wdra.gov.in/api/v1/accredited-warehouses/tariffs-and-vacancies',
    resourceId: 'WDRA-REG-FACILITIES-2026',
    openGovPortalId: 'WDRA-ENWR-REPOSITORY',
    syncFrequency: 'Weekly on Mondays at 06:00 IST',
    coverage: '6,200+ Accredited Warehouses & Cold Storages across India with electronic Negotiable Warehouse Receipts (e-NWR)',
    status: 'active',
    latencyMs: 210,
    lastSynced: '2 hours ago',
    reliabilityScore: 99.4,
    license: 'WDRA Public Registry Access Guideline',
    recordsCountEstimate: '6,240 facilities registered',
    description: 'Official repository of verified, insured agricultural storage facilities. Feeds active cold storage weekly rent tariffs (₹/quintal/week), temperature ranges, and vacant storage capacity.',
    keyFields: [
      { name: 'warehouse_id', type: 'string', description: 'WDRA statutory accreditation registration code', exampleValue: 'WDRA/KA/DWD/CS-041' },
      { name: 'facility_name', type: 'string', description: 'Commercial name of cold storage / warehouse', exampleValue: 'Hubli Agro Cold Chain Ltd.' },
      { name: 'facility_type', type: 'string', description: 'Cold Storage, Controlled Atmosphere, or Dry Shed', exampleValue: 'Multi-Chamber Cold Store' },
      { name: 'total_capacity_mt', type: 'number (MT)', description: 'Design storage capacity in metric tonnes', exampleValue: '5000 MT' },
      { name: 'vacant_capacity_mt', type: 'number (MT)', description: 'Available uncommitted storage capacity', exampleValue: '1420 MT' },
      { name: 'tariff_inr_per_qtl_week', type: 'number (₹)', description: 'Weekly rental cost per quintal stored', exampleValue: '35.00' },
      { name: 'pledge_finance_eligible', type: 'boolean', description: 'Eligible for instant bank pledge loans against e-NWR', exampleValue: 'true' }
    ],
    samplePayloadJson: `{
  "facility_code": "WDRA/KA/DWD/CS-041",
  "name": "Hubli Agro Cold Chain Ltd.",
  "location": {
    "district": "Dharwad",
    "lat": 15.3647,
    "lng": 75.1240
  },
  "facility_type": "Cold Storage",
  "weekly_rent_inr_quintal": 35.0,
  "available_space_mt": 1420,
  "enwr_enabled": true,
  "insurance_verified": true
}`,
    usageInApp: 'Directly calculates holding expenditure in the AI Advisor: `Net Profit of Holding = Projected Future Mandi Price - (Weekly Storage Rent * Weeks) - Weight Loss %`.'
  },
  {
    id: 'dca-retail-pmd-api',
    name: 'Department of Consumer Affairs Daily Price Monitoring Division (PMD)',
    shortName: 'DCA Retail & Wholesale',
    organization: 'Price Monitoring Division (PMD), Dept of Consumer Affairs',
    ministry: 'Ministry of Consumer Affairs, Food & Public Distribution',
    category: 'retail_indices',
    portalUrl: 'https://fcainfoweb.nic.in',
    apiEndpoint: 'https://fcainfoweb.nic.in/api/pmd/daily-retail-wholesale-spread',
    resourceId: 'DCA-PMD-ESSENTIAL-COMMODITIES',
    openGovPortalId: 'DCA-PMD-OGD-2026',
    syncFrequency: 'Daily at 17:00 IST',
    coverage: '550+ Reporting centers across urban and rural consuming hubs nationwide',
    status: 'active',
    latencyMs: 175,
    lastSynced: '1 hour ago',
    reliabilityScore: 99.7,
    license: 'Open Government Data - Department of Consumer Affairs',
    recordsCountEstimate: '12,000 daily price observations across 22 essential commodities',
    description: 'Tracks consumer retail shelf prices and wholesale terminal prices across metro cities and district headquarters for essential kitchen staples (onion, potato, tomato, pulses, edible oils).',
    keyFields: [
      { name: 'reporting_center', type: 'string', description: 'Urban retail consuming center', exampleValue: 'Bengaluru' },
      { name: 'commodity_name', type: 'string', description: 'Monitored essential food commodity', exampleValue: 'Onion' },
      { name: 'retail_price_inr_per_kg', type: 'number (₹/kg)', description: 'End-consumer retail purchase rate', exampleValue: '48.00' },
      { name: 'wholesale_price_inr_per_qtl', type: 'number (₹/Qtl)', description: 'Wholesale arrival rate in city center', exampleValue: '3600.00' },
      { name: 'farmgate_to_retail_spread_pct', type: 'number (%)', description: 'Price difference captured by intermediaries', exampleValue: '68.4%' }
    ],
    samplePayloadJson: `{
  "date": "11/09/2026",
  "center": "Bengaluru",
  "commodity": "Onion",
  "wholesale_rate_qtl": 3600,
  "retail_rate_kg": 48.0,
  "intermediary_spread_pct": 68.4,
  "trend": "Marginal rise (+2% WoW)"
}`,
    usageInApp: 'Quantifies the middleman markup and proves the economic increment farmers gain when selling direct to FPOs or retail chains via Farmpulse.'
  },
  {
    id: 'morth-diesel-freight-api',
    name: 'PPAC Diesel Fuel & MoRTH Commercial Freight Index',
    shortName: 'Fuel & Transport Matrix',
    organization: 'Petroleum Planning & Analysis Cell (PPAC) & MoRTH Logistics Division',
    ministry: 'Ministry of Petroleum and Natural Gas & MoRTH',
    category: 'logistics_fuel',
    portalUrl: 'https://ppac.gov.in',
    apiEndpoint: 'https://transport.gov.in/api/v1/freight-indices/state-diesel-ton-km',
    resourceId: 'MORTH-FREIGHT-DIESEL-2026',
    openGovPortalId: 'PPAC-FUEL-MATRIX',
    syncFrequency: 'Daily at 06:30 IST',
    coverage: 'State-wise commercial diesel rates and standardized freight tariffs across 1,200 national and state highway corridors',
    status: 'active',
    latencyMs: 130,
    lastSynced: '18 minutes ago',
    reliabilityScore: 99.9,
    license: 'MoRTH National Transport Open Access Database',
    recordsCountEstimate: '36 state and union territory benchmarks',
    description: 'Supplies real-time commercial diesel prices (₹/Litre), average national highway toll charges, and standard truck freight benchmarks (₹/km/quintal) for small commercial vehicles (LCV 1.5T), medium trucks (9T), and multi-axle lorries (16T).',
    keyFields: [
      { name: 'state_code', type: 'string', description: 'State code for diesel fuel taxation', exampleValue: 'KA (Karnataka)' },
      { name: 'diesel_retail_price_inr_l', type: 'number (₹/L)', description: 'Commercial high-speed diesel pump rate', exampleValue: '88.24' },
      { name: 'freight_rate_per_qtl_km', type: 'number (₹)', description: 'Calculated freight cost per quintal per kilometer', exampleValue: '2.40' },
      { name: 'loading_unloading_labor_per_qtl', type: 'number (₹)', description: 'Standard hamali / porterage fee at mandi', exampleValue: '25.00' },
      { name: 'mandi_cess_percentage', type: 'number (%)', description: 'Statutory APMC market fee', exampleValue: '1.5%' }
    ],
    samplePayloadJson: `{
  "fuel_index": {
    "state": "Karnataka",
    "diesel_per_litre_inr": 88.24,
    "last_revised": "11/09/2026 06:00"
  },
  "freight_benchmark": {
    "lcv_per_km_quintal_inr": 2.40,
    "heavy_truck_per_km_quintal_inr": 1.85,
    "mandi_cess_rate_pct": 1.5,
    "weighbridge_charge_inr": 150
  }
}`,
    usageInApp: 'The fundamental mathematical foundation for Farmpulse’s Net In-Hand Payout Calculator: subtracting real diesel freight and toll charges from gross mandi quotes.'
  },
  {
    id: 'agristack-kisan-id-api',
    name: 'AgriStack & PM-KISAN Farmer Registry (e-KYC & Land Records)',
    shortName: 'AgriStack Kisan ID',
    organization: 'Digital Agriculture Division, Dept of Agriculture & Farmers Welfare',
    ministry: 'Ministry of Agriculture & Farmers Welfare, Govt of India',
    category: 'farmer_identity',
    portalUrl: 'https://agristack.gov.in',
    apiEndpoint: 'https://agristack.gov.in/api/v1/farmer-registry/verification',
    resourceId: 'AGRISTACK-CORE-KISAN-REGISTRY',
    openGovPortalId: 'AGRISTACK-DAFW-2026',
    syncFrequency: 'Real-Time Instant API Verification',
    coverage: '110+ Million Registered Indian Farmers with Digitally Linked Land Parcels (Bhoomi, Mahabhulekh, etc.)',
    status: 'verified',
    latencyMs: 155,
    lastSynced: 'Just now (Real-Time)',
    reliabilityScore: 99.9,
    license: 'AgriStack Interoperability Framework / UIDAI Certified e-KYC',
    recordsCountEstimate: '110,000,000+ verified farmer profiles',
    description: 'Government of India\'s foundational digital public infrastructure for agriculture. Validates farmer identity, land records, cropped acreage surveys, and bank accounts for Direct Benefit Transfer (DBT).',
    keyFields: [
      { name: 'kisan_id', type: 'string', description: 'Standardized 12-digit farmer digital identity', exampleValue: 'KA-DWD-2026-89410' },
      { name: 'farmer_name', type: 'string', description: 'Name as registered on land title', exampleValue: 'Ramesh Patil' },
      { name: 'verified_kcc_holder', type: 'boolean', description: 'Kisan Credit Card active facility', exampleValue: 'true' },
      { name: 'landholding_hectares', type: 'number (Ha)', description: 'Verified geo-referenced landholding', exampleValue: '2.4 Hectares' },
      { name: 'bank_dbt_ready', type: 'boolean', description: 'Aadhaar Payment Bridge (APB) DBT status', exampleValue: 'Active (Direct Deposit Ready)' }
    ],
    samplePayloadJson: `{
  "kisan_id": "KA-DWD-2026-89410",
  "verification_status": "AUTHENTICATED",
  "farmer_details": {
    "name": "Ramesh Patil",
    "district": "Dharwad",
    "state": "Karnataka",
    "cultivated_crop": "Red Onion",
    "land_acres": 6.0,
    "kcc_verified": true,
    "dbt_account_linked": true
  }
}`,
    usageInApp: 'Powers farmer onboarding, Kisan Profile verification, institutional buyer trust credentials, and instant digital escrow settlement via DBT.'
  }
];

export const DATA_SOURCE_SYSTEM_STATS = {
  totalConnectedApis: 7,
  dailyIngestedRecords: '2.45 Million',
  systemUptime: '99.85%',
  avgLatencyMs: 168,
  activeTargetMandis: 48,
  totalNationalMandisCoverage: '2,800+',
  enamIntegratedMandis: 1361,
  dataGovernanceStandard: 'Open Government Data (data.gov.in) & MeitY Standards',
  lastFullCatalogSync: 'Today, 09:30 AM IST',
  primaryAgriCloud: 'NIC Agri-Cloud / MeitY Empanelled Data Center'
};

export const DATA_CATEGORY_METADATA: Record<string, { label: string; count: number; color: string; bg: string }> = {
  all: { label: 'All Sources', count: 7, color: 'text-stone-800', bg: 'bg-stone-100' },
  mandi_prices: { label: 'APMC Prices', count: 1, color: 'text-emerald-800', bg: 'bg-emerald-100' },
  enam_trade: { label: 'e-NAM Auctions', count: 1, color: 'text-teal-800', bg: 'bg-teal-100' },
  weather_agromet: { label: 'IMD Weather & Agromet', count: 1, color: 'text-amber-800', bg: 'bg-amber-100' },
  warehouses: { label: 'WDRA Warehouses', count: 1, color: 'text-blue-800', bg: 'bg-blue-100' },
  retail_indices: { label: 'Retail & Wholesale PMD', count: 1, color: 'text-purple-800', bg: 'bg-purple-100' },
  logistics_fuel: { label: 'Fuel & Freight Index', count: 1, color: 'text-rose-800', bg: 'bg-rose-100' },
  farmer_identity: { label: 'AgriStack & Kisan ID', count: 1, color: 'text-indigo-800', bg: 'bg-indigo-100' }
};
