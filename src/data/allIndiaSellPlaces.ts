import { CropSellPlace } from '../types';

export const ALL_INDIA_CROP_SELL_PLACES: CropSellPlace[] = [
  // ===================== KARNATAKA =====================
  {
    id: 'ka-dwd-hubli',
    name: 'Hubli APMC Market Yard (Amargol)',
    type: 'Principal APMC Yard',
    district: 'Dharwad',
    taluk: 'Hubli',
    state: 'Karnataka',
    pincode: '580025',
    commoditiesHandled: ['Red Onion', 'Chilli (Byadgi)', 'Cotton', 'Groundnut', 'Soybean', 'Maize'],
    auctionTimings: '07:30 AM - 01:30 PM (Mon-Sat)',
    facilities: ['Electronic Weighbridge (60 MT)', 'e-NAM Trading Terminals', 'Soil & Moisture Testing Lab', 'Farmer Rest House', 'Bank/ATM Branch'],
    enamEnabled: true,
    contactHelpline: '0836-2224510 / apmc-hubli@karnataka.gov.in',
    dailyAvgVolumeTonnes: 1450
  },
  {
    id: 'ka-dwd-dharwad',
    name: 'Dharwad APMC Sub-Yard',
    type: 'Sub-Market Yard',
    district: 'Dharwad',
    taluk: 'Dharwad',
    state: 'Karnataka',
    pincode: '580007',
    commoditiesHandled: ['Soybean', 'Bengal Gram (Chana)', 'Jowar', 'Vegetables'],
    auctionTimings: '08:00 AM - 12:30 PM',
    facilities: ['Electronic Weighbridge', 'Direct Buyer Sheds', 'Covered Auction Platform'],
    enamEnabled: true,
    contactHelpline: '0836-2448911',
    dailyAvgVolumeTonnes: 320
  },
  {
    id: 'ka-bgm-bailhongal',
    name: 'Bailhongal APMC Cotton & Grain Market',
    type: 'Principal APMC Yard',
    district: 'Belagavi',
    taluk: 'Bailhongal',
    state: 'Karnataka',
    pincode: '591102',
    commoditiesHandled: ['Cotton', 'Groundnut', 'Maize', 'Soybean', 'Jowar'],
    auctionTimings: '08:00 AM - 02:00 PM',
    facilities: ['Ginning Yard Integration', 'e-NAM Weighbridge', 'Cotton Testing Lab', 'Kisan Canteen'],
    enamEnabled: true,
    contactHelpline: '08288-233140',
    dailyAvgVolumeTonnes: 880
  },
  {
    id: 'ka-bgm-belagavi',
    name: 'Belagavi Central Vegetable & Grain Yard',
    type: 'Principal APMC Yard',
    district: 'Belagavi',
    taluk: 'Belagavi',
    state: 'Karnataka',
    pincode: '590016',
    commoditiesHandled: ['Tomato', 'Potato', 'Green Chilli', 'Cabbage', 'Soybean', 'Ginger'],
    auctionTimings: '06:00 AM - 01:00 PM (Daily)',
    facilities: ['Cold Storage Unit (500 MT)', 'e-NAM Electronic Bidding', 'Transit Logistics Hub'],
    enamEnabled: true,
    contactHelpline: '0831-2462310',
    dailyAvgVolumeTonnes: 1100
  },
  {
    id: 'ka-bgm-chikkodi',
    name: 'Chikkodi APMC Market',
    type: 'Principal APMC Yard',
    district: 'Belagavi',
    taluk: 'Chikkodi',
    state: 'Karnataka',
    pincode: '591201',
    commoditiesHandled: ['Sugarcane Jaggery', 'Soybean', 'Groundnut', 'Maize'],
    auctionTimings: '08:30 AM - 01:30 PM',
    facilities: ['Jaggery Trading Platform', 'Electronic Weighing', 'Grading Cell'],
    enamEnabled: true,
    contactHelpline: '08338-272214',
    dailyAvgVolumeTonnes: 620
  },
  {
    id: 'ka-bgm-gokak',
    name: 'Gokak APMC Sub-Yard',
    type: 'Sub-Market Yard',
    district: 'Belagavi',
    taluk: 'Gokak',
    state: 'Karnataka',
    pincode: '591307',
    commoditiesHandled: ['Cotton', 'Sunflower', 'Jowar', 'Turmeric'],
    auctionTimings: '09:00 AM - 01:00 PM',
    facilities: ['Covered Storage (1,000 MT)', 'Weighbridge'],
    enamEnabled: false,
    contactHelpline: '08332-225330',
    dailyAvgVolumeTonnes: 280
  },
  {
    id: 'ka-klr-kolar',
    name: 'Kolar APMC Tomato & Vegetable Terminal',
    type: 'Principal APMC Yard',
    district: 'Kolar',
    taluk: 'Kolar',
    state: 'Karnataka',
    pincode: '563101',
    commoditiesHandled: ['Tomato (Asia\'s 2nd Largest)', 'Capsicum', 'Mango', 'French Beans', 'Cabbage'],
    auctionTimings: '06:30 AM - 02:00 PM (Daily)',
    facilities: ['Reefer Truck Bay', 'Modern Ripening Chamber', 'Pre-cooling Facility', 'e-NAM Trading Hall'],
    enamEnabled: true,
    contactHelpline: '08152-222830 / apmc-kolar@karnataka.gov.in',
    dailyAvgVolumeTonnes: 2600
  },
  {
    id: 'ka-klr-srinivaspur',
    name: 'Srinivaspur Mango & Horticulture Yard',
    type: 'Principal APMC Yard',
    district: 'Kolar',
    taluk: 'Srinivaspur',
    state: 'Karnataka',
    pincode: '563135',
    commoditiesHandled: ['Mango (Totapuri, Alphonso, Badami)', 'Tomato', 'Ragi'],
    auctionTimings: '07:00 AM - 02:00 PM (Seasonal & Daily)',
    facilities: ['Sorting & Waxing Unit', 'Cold Preservation Bay', 'Weighbridge'],
    enamEnabled: true,
    contactHelpline: '08157-246022',
    dailyAvgVolumeTonnes: 1900
  },
  {
    id: 'ka-bng-yeshwantpur',
    name: 'Yeshwantpur APMC Super Market Yard',
    type: 'Principal APMC Yard',
    district: 'Bengaluru Urban',
    taluk: 'Bengaluru North',
    state: 'Karnataka',
    pincode: '560022',
    commoditiesHandled: ['Onion', 'Potato', 'Garlic', 'Pulses', 'Rice', 'Spices'],
    auctionTimings: '06:00 AM - 02:00 PM (Mon-Sat)',
    facilities: ['High-capacity Cold Storage (10,000 MT)', 'Full e-NAM Trading Desks', 'Assaying Lab', 'Railway Siding Access'],
    enamEnabled: true,
    contactHelpline: '080-23377222',
    dailyAvgVolumeTonnes: 4500
  },
  {
    id: 'ka-mys-bandipalya',
    name: 'Bandipalya APMC Market Yard',
    type: 'Principal APMC Yard',
    district: 'Mysuru',
    taluk: 'Mysuru',
    state: 'Karnataka',
    pincode: '570025',
    commoditiesHandled: ['Paddy / Rice', 'Coconut', 'Ginger', 'Turmeric', 'Banana'],
    auctionTimings: '08:00 AM - 01:30 PM',
    facilities: ['Covered Drying Yards', 'e-NAM Gateway', 'Warehouse (5,000 MT)'],
    enamEnabled: true,
    contactHelpline: '0821-2480521',
    dailyAvgVolumeTonnes: 850
  },
  {
    id: 'ka-rch-raichur',
    name: 'Raichur APMC Cotton & Paddy Yard',
    type: 'Principal APMC Yard',
    district: 'Raichur',
    taluk: 'Raichur',
    state: 'Karnataka',
    pincode: '584101',
    commoditiesHandled: ['Sona Masoori Paddy', 'Cotton', 'Groundnut', 'Red Gram (Tur)'],
    auctionTimings: '08:30 AM - 02:00 PM',
    facilities: ['Electronic Auction System', 'Moisture Meter Stations', 'Farmer Dormitory'],
    enamEnabled: true,
    contactHelpline: '08532-235810',
    dailyAvgVolumeTonnes: 1750
  },
  {
    id: 'ka-klb-kalaburagi',
    name: 'Kalaburagi APMC Red Gram (Tur) Terminal',
    type: 'Principal APMC Yard',
    district: 'Kalaburagi',
    taluk: 'Kalaburagi',
    state: 'Karnataka',
    pincode: '585102',
    commoditiesHandled: ['Tur (Pigeon Pea - GI Tagged)', 'Bengal Gram', 'Soybean', 'Sunflower'],
    auctionTimings: '08:00 AM - 02:00 PM',
    facilities: ['Specialized Dal Grading Lab', 'e-NAM Electronic Portal', 'Warehouse Storage'],
    enamEnabled: true,
    contactHelpline: '08472-220188',
    dailyAvgVolumeTonnes: 1250
  },
  {
    id: 'ka-dvn-davanagere',
    name: 'Davanagere APMC Grain & Maize Market',
    type: 'Principal APMC Yard',
    district: 'Davanagere',
    taluk: 'Davanagere',
    state: 'Karnataka',
    pincode: '577003',
    commoditiesHandled: ['Maize', 'Paddy', 'Arecanut', 'Ragi', 'Groundnut'],
    auctionTimings: '08:30 AM - 01:30 PM',
    facilities: ['e-NAM Terminal', 'Weighbridges', 'Feed Processing Linkage'],
    enamEnabled: true,
    contactHelpline: '08192-230911',
    dailyAvgVolumeTonnes: 920
  },
  {
    id: 'ka-hvr-byadgi',
    name: 'Byadgi APMC Chilli Market Yard',
    type: 'Principal APMC Yard',
    district: 'Haveri',
    taluk: 'Byadgi',
    state: 'Karnataka',
    pincode: '581106',
    commoditiesHandled: ['Byadgi Red Chilli (GI Tagged)', 'Cotton', 'Groundnut'],
    auctionTimings: '09:00 AM - 03:00 PM (Every Monday & Thursday)',
    facilities: ['Color & Oleoresin Assaying Lab', 'e-NAM Online Tender System', 'Fireproof Godowns'],
    enamEnabled: true,
    contactHelpline: '08375-228222',
    dailyAvgVolumeTonnes: 2100
  },

  // ===================== MAHARASHTRA =====================
  {
    id: 'mh-nsk-lasalgaon',
    name: 'Lasalgaon APMC (Asia\'s Largest Onion Mandi)',
    type: 'Principal APMC Yard',
    district: 'Nashik',
    taluk: 'Niphad',
    state: 'Maharashtra',
    pincode: '422306',
    commoditiesHandled: ['Red Onion (Garva & Pol)', 'Soybean', 'Wheat', 'Maize', 'Pomegranate'],
    auctionTimings: '08:00 AM - 01:30 PM & 03:00 PM - 06:00 PM',
    facilities: ['Automated Onion Grading', 'Radiation Cold Storage Proximity', 'e-NAM Gateway', 'Dedicated Rail Loading Yard'],
    enamEnabled: true,
    contactHelpline: '02550-266024 / apmc-lasalgaon@mahapmc.gov.in',
    dailyAvgVolumeTonnes: 3200
  },
  {
    id: 'mh-nsk-pimpalgaon',
    name: 'Pimpalgaon Baswant APMC Market',
    type: 'Principal APMC Yard',
    district: 'Nashik',
    taluk: 'Niphad',
    state: 'Maharashtra',
    pincode: '422209',
    commoditiesHandled: ['Red Onion', 'Tomato', 'Grapes (Table & Export)', 'Capsicum'],
    auctionTimings: '07:30 AM - 02:00 PM',
    facilities: ['Grape Pre-cooling & Cold Chain', 'Weighbridges', 'e-NAM Live Bidding'],
    enamEnabled: true,
    contactHelpline: '02550-252110',
    dailyAvgVolumeTonnes: 2800
  },
  {
    id: 'mh-nsk-yeola',
    name: 'Yeola APMC Sub-Yard',
    type: 'Sub-Market Yard',
    district: 'Nashik',
    taluk: 'Yeola',
    state: 'Maharashtra',
    pincode: '423401',
    commoditiesHandled: ['Onion', 'Maize', 'Soybean', 'Bajra'],
    auctionTimings: '08:30 AM - 01:00 PM',
    facilities: ['Electronic Weighbridge', 'Covered Sheds'],
    enamEnabled: true,
    contactHelpline: '02559-267015',
    dailyAvgVolumeTonnes: 750
  },
  {
    id: 'mh-nsk-dindori',
    name: 'Dindori APMC Yard',
    type: 'Sub-Market Yard',
    district: 'Nashik',
    taluk: 'Dindori',
    state: 'Maharashtra',
    pincode: '422202',
    commoditiesHandled: ['Tomato', 'Grapes', 'Onion', 'Vegetables'],
    auctionTimings: '08:00 AM - 12:30 PM',
    facilities: ['Packaging Hub', 'Cold Storage Bay'],
    enamEnabled: false,
    contactHelpline: '02557-221230',
    dailyAvgVolumeTonnes: 450
  },
  {
    id: 'mh-pun-gultekdi',
    name: 'Pune APMC (Gultekdi Market Yard)',
    type: 'Principal APMC Yard',
    district: 'Pune',
    taluk: 'Haveli',
    state: 'Maharashtra',
    pincode: '411037',
    commoditiesHandled: ['Vegetables', 'Fruits', 'Onion & Potato', 'Grains & Pulses', 'Jaggery'],
    auctionTimings: '05:30 AM - 01:30 PM (Daily)',
    facilities: ['Multi-commodity Cold Store', 'Direct Farmer Consumer Shed', 'Bank Branches', 'e-NAM Terminal'],
    enamEnabled: true,
    contactHelpline: '020-24263121',
    dailyAvgVolumeTonnes: 3800
  },
  {
    id: 'mh-pun-baramati',
    name: 'Baramati APMC Agriculture Market',
    type: 'Principal APMC Yard',
    district: 'Pune',
    taluk: 'Baramati',
    state: 'Maharashtra',
    pincode: '413102',
    commoditiesHandled: ['Soybean', 'Jowar', 'Sugarcane Jaggery', 'Pomegranate', 'Grapes'],
    auctionTimings: '08:00 AM - 01:00 PM',
    facilities: ['Hi-tech Agri Testing Lab', 'e-NAM Platform', 'Warehouse Godowns'],
    enamEnabled: true,
    contactHelpline: '02112-222340',
    dailyAvgVolumeTonnes: 680
  },
  {
    id: 'mh-thm-vashi',
    name: 'Vashi APMC Mega Wholesale Complex',
    type: 'Principal APMC Yard',
    district: 'Thane / Navi Mumbai',
    taluk: 'Thane',
    state: 'Maharashtra',
    pincode: '400703',
    commoditiesHandled: ['Onion & Potato', 'Fresh Fruits', 'Vegetables', 'Grain & Pulses', 'Spices'],
    auctionTimings: '05:00 AM - 02:00 PM (Daily)',
    facilities: ['5 Dedicated Commodity Market Blocks', '25,000 MT Cold Storage', 'Electronic Weighbridges', 'National Rail/Port Connectivity'],
    enamEnabled: true,
    contactHelpline: '022-27888100',
    dailyAvgVolumeTonnes: 7500
  },
  {
    id: 'mh-ahd-rahata',
    name: 'Rahata / Shirdi APMC Market',
    type: 'Principal APMC Yard',
    district: 'Ahmednagar',
    taluk: 'Rahata',
    state: 'Maharashtra',
    pincode: '423107',
    commoditiesHandled: ['Soybean', 'Pomegranate', 'Guava', 'Onion', 'Bajra'],
    auctionTimings: '08:00 AM - 01:00 PM',
    facilities: ['Fruit Grading Center', 'Electronic Weighing'],
    enamEnabled: true,
    contactHelpline: '02423-242200',
    dailyAvgVolumeTonnes: 540
  },
  {
    id: 'mh-ltr-latur',
    name: 'Latur APMC Oilseeds & Pulses Hub',
    type: 'Principal APMC Yard',
    district: 'Latur',
    taluk: 'Latur',
    state: 'Maharashtra',
    pincode: '413512',
    commoditiesHandled: ['Soybean (India\'s Benchmark)', 'Tur / Pigeon Pea', 'Chana / Gram', 'Urad', 'Moong'],
    auctionTimings: '08:30 AM - 02:30 PM (Mon-Sat)',
    facilities: ['Electronic Bidding Screens', 'Solvent Extraction Mill Ingress', 'Assaying Lab', 'e-NAM Platform'],
    enamEnabled: true,
    contactHelpline: '02382-243220',
    dailyAvgVolumeTonnes: 3100
  },
  {
    id: 'mh-jlg-jalgaon',
    name: 'Jalgaon APMC Banana & Grain Market',
    type: 'Principal APMC Yard',
    district: 'Jalgaon',
    taluk: 'Jalgaon',
    state: 'Maharashtra',
    pincode: '425001',
    commoditiesHandled: ['Banana (GI Tagged)', 'Cotton', 'Maize', 'Soybean', 'Jowar'],
    auctionTimings: '07:30 AM - 01:30 PM',
    facilities: ['Banana Ripening Units', 'Cold Logistics Linkage', 'e-NAM Gateway'],
    enamEnabled: true,
    contactHelpline: '0257-2223840',
    dailyAvgVolumeTonnes: 2200
  },

  // ===================== GUJARAT =====================
  {
    id: 'gj-rjk-rajkot',
    name: 'Rajkot APMC (Bedi Market Yard)',
    type: 'Principal APMC Yard',
    district: 'Rajkot',
    taluk: 'Rajkot',
    state: 'Gujarat',
    pincode: '360003',
    commoditiesHandled: ['Cotton (Shankar-6)', 'Groundnut', 'Cumin (Jeera)', 'Sesame (Til)', 'Coriander', 'Wheat'],
    auctionTimings: '08:00 AM - 02:00 PM (Mon-Sat)',
    facilities: ['Modern Electronic Auction Hall', 'Oilseed Assaying Lab', 'Cotton Staple Tester', 'Kisan Bhavan (150 beds)'],
    enamEnabled: true,
    contactHelpline: '0281-2701401 / apmc-rajkot@gujarat.gov.in',
    dailyAvgVolumeTonnes: 3600
  },
  {
    id: 'gj-rjk-gondal',
    name: 'Gondal APMC Market Yard',
    type: 'Principal APMC Yard',
    district: 'Rajkot',
    taluk: 'Gondal',
    state: 'Gujarat',
    pincode: '360311',
    commoditiesHandled: ['Groundnut', 'Red Chilli', 'Cotton', 'Coriander Seed', 'Sesame'],
    auctionTimings: '08:00 AM - 02:00 PM',
    facilities: ['Direct Oil Mill Linkage', 'Cold Storage (5,000 MT)', 'e-NAM Portal'],
    enamEnabled: true,
    contactHelpline: '02825-220033',
    dailyAvgVolumeTonnes: 2900
  },
  {
    id: 'gj-mhs-unjha',
    name: 'Unjha APMC (World\'s Largest Spice Mandi)',
    type: 'Principal APMC Yard',
    district: 'Mehsana',
    taluk: 'Unjha',
    state: 'Gujarat',
    pincode: '384170',
    commoditiesHandled: ['Cumin Seed (Jeera)', 'Fennel Seed (Saunf)', 'Isabgol (Psyllium Husk)', 'Mustard', 'Sesame'],
    auctionTimings: '08:30 AM - 03:00 PM',
    facilities: ['Spice Quality & Purity Testing Labs', 'e-NAM Global Export Desks', 'Temperature Controlled Warehousing'],
    enamEnabled: true,
    contactHelpline: '02767-252230',
    dailyAvgVolumeTonnes: 4100
  },
  {
    id: 'gj-sur-surat',
    name: 'Surat APMC Sardar Patel Market',
    type: 'Principal APMC Yard',
    district: 'Surat',
    taluk: 'Surat City',
    state: 'Gujarat',
    pincode: '395010',
    commoditiesHandled: ['Vegetables', 'Banana', 'Papaya', 'Mango', 'Sugarcane'],
    auctionTimings: '05:30 AM - 01:00 PM',
    facilities: ['Waste to Compost Plant', 'Cold Storage', 'e-NAM'],
    enamEnabled: true,
    contactHelpline: '0261-2311400',
    dailyAvgVolumeTonnes: 2100
  },
  {
    id: 'gj-bnk-deesa',
    name: 'Deesa APMC Potato Terminal Yard',
    type: 'Principal APMC Yard',
    district: 'Banaskantha',
    taluk: 'Deesa',
    state: 'Gujarat',
    pincode: '385535',
    commoditiesHandled: ['Potato (India\'s Largest Hub)', 'Mustard', 'Groundnut', 'Castor Seed'],
    auctionTimings: '08:00 AM - 02:00 PM',
    facilities: ['120+ Cold Stores in 10km radius', 'Processing Grade Sortation', 'Weighbridges'],
    enamEnabled: true,
    contactHelpline: '02744-220140',
    dailyAvgVolumeTonnes: 3400
  },

  // ===================== MADHYA PRADESH =====================
  {
    id: 'mp-ind-choithram',
    name: 'Indore APMC (Choithram Market Yard)',
    type: 'Principal APMC Yard',
    district: 'Indore',
    taluk: 'Indore',
    state: 'Madhya Pradesh',
    pincode: '452014',
    commoditiesHandled: ['Soybean', 'Wheat (Sharbati & Lokwan)', 'Potato', 'Onion', 'Garlic', 'Chana'],
    auctionTimings: '07:30 AM - 02:30 PM (Mon-Sat)',
    facilities: ['Fully Integrated e-NAM Terminal', 'Grain Drying Floors', 'Agri-Clinic & Laboratory', 'Farmer Rest Rooms'],
    enamEnabled: true,
    contactHelpline: '0731-2401820 / apmc-indore@mp.gov.in',
    dailyAvgVolumeTonnes: 3500
  },
  {
    id: 'mp-ind-sanwer',
    name: 'Sanwer APMC Sub-Yard',
    type: 'Sub-Market Yard',
    district: 'Indore',
    taluk: 'Sanwer',
    state: 'Madhya Pradesh',
    pincode: '453551',
    commoditiesHandled: ['Soybean', 'Wheat', 'Gram (Chana)', 'Garlic'],
    auctionTimings: '08:30 AM - 01:30 PM',
    facilities: ['Electronic Weighbridge', 'Covered Benches'],
    enamEnabled: true,
    contactHelpline: '07321-222310',
    dailyAvgVolumeTonnes: 490
  },
  {
    id: 'mp-seh-sehore',
    name: 'Sehore APMC Sharbati Wheat Yard',
    type: 'Principal APMC Yard',
    district: 'Sehore',
    taluk: 'Sehore',
    state: 'Madhya Pradesh',
    pincode: '466001',
    commoditiesHandled: ['Sharbati Wheat (GI Tagged Premium)', 'Soybean', 'Gram', 'Mustard'],
    auctionTimings: '08:00 AM - 02:00 PM',
    facilities: ['GI Quality Authentication', 'e-NAM Gateway', 'Warehouse Linkage'],
    enamEnabled: true,
    contactHelpline: '07562-224410',
    dailyAvgVolumeTonnes: 1800
  },
  {
    id: 'mp-seh-ashta',
    name: 'Ashta APMC Market Yard',
    type: 'Principal APMC Yard',
    district: 'Sehore',
    taluk: 'Ashta',
    state: 'Madhya Pradesh',
    pincode: '466116',
    commoditiesHandled: ['Soybean', 'Wheat', 'Chana', 'Garlic'],
    auctionTimings: '08:30 AM - 01:30 PM',
    facilities: ['Electronic Weighbridge', 'Covered Storage'],
    enamEnabled: true,
    contactHelpline: '07560-242315',
    dailyAvgVolumeTonnes: 720
  },
  {
    id: 'mp-nmc-neemuch',
    name: 'Neemuch APMC Medicinal Herbs & Spice Yard',
    type: 'Principal APMC Yard',
    district: 'Neemuch',
    taluk: 'Neemuch',
    state: 'Madhya Pradesh',
    pincode: '458441',
    commoditiesHandled: ['Garlic', 'Ashwagandha', 'Isabgol', 'Fenugreek (Methi)', 'Soybean', 'Mustard', 'Coriander'],
    auctionTimings: '08:00 AM - 03:00 PM',
    facilities: ['Herbal Testing Laboratory', 'e-NAM Auction Platform', 'Cold Preservation Units'],
    enamEnabled: true,
    contactHelpline: '07423-222130',
    dailyAvgVolumeTonnes: 2400
  },
  {
    id: 'mp-msr-mandsaur',
    name: 'Mandsaur APMC Garlic & Grain Terminal',
    type: 'Principal APMC Yard',
    district: 'Mandsaur',
    taluk: 'Mandsaur',
    state: 'Madhya Pradesh',
    pincode: '458001',
    commoditiesHandled: ['Garlic (Riyavan Bold)', 'Soybean', 'Wheat', 'Mustard', 'Opium Seed (Khas-Khas)'],
    auctionTimings: '08:00 AM - 02:30 PM',
    facilities: ['Garlic Sorting Plant', 'e-NAM Hub', 'Warehouse'],
    enamEnabled: true,
    contactHelpline: '07422-243510',
    dailyAvgVolumeTonnes: 2600
  },

  // ===================== PUNJAB & HARYANA =====================
  {
    id: 'pb-ldh-khanna',
    name: 'Khanna APMC Grain Market (Asia\'s Largest Grain Yard)',
    type: 'Principal APMC Yard',
    district: 'Ludhiana',
    taluk: 'Khanna',
    state: 'Punjab',
    pincode: '141401',
    commoditiesHandled: ['Wheat', 'Paddy (Basmati & PR Varieties)', 'Maize', 'Sunflower', 'Mustard'],
    auctionTimings: '07:00 AM - 04:00 PM (Harvest Peak 24/7)',
    facilities: ['Automated Grain Cleaners & Elevators', 'Direct FCI Rail Siding', 'e-NAM Digital Weighbridges', 'Kisan Bhawan'],
    enamEnabled: true,
    contactHelpline: '01628-226410 / apmc-khanna@punjab.gov.in',
    dailyAvgVolumeTonnes: 8500
  },
  {
    id: 'pb-asr-amritsar',
    name: 'Amritsar APMC Bhagtanwala Grain Market',
    type: 'Principal APMC Yard',
    district: 'Amritsar',
    taluk: 'Amritsar-II',
    state: 'Punjab',
    pincode: '143001',
    commoditiesHandled: ['Basmati Paddy (Pusa 1121 / 1509)', 'Wheat', 'Potato', 'Peas'],
    auctionTimings: '07:30 AM - 03:00 PM',
    facilities: ['Direct Rice Mill Connectivity', 'e-NAM Trading Hall', 'Weighbridges'],
    enamEnabled: true,
    contactHelpline: '0183-2582410',
    dailyAvgVolumeTonnes: 4200
  },
  {
    id: 'hr-krn-karnal',
    name: 'Karnal APMC Basmati Rice & Grain Terminal',
    type: 'Principal APMC Yard',
    district: 'Karnal',
    taluk: 'Karnal',
    state: 'Haryana',
    pincode: '132001',
    commoditiesHandled: ['Basmati Rice (1121, Traditional)', 'Wheat', 'Mustard', 'Sunflower', 'Vegetables'],
    auctionTimings: '07:00 AM - 03:00 PM (Daily)',
    facilities: ['Basmati Quality & DNA Testing Lab', 'e-NAM Hub', 'Automated Weighing Platforms', 'Grain Silos Proximity'],
    enamEnabled: true,
    contactHelpline: '0184-2267810 / apmc-karnal@haryana.gov.in',
    dailyAvgVolumeTonnes: 5200
  },
  {
    id: 'hr-krk-pehowa',
    name: 'Pehowa APMC Grain Market',
    type: 'Principal APMC Yard',
    district: 'Kurukshetra',
    taluk: 'Pehowa',
    state: 'Haryana',
    pincode: '136128',
    commoditiesHandled: ['Paddy', 'Wheat', 'Mustard', 'Sunflower'],
    auctionTimings: '08:00 AM - 02:00 PM',
    facilities: ['Drying Floors', 'e-NAM Weighbridge', 'FCI Desk'],
    enamEnabled: true,
    contactHelpline: '01741-220130',
    dailyAvgVolumeTonnes: 1600
  },
  {
    id: 'hr-srs-ellenabad',
    name: 'Ellenabad APMC Cotton & Mustard Yard',
    type: 'Principal APMC Yard',
    district: 'Sirsa',
    taluk: 'Ellenabad',
    state: 'Haryana',
    pincode: '125102',
    commoditiesHandled: ['Cotton', 'Mustard', 'Wheat', 'Guar Gum Seed'],
    auctionTimings: '08:30 AM - 02:00 PM',
    facilities: ['Ginning Yard Linkage', 'Weighbridges', 'e-NAM'],
    enamEnabled: true,
    contactHelpline: '01667-220025',
    dailyAvgVolumeTonnes: 1100
  },

  // ===================== RAJASTHAN =====================
  {
    id: 'rj-jpr-muhana',
    name: 'Jaipur APMC (Muhana Mandi Terminal)',
    type: 'Principal APMC Yard',
    district: 'Jaipur',
    taluk: 'Sanganer',
    state: 'Rajasthan',
    pincode: '302029',
    commoditiesHandled: ['Vegetables', 'Fruits', 'Onion', 'Garlic', 'Grains'],
    auctionTimings: '05:00 AM - 01:00 PM (Daily)',
    facilities: ['Modern Auction Sheds', 'Cold Store Facilities', 'e-NAM Gateway', 'Dedicated Farmer Stalls'],
    enamEnabled: true,
    contactHelpline: '0141-2770210 / apmc-jaipur@rajasthan.gov.in',
    dailyAvgVolumeTonnes: 3200
  },
  {
    id: 'rj-jpr-chomu',
    name: 'Chomu APMC Vegetable & Groundnut Yard',
    type: 'Principal APMC Yard',
    district: 'Jaipur',
    taluk: 'Chomu',
    state: 'Rajasthan',
    pincode: '303702',
    commoditiesHandled: ['Tomato', 'Cauliflower', 'Groundnut', 'Barley', 'Wheat', 'Onion'],
    auctionTimings: '06:00 AM - 12:30 PM',
    facilities: ['Horticulture Cold Store', 'Weighbridges', 'e-NAM'],
    enamEnabled: true,
    contactHelpline: '01423-221040',
    dailyAvgVolumeTonnes: 1400
  },
  {
    id: 'rj-kot-ramganjmandi',
    name: 'Ramganj Mandi APMC (Asia\'s Largest Coriander Hub)',
    type: 'Principal APMC Yard',
    district: 'Kota',
    taluk: 'Ramganj Mandi',
    state: 'Rajasthan',
    pincode: '326519',
    commoditiesHandled: ['Coriander Seed (Dhaniya)', 'Soybean', 'Mustard', 'Wheat', 'Fenugreek'],
    auctionTimings: '08:30 AM - 02:30 PM',
    facilities: ['Coriander Cleanliness & Essential Oil Testing', 'e-NAM Auction Platform', 'Warehouse (20,000 MT)'],
    enamEnabled: true,
    contactHelpline: '07459-242130',
    dailyAvgVolumeTonnes: 3100
  },
  {
    id: 'rj-bhr-bharatpur',
    name: 'Bharatpur APMC Mustard Yard',
    type: 'Principal APMC Yard',
    district: 'Bharatpur',
    taluk: 'Bharatpur',
    state: 'Rajasthan',
    pincode: '321001',
    commoditiesHandled: ['Mustard (Yellow & Black Sarson)', 'Wheat', 'Bajra', 'Paddy'],
    auctionTimings: '08:00 AM - 02:00 PM',
    facilities: ['Mustard Oil Percentage Analyzer', 'NAFED Procurement Desk', 'e-NAM Bidding'],
    enamEnabled: true,
    contactHelpline: '05644-222315',
    dailyAvgVolumeTonnes: 2200
  },
  {
    id: 'rj-bkn-bikaner',
    name: 'Bikaner APMC (Gajner Road Grain Market)',
    type: 'Principal APMC Yard',
    district: 'Bikaner',
    taluk: 'Bikaner',
    state: 'Rajasthan',
    pincode: '334001',
    commoditiesHandled: ['Moth Bean (Bikaneri Bhujia Grade)', 'Guar Seed', 'Groundnut', 'Wheat', 'Gram'],
    auctionTimings: '08:30 AM - 02:00 PM',
    facilities: ['Pulse Processing Grade Tester', 'Weighbridges', 'e-NAM'],
    enamEnabled: true,
    contactHelpline: '0151-2200840',
    dailyAvgVolumeTonnes: 1750
  },

  // ===================== UTTAR PRADESH =====================
  {
    id: 'up-agr-fatehabad',
    name: 'Agra APMC (Fatehabad Road Mandi)',
    type: 'Principal APMC Yard',
    district: 'Agra',
    taluk: 'Fatehabad',
    state: 'Uttar Pradesh',
    pincode: '282001',
    commoditiesHandled: ['Potato (India\'s Major Production Belt)', 'Mustard', 'Wheat', 'Bajra', 'Onion'],
    auctionTimings: '07:30 AM - 02:00 PM (Daily)',
    facilities: ['Agra Cold Storage Corridor Link (Over 300 cold stores)', 'e-NAM Electronic Portal', 'Weighbridge'],
    enamEnabled: true,
    contactHelpline: '0562-2231450',
    dailyAvgVolumeTonnes: 4100
  },
  {
    id: 'up-kan-chaubepur',
    name: 'Kanpur APMC Mandi Samiti',
    type: 'Principal APMC Yard',
    district: 'Kanpur Nagar',
    taluk: 'Chaubepur',
    state: 'Uttar Pradesh',
    pincode: '208001',
    commoditiesHandled: ['Wheat', 'Paddy', 'Mustard', 'Potato', 'Vegetables', 'Pulses'],
    auctionTimings: '07:00 AM - 02:00 PM',
    facilities: ['e-NAM Auction Platform', 'Covered Platforms', 'Banking Facility'],
    enamEnabled: true,
    contactHelpline: '0512-2540110',
    dailyAvgVolumeTonnes: 2600
  },
  {
    id: 'up-vns-pindra',
    name: 'Varanasi APMC (Pindra Market Yard)',
    type: 'Principal APMC Yard',
    district: 'Varanasi',
    taluk: 'Pindra',
    state: 'Uttar Pradesh',
    pincode: '221206',
    commoditiesHandled: ['Green Peas', 'Tomato', 'Paddy', 'Wheat', 'Mango (Langra)'],
    auctionTimings: '07:00 AM - 01:30 PM',
    facilities: ['Air Cargo Export Linkage (Lal Bahadur Shastri Airport)', 'e-NAM', 'Cold Room'],
    enamEnabled: true,
    contactHelpline: '0542-2622310',
    dailyAvgVolumeTonnes: 1550
  },
  {
    id: 'up-lko-malihabad',
    name: 'Malihabad APMC Mango Yard',
    type: 'Principal APMC Yard',
    district: 'Lucknow',
    taluk: 'Malihabad',
    state: 'Uttar Pradesh',
    pincode: '226102',
    commoditiesHandled: ['Mango (Dasheri GI Tagged)', 'Guava', 'Wheat', 'Paddy'],
    auctionTimings: '07:00 AM - 02:00 PM (Seasonal & Regular)',
    facilities: ['Fruit Packhouse', 'Pre-cooling Facilities', 'Direct APMC Desks'],
    enamEnabled: true,
    contactHelpline: '0522-2841230',
    dailyAvgVolumeTonnes: 1850
  },

  // ===================== ANDHRA PRADESH & TELANGANA =====================
  {
    id: 'ap-gnt-guntur',
    name: 'Guntur APMC Chilli Yard (Asia\'s Largest Red Chilli Market)',
    type: 'Principal APMC Yard',
    district: 'Guntur',
    taluk: 'Guntur',
    state: 'Andhra Pradesh',
    pincode: '522004',
    commoditiesHandled: ['Dry Red Chilli (Teja, Sannam, Byadgi)', 'Cotton', 'Turmeric', 'Tobacco', 'Paddy'],
    auctionTimings: '08:00 AM - 03:00 PM (Daily)',
    facilities: ['Spices Board Quality Lab', '100,000 MT Cold Storage Complex', 'e-NAM International Bidding', 'Electronic Weighbridges'],
    enamEnabled: true,
    contactHelpline: '0863-2224101 / apmc-guntur@ap.gov.in',
    dailyAvgVolumeTonnes: 5800
  },
  {
    id: 'ap-krn-kurnool',
    name: 'Kurnool APMC Market Yard',
    type: 'Principal APMC Yard',
    district: 'Kurnool',
    taluk: 'Kurnool',
    state: 'Andhra Pradesh',
    pincode: '518003',
    commoditiesHandled: ['Red Onion', 'Cotton', 'Groundnut', 'Bengal Gram', 'Paddy', 'Sunflower'],
    auctionTimings: '08:00 AM - 02:00 PM',
    facilities: ['e-NAM Auction Platform', 'Electronic Weighing', 'Kisan Canteen', 'Warehouse'],
    enamEnabled: true,
    contactHelpline: '08518-220130',
    dailyAvgVolumeTonnes: 2100
  },
  {
    id: 'tg-wrg-warangal',
    name: 'Warangal APMC (Enumamula Market Yard - Asia\'s 2nd Largest Grain Hub)',
    type: 'Principal APMC Yard',
    district: 'Warangal',
    taluk: 'Warangal',
    state: 'Telangana',
    pincode: '506006',
    commoditiesHandled: ['Cotton', 'Red Chilli', 'Paddy', 'Maize', 'Turmeric', 'Green Gram (Moong)'],
    auctionTimings: '08:00 AM - 03:00 PM (Mon-Sat)',
    facilities: ['Electronic Tendering Halls', 'e-NAM Gateway', 'Warehouse Godowns (40,000 MT)', 'Moisture Testing Equipment'],
    enamEnabled: true,
    contactHelpline: '0870-2441230 / apmc-warangal@telangana.gov.in',
    dailyAvgVolumeTonnes: 4900
  },
  {
    id: 'tg-nzb-nizamabad',
    name: 'Nizamabad APMC Turmeric Terminal',
    type: 'Principal APMC Yard',
    district: 'Nizamabad',
    taluk: 'Nizamabad',
    state: 'Telangana',
    pincode: '503001',
    commoditiesHandled: ['Turmeric (Curcumin High Grade)', 'Soybean', 'Paddy', 'Maize'],
    auctionTimings: '08:30 AM - 02:30 PM',
    facilities: ['Turmeric Polishing & Quality Cell', 'e-NAM Digital Platform', 'Cold Storage'],
    enamEnabled: true,
    contactHelpline: '08462-234120',
    dailyAvgVolumeTonnes: 2300
  },

  // ===================== TAMIL NADU & KERALA =====================
  {
    id: 'tn-erd-perundurai',
    name: 'Perundurai APMC Turmeric & Agricultural Yard',
    type: 'Principal APMC Yard',
    district: 'Erode',
    taluk: 'Perundurai',
    state: 'Tamil Nadu',
    pincode: '638052',
    commoditiesHandled: ['Turmeric (Erode Yellow GI Tagged)', 'Coconut & Copra', 'Tapioca', 'Paddy'],
    auctionTimings: '09:00 AM - 02:00 PM (Mon-Fri)',
    facilities: ['Turmeric Electronic Auction Hall', 'e-NAM Terminal', 'Drying Yards', 'Warehouse'],
    enamEnabled: true,
    contactHelpline: '04294-220130',
    dailyAvgVolumeTonnes: 2400
  },
  {
    id: 'tn-cbe-pollachi',
    name: 'Pollachi Coconut & Tender Coconut Market',
    type: 'Principal APMC Yard',
    district: 'Coimbatore',
    taluk: 'Pollachi',
    state: 'Tamil Nadu',
    pincode: '642001',
    commoditiesHandled: ['Coconut (India\'s Benchmark)', 'Tender Coconut', 'Coir Pith', 'Jaggery', 'Nutmeg'],
    auctionTimings: '08:00 AM - 01:30 PM (Daily)',
    facilities: ['Direct Copra Procurement Desks', 'e-NAM Weighbridges', 'Coconut Processing Hubs'],
    enamEnabled: true,
    contactHelpline: '04259-224410',
    dailyAvgVolumeTonnes: 3100
  },
  {
    id: 'tn-dgl-oddanchatram',
    name: 'Oddanchatram Vegetable Market Yard',
    type: 'Principal APMC Yard',
    district: 'Dindigul',
    taluk: 'Oddanchatram',
    state: 'Tamil Nadu',
    pincode: '624619',
    commoditiesHandled: ['Drumstick (Moringa)', 'Shallots (Small Onion)', 'Tomato', 'Green Chilli', 'Brinjal'],
    auctionTimings: '05:30 AM - 01:00 PM (Daily)',
    facilities: ['Moringa Sorting Hub', 'Cold Preservation Bay', 'Direct Kerala Dispatch Bays'],
    enamEnabled: true,
    contactHelpline: '04553-240120',
    dailyAvgVolumeTonnes: 1950
  },
  {
    id: 'kl-ekm-mattancherry',
    name: 'Mattancherry Spice Exchange & APMC Yard',
    type: 'Principal APMC Yard',
    district: 'Ernakulam / Kochi',
    taluk: 'Kochi',
    state: 'Kerala',
    pincode: '682002',
    commoditiesHandled: ['Black Pepper (Malabar Garbled)', 'Cardamom', 'Ginger (Dry Cochin)', 'Nutmeg', 'Clove'],
    auctionTimings: '09:00 AM - 03:00 PM',
    facilities: ['Spices Board National Testing Lab', 'Export Sea Port Integration', 'e-NAM Terminal'],
    enamEnabled: true,
    contactHelpline: '0484-2224150',
    dailyAvgVolumeTonnes: 1200
  },
  {
    id: 'kl-wyd-sulthanbathery',
    name: 'Sulthan Bathery Spices & Coffee Yard',
    type: 'Principal APMC Yard',
    district: 'Wayanad',
    taluk: 'Sulthan Bathery',
    state: 'Kerala',
    pincode: '673592',
    commoditiesHandled: ['Robusta Coffee', 'Black Pepper', 'Cardamom', 'Ginger', 'Rubber'],
    auctionTimings: '08:30 AM - 02:00 PM',
    facilities: ['Coffee Moisture & Grading Lab', 'e-NAM System', 'Farmer Processing Desks'],
    enamEnabled: true,
    contactHelpline: '04936-220140',
    dailyAvgVolumeTonnes: 850
  },

  // ===================== WEST BENGAL & BIHAR =====================
  {
    id: 'wb-kol-posta',
    name: 'Kolkata Posta Wholesale Agri Market',
    type: 'Principal APMC Yard',
    district: 'Kolkata',
    taluk: 'Kolkata North',
    state: 'West Bengal',
    pincode: '700007',
    commoditiesHandled: ['Rice (Gobindobhog & Miniket)', 'Mustard Oilseed', 'Potato (Jyoti)', 'Pulses', 'Spices'],
    auctionTimings: '06:00 AM - 02:00 PM (Mon-Sat)',
    facilities: ['Central River & Rail Freight Connectivity', 'Covered Trading Yards', 'Electronic Weighbridges'],
    enamEnabled: true,
    contactHelpline: '033-22591230',
    dailyAvgVolumeTonnes: 4800
  },
  {
    id: 'wb-dar-siliguri',
    name: 'Siliguri Regulated Market Yard',
    type: 'Principal APMC Yard',
    district: 'Darjeeling',
    taluk: 'Siliguri',
    state: 'West Bengal',
    pincode: '734001',
    commoditiesHandled: ['Pineapple (Bidhan & Queen)', 'Ginger', 'Cardamom', 'Vegetables', 'Tea Packaging'],
    auctionTimings: '06:30 AM - 01:30 PM',
    facilities: ['North-East Gateway Logistic Hub', 'Cold Rooms', 'e-NAM Gateway'],
    enamEnabled: true,
    contactHelpline: '0353-2541240',
    dailyAvgVolumeTonnes: 2100
  },
  {
    id: 'br-prn-gulabbagh',
    name: 'Gulabbagh Mandi Purnea (Asia\'s Largest Maize Market)',
    type: 'Principal APMC Yard',
    district: 'Purnea',
    taluk: 'Purnea',
    state: 'Bihar',
    pincode: '854326',
    commoditiesHandled: ['Yellow Maize (Corn - Benchmark)', 'Makhana (Foxnut GI Tagged)', 'Jute', 'Paddy', 'Wheat'],
    auctionTimings: '07:30 AM - 03:00 PM (Daily)',
    facilities: ['Makhana Processing & Export Hub', 'Direct Grain Siding for Freight Trains', 'e-NAM Electronic Desks'],
    enamEnabled: true,
    contactHelpline: '06454-242110',
    dailyAvgVolumeTonnes: 5400
  },
  {
    id: 'br-pat-mithapur',
    name: 'Patna Mithapur Agriculture Market',
    type: 'Principal APMC Yard',
    district: 'Patna',
    taluk: 'Patna Sadar',
    state: 'Bihar',
    pincode: '800001',
    commoditiesHandled: ['Vegetables', 'Paddy', 'Wheat', 'Mango (Zardalu GI Tagged)', 'Potato'],
    auctionTimings: '06:00 AM - 01:30 PM',
    facilities: ['Direct Buyer Sheds', 'Electronic Weighing', 'e-NAM'],
    enamEnabled: true,
    contactHelpline: '0612-2351240',
    dailyAvgVolumeTonnes: 1900
  },

  // ===================== NORTH & NORTH-EAST =====================
  {
    id: 'hp-sml-theog',
    name: 'Theog APMC Apple & Horticulture Market',
    type: 'Principal APMC Yard',
    district: 'Shimla',
    taluk: 'Theog',
    state: 'Himachal Pradesh',
    pincode: '171201',
    commoditiesHandled: ['Apple (Royal Delicious, Golden)', 'Cherry', 'Garlic', 'Off-season Peas', 'Cauliflower'],
    auctionTimings: '07:00 AM - 03:00 PM (Seasonal Peak 24/7)',
    facilities: ['Controlled Atmosphere (CA) Cold Stores', 'Automated Apple Grading & Packing Lines', 'e-NAM Bidding'],
    enamEnabled: true,
    contactHelpline: '01783-238120',
    dailyAvgVolumeTonnes: 3200
  },
  {
    id: 'jk-bar-sopore',
    name: 'Sopore Fruit Mandi (Asia\'s 2nd Largest Apple Terminal)',
    type: 'Principal APMC Yard',
    district: 'Baramulla',
    taluk: 'Sopore',
    state: 'Jammu & Kashmir',
    pincode: '193201',
    commoditiesHandled: ['Kashmir Apple (Delicious, Kulu, Maharaji)', 'Walnut', 'Almond', 'Cherry', 'Pear'],
    auctionTimings: '07:00 AM - 04:00 PM (Daily)',
    facilities: ['High-capacity CA Storage (30,000 MT)', 'Electronic Weight Verification', 'National Transport Bays'],
    enamEnabled: true,
    contactHelpline: '01954-222140',
    dailyAvgVolumeTonnes: 4600
  },
  {
    id: 'as-kam-pamohi',
    name: 'Guwahati Pamohi APMC Market Yard',
    type: 'Principal APMC Yard',
    district: 'Kamrup Metropolitan',
    taluk: 'Guwahati',
    state: 'Assam',
    pincode: '781035',
    commoditiesHandled: ['Bhut Jolokia (Ghost Pepper GI)', 'Assam Ginger', 'Brahmaputra Paddy', 'Mustard', 'Jute'],
    auctionTimings: '07:00 AM - 01:30 PM',
    facilities: ['North-East Spices Processing Desk', 'e-NAM Gateway', 'Covered Drying Yard'],
    enamEnabled: true,
    contactHelpline: '0361-2841240',
    dailyAvgVolumeTonnes: 1400
  },

  // ===================== DELHI NATIONAL CAPITAL REGION =====================
  {
    id: 'dl-del-azadpur',
    name: 'Azadpur Mandi (Asia\'s Largest Fruit & Vegetable Terminal)',
    type: 'Principal APMC Yard',
    district: 'North Delhi',
    taluk: 'Model Town',
    state: 'Delhi',
    pincode: '110033',
    commoditiesHandled: ['Onion', 'Potato', 'Tomato', 'Apple', 'Mango', 'All Fresh Produce across India'],
    auctionTimings: '04:00 AM - 02:00 PM (Open 24/7 Operations)',
    facilities: ['Over 3,500 Wholesalers & Commission Agents', 'Mega Cold Storage Complex', 'Electronic Weighbridges', 'e-NAM Trading Hall', 'Direct Rail Linkage'],
    enamEnabled: true,
    contactHelpline: '011-27671120 / apmc-azadpur@delhi.gov.in',
    dailyAvgVolumeTonnes: 12000
  },
  {
    id: 'dl-del-narela',
    name: 'Narela APMC Food Grain Market',
    type: 'Principal APMC Yard',
    district: 'North Delhi',
    taluk: 'Narela',
    state: 'Delhi',
    pincode: '110040',
    commoditiesHandled: ['Wheat', 'Basmati Paddy', 'Mustard', 'Gram', 'Bajra'],
    auctionTimings: '07:30 AM - 02:30 PM',
    facilities: ['Grain Elevators', 'Direct FCI Warehouse Linkage', 'e-NAM Portal', 'Weighbridges'],
    enamEnabled: true,
    contactHelpline: '011-27282310',
    dailyAvgVolumeTonnes: 3800
  },

  // ===================== FLOWERS & SPECIALTY CROP TRADING HUBS =====================
  {
    id: 'dl-east-ghazipur-flower',
    name: 'Ghazipur International Flower Mandi',
    type: 'Specialized Commodity Yard',
    district: 'East Delhi',
    taluk: 'Preet Vihar',
    state: 'Delhi',
    pincode: '110096',
    commoditiesHandled: ['Marigold (Genda)', 'Dutch Rose', 'Gladiolus', 'Carnation', 'Chrysanthemum (Sevanti)', 'Lotus'],
    auctionTimings: '03:00 AM - 10:00 AM (Daily Early Morning Auction)',
    facilities: ['Refrigerated Cold Storage (2-4°C)', 'Dutch Auction Electronic Clock', 'Air-Conditioned Auction Halls', 'Pre-Cooling Chambers', 'Direct Airport Cargo Dispatch'],
    enamEnabled: true,
    contactHelpline: '011-22774890 / ghazipur-flowers@delhi.gov.in',
    dailyAvgVolumeTonnes: 620
  },
  {
    id: 'ka-blr-kr-market-flower',
    name: 'KR Market Wholesale Flower Terminal & IFAB',
    type: 'Specialized Commodity Yard',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    taluk: 'Bengaluru South',
    pincode: '560002',
    commoditiesHandled: ['Marigold', 'Jasmine (Mogra)', 'Dutch Rose', 'Chrysanthemum (Shevanti)', 'Tuberose (Rajnigandha)', 'Crossandra (Kanakambaram)'],
    auctionTimings: '02:30 AM - 09:30 AM (Daily 365 Days)',
    facilities: ['IFAB International Electronic Flower Auction Clock', 'Cold Storage (50 MT)', 'Moisture Testing', 'Direct Kempegowda Airport Air-Cargo Link'],
    enamEnabled: true,
    contactHelpline: '080-26701452 / ifab-bengaluru@karnataka.gov.in',
    dailyAvgVolumeTonnes: 850
  },
  {
    id: 'tn-kri-hosur-flower',
    name: 'Hosur International Flower Auction Centre (IFAB / TANFLORA)',
    type: 'Specialized Commodity Yard',
    district: 'Krishnagiri',
    state: 'Tamil Nadu',
    taluk: 'Hosur',
    pincode: '635109',
    commoditiesHandled: ['Polyhouse Dutch Roses', 'Carnations', 'Gerbera Daisies', 'Gladiolus', 'Lilies'],
    auctionTimings: '05:00 AM - 11:30 AM (Mon-Sat)',
    facilities: ['Computerized Netherlands Auction Clock System', 'Grading & Pre-cooling Chambers', 'Cold-Chain Reefer Truck Fleet', 'Export Phytosanitary Inspection Desk'],
    enamEnabled: true,
    contactHelpline: '04344-245100 / contact@tanflora.com',
    dailyAvgVolumeTonnes: 480
  },
  {
    id: 'tn-mad-mattuthavani-flower',
    name: 'Madurai Mattuthavani Flower Market',
    type: 'Specialized Commodity Yard',
    district: 'Madurai',
    state: 'Tamil Nadu',
    taluk: 'Madurai North',
    pincode: '625007',
    commoditiesHandled: ['Madurai Malli (GI Jasmine)', 'Crossandra (Kanakambaram)', 'Marigold', 'Lotus', 'Tuberose'],
    auctionTimings: '04:00 AM - 11:00 AM (Daily)',
    facilities: ['GI Quality Verification Cell', 'Cold Preservation Unit', 'Perfume & Essential Oil Extraction Hub', 'Electronic Weighing'],
    enamEnabled: true,
    contactHelpline: '0452-2589630',
    dailyAvgVolumeTonnes: 540
  },
  {
    id: 'wb-kol-mullick-ghat-flower',
    name: 'Howrah Mullick Ghat Flower Market (Asia Largest)',
    type: 'Specialized Commodity Yard',
    district: 'Kolkata',
    state: 'West Bengal',
    taluk: 'Kolkata',
    pincode: '700001',
    commoditiesHandled: ['African Marigold', 'Gladiolus', 'Sacred Lotus', 'Tuberose (Rajnigandha)', 'Roses'],
    auctionTimings: '02:00 AM - 10:30 AM (Daily 365 Days)',
    facilities: ['Direct River & Rail Logistic Links', 'Riverfront Covered Auction Platforms', 'Wholesale Bulk Packaging Stalls'],
    enamEnabled: false,
    contactHelpline: '033-22485521',
    dailyAvgVolumeTonnes: 1200
  },
  {
    id: 'mh-pune-gultekdi-flower',
    name: 'Pune APMC Gultekdi Flower Sub-Market',
    type: 'Specialized Commodity Yard',
    district: 'Pune',
    state: 'Maharashtra',
    taluk: 'Haveli',
    pincode: '411037',
    commoditiesHandled: ['Shevanti (Chrysanthemum)', 'Marigold', 'Dutch Rose', 'Gerbera', 'Tuberose'],
    auctionTimings: '04:00 AM - 11:30 AM (Daily)',
    facilities: ['Refrigerated Cold Room', 'Covered Flower Trading Hall', 'Electronic Weighing', 'Kisan Rest Shed'],
    enamEnabled: true,
    contactHelpline: '020-24268140',
    dailyAvgVolumeTonnes: 680
  },
  {
    id: 'ka-shm-shimoga-supari',
    name: 'Shivamogga (Shimoga) APMC Areca Nut Yard',
    type: 'Specialized Commodity Yard',
    district: 'Shivamogga',
    state: 'Karnataka',
    taluk: 'Shivamogga',
    pincode: '577201',
    commoditiesHandled: ['Areca Nut (Rashi Adike)', 'Bette', 'Gorabal', 'Chali Supari', 'Black Pepper'],
    auctionTimings: '09:00 AM - 03:30 PM (Mon-Fri)',
    facilities: ['Tender e-Auction Terminals', 'Moisture Meter Testing Labs', 'CAMPCO Regional Warehouses', 'Pledge Loan Counters'],
    enamEnabled: true,
    contactHelpline: '08182-222410',
    dailyAvgVolumeTonnes: 820
  },
  {
    id: 'ka-tum-tiptur-copra',
    name: 'Tiptur APMC Copra & Coconut Capital Terminal',
    type: 'Specialized Commodity Yard',
    district: 'Tumakuru',
    state: 'Karnataka',
    taluk: 'Tiptur',
    pincode: '572201',
    commoditiesHandled: ['Milling Copra', 'Edible Ball Copra (GI Tag)', 'Dehusked Dry Coconut', 'Tender Coconut'],
    auctionTimings: '08:30 AM - 02:30 PM',
    facilities: ['GI Certification Unit', 'Automated Dehusking & Sorting Yard', 'WDRA Warehouses (10,000 MT)', 'e-NAM Electronic Bidding'],
    enamEnabled: true,
    contactHelpline: '08134-251240 / apmc-tiptur@karnataka.gov.in',
    dailyAvgVolumeTonnes: 1450
  },
  {
    id: 'kl-ktm-kottayam-rubber',
    name: 'Kottayam Rubber Board & APMC Exchange',
    type: 'Specialized Commodity Yard',
    district: 'Kottayam',
    state: 'Kerala',
    taluk: 'Kottayam',
    pincode: '686001',
    commoditiesHandled: ['Natural Sheet Rubber (RSS-4)', 'RSS-5', 'ISNR-20', 'Latex 60%', 'Pepper'],
    auctionTimings: '09:30 AM - 04:00 PM',
    facilities: ['Rubber Board Certified Quality Testing Lab', 'Moisture & Dirt Analyzer', 'Electronic Spot Price Terminal', 'Bonded Godowns'],
    enamEnabled: true,
    contactHelpline: '0481-2571210 / info@rubberboard.org.in',
    dailyAvgVolumeTonnes: 720
  },
  {
    id: 'mp-nee-neemuch-medicinal',
    name: 'Neemuch APMC Herbal & Medicinal Mandi (Asia Largest)',
    type: 'Specialized Commodity Yard',
    district: 'Neemuch',
    state: 'Madhya Pradesh',
    taluk: 'Neemuch',
    pincode: '458441',
    commoditiesHandled: ['Ashwagandha Roots', 'Safed Musli', 'Isabgol', 'Kalmegh', 'Shatavari', 'Soybean', 'Garlic'],
    auctionTimings: '08:30 AM - 04:30 PM (Mon-Sat)',
    facilities: ['Government Ayurvedic Quality & Phytochemical Testing Lab', 'Herb Moisture Analyzers', 'e-NAM Open Cry & Digital Auction', 'WDRA Dry Godowns'],
    enamEnabled: true,
    contactHelpline: '07423-220140 / apmc-neemuch@mp.gov.in',
    dailyAvgVolumeTonnes: 1850
  },
  {
    id: 'up-sam-sambhal-mentha',
    name: 'Sambhal APMC Mentha Oil & Essential Oils Terminal',
    type: 'Specialized Commodity Yard',
    district: 'Sambhal',
    state: 'Uttar Pradesh',
    taluk: 'Sambhal',
    pincode: '244302',
    commoditiesHandled: ['Mentha Oil (Peppermint)', 'Menthol Flakes', 'Spearmint Oil', 'Mustard', 'Wheat'],
    auctionTimings: '10:00 AM - 04:00 PM',
    facilities: ['Gas Chromatography (GC-MS) Purity Testing Lab', 'Stainless Steel Tanker Decanting Bay', 'Digital Refractometer Stations', 'MCX Delivery Center'],
    enamEnabled: true,
    contactHelpline: '05923-232110',
    dailyAvgVolumeTonnes: 340
  },
  {
    id: 'kl-ekm-vazhakulam-pineapple',
    name: 'Vazhakulam Pineapple Market (Pineapple City of India)',
    type: 'Specialized Commodity Yard',
    district: 'Ernakulam',
    state: 'Kerala',
    taluk: 'Muvattupuzha',
    pincode: '686670',
    commoditiesHandled: ['Vazhakulam GI Pineapple (Mauritius)', 'Giant Kew', 'Banana (Nendran)', 'Ginger'],
    auctionTimings: '06:00 AM - 01:30 PM (Daily)',
    facilities: ['GI Tag Traceability Center', 'Refrigerated Ripening Chambers (120 MT)', 'Direct Highway Transit Cargo Bay', 'Grading Belts'],
    enamEnabled: true,
    contactHelpline: '0485-2260230',
    dailyAvgVolumeTonnes: 920
  }
];

export interface SearchSellPlacesResult {
  places: CropSellPlace[];
  totalMatches: number;
  distinctDistricts: string[];
  distinctTaluks: string[];
  distinctStates: string[];
}

/**
 * High-performance search function across District, Taluk, State, Mandi Name, and Commodities.
 */
export function searchAllIndiaSellPlaces(query: {
  district?: string;
  taluk?: string;
  state?: string;
  keyword?: string;
  commodity?: string;
  type?: string;
  enamOnly?: boolean;
}): SearchSellPlacesResult {
  let list = [...ALL_INDIA_CROP_SELL_PLACES];

  if (query.state && query.state !== 'All') {
    const s = query.state.toLowerCase();
    list = list.filter(p => p.state.toLowerCase().includes(s));
  }

  if (query.district && query.district !== 'All') {
    const d = query.district.toLowerCase();
    list = list.filter(p => p.district.toLowerCase().includes(d));
  }

  if (query.taluk && query.taluk !== 'All') {
    const t = query.taluk.toLowerCase();
    list = list.filter(p => p.taluk.toLowerCase().includes(t));
  }

  if (query.type && query.type !== 'All') {
    list = list.filter(p => p.type === query.type);
  }

  if (query.enamOnly) {
    list = list.filter(p => p.enamEnabled);
  }

  if (query.commodity && query.commodity !== 'All') {
    const c = query.commodity.toLowerCase();
    list = list.filter(p => p.commoditiesHandled.some(item => item.toLowerCase().includes(c)));
  }

  if (query.keyword && query.keyword.trim()) {
    const q = query.keyword.toLowerCase().trim();
    list = list.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.district.toLowerCase().includes(q) ||
      p.taluk.toLowerCase().includes(q) ||
      p.state.toLowerCase().includes(q) ||
      (p.pincode && p.pincode.includes(q)) ||
      p.commoditiesHandled.some(c => c.toLowerCase().includes(q)) ||
      p.facilities.some(f => f.toLowerCase().includes(q))
    );
  }

  const distinctDistricts = Array.from(new Set(list.map(p => p.district))).sort();
  const distinctTaluks = Array.from(new Set(list.map(p => p.taluk))).sort();
  const distinctStates = Array.from(new Set(list.map(p => p.state))).sort();

  return {
    places: list,
    totalMatches: list.length,
    distinctDistricts,
    distinctTaluks,
    distinctStates
  };
}
