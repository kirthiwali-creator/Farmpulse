import React, { useState } from 'react';
import { 
  TrendingUp, 
  Search, 
  Truck, 
  MapPin, 
  BrainCircuit, 
  Store, 
  Calculator, 
  Info, 
  Presentation, 
  Award,
  ChevronRight,
  Database,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Scale,
  Clock,
  Building2,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CROPS_CATALOG, MANDI_RECORDS, HISTORICAL_PRICE_DATA } from '../data/mockData';
import { LIVE_24_7_CROP_RATES } from '../data/liveRatesData';
import { CropPresentValueVerifierModal } from '../components/CropPresentValueVerifierModal';
import { AllIndiaCropSellPlacesFinder } from '../components/AllIndiaCropSellPlacesFinder';
import { calculateNetRealization } from '../services/aiService';

export const PriceDiscoveryPage: React.FC = () => {
  const { selectedCropId, setSelectedCropId, setActiveTab } = useApp();
  const [activeViewMode, setActiveViewMode] = useState<'arbitrage' | 'all-india-places'>('arbitrage');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [transportCapacityQ, setTransportCapacityQ] = useState(100);
  const [customDistanceKm, setCustomDistanceKm] = useState(180);
  const [isVerifierOpen, setIsVerifierOpen] = useState(false);
  const [selectedCropCategory, setSelectedCropCategory] = useState<string>('All');
  const [cropSearchInput, setCropSearchInput] = useState('');

  const filteredCrops = React.useMemo(() => {
    return CROPS_CATALOG.filter(crop => {
      const matchesCategory = selectedCropCategory === 'All' || crop.category === selectedCropCategory;
      const matchesSearch = cropSearchInput === '' || 
        crop.name.toLowerCase().includes(cropSearchInput.toLowerCase()) || 
        crop.hindiName.toLowerCase().includes(cropSearchInput.toLowerCase()) ||
        crop.category.toLowerCase().includes(cropSearchInput.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCropCategory, cropSearchInput]);

  const availableStates = React.useMemo(() => {
    const cropMandis = MANDI_RECORDS.filter(m => m.cropId === selectedCropId);
    const states = Array.from(new Set(cropMandis.map(m => m.state))).sort();
    return ['All', ...states];
  }, [selectedCropId]);

  React.useEffect(() => {
    if (selectedState !== 'All' && !availableStates.includes(selectedState)) {
      setSelectedState('All');
    }
  }, [availableStates, selectedState]);

  const currentCrop = CROPS_CATALOG.find(c => c.id === selectedCropId) || CROPS_CATALOG[0];
  const liveRateForCrop = LIVE_24_7_CROP_RATES.find(r => r.cropId === selectedCropId) || LIVE_24_7_CROP_RATES[0];

  const mandisForCrop = MANDI_RECORDS.filter(m => {
    const matchesCrop = m.cropId === selectedCropId;
    const matchesState = selectedState === 'All' || m.state === selectedState;
    const matchesSearch = searchQuery === '' || 
      m.mandiName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      m.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCrop && matchesState && matchesSearch;
  }).sort((a, b) => b.modalPrice - a.modalPrice);

  const historyData = HISTORICAL_PRICE_DATA[selectedCropId] || HISTORICAL_PRICE_DATA['onion'];

  const mandisWithNet = mandisForCrop.map(m => {
    const net = calculateNetRealization(m.modalPrice, m.distanceKmFromNashik);
    return {
      ...m,
      netRealization: net.netRealization,
      freightCost: net.freightCost,
      handlingCost: net.handlingCost
    };
  });

  const bestNetMandi = mandisWithNet.length > 0 
    ? [...mandisWithNet].sort((a, b) => b.netRealization - a.netRealization)[0]
    : null;

  const minPriceInHistory = Math.min(...historyData.map(h => h.price));
  const maxPriceInHistory = Math.max(...historyData.map(h => h.price));
  const priceRange = maxPriceInHistory - minPriceInHistory || 100;
  const chartHeight = 160;
  const chartWidth = 540;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>APMC Mandi Arbitrage & Price Discovery</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
            Real In-Hand Price Discovery (After Transport Math)
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Don’t be misled by high city quotes. Farmpulse automatically subtracts truck freight so you know the true cash in your pocket.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('ai-prediction')}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer transition-all hover:scale-102"
          >
            <BrainCircuit className="w-4 h-4" />
            <span>AI Hold vs. Sell Advice</span>
          </button>
          <button
            onClick={() => setActiveTab('presentation')}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-semibold text-xs border border-stone-300 shadow-xs flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Presentation className="w-4 h-4 text-amber-500" />
            <span>View PPT Deck</span>
          </button>
        </div>
      </div>

      {/* Top View Mode Switcher: Arbitrage vs All-India District/Taluk Sell Places */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 bg-stone-100 rounded-2xl border border-stone-200">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveViewMode('arbitrage')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeViewMode === 'arbitrage'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/70'
            }`}
          >
            <Calculator className="w-4 h-4 text-emerald-300" />
            <span>Mandi Arbitrage & Net Realization</span>
          </button>
          
          <button
            type="button"
            onClick={() => setActiveViewMode('all-india-places')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeViewMode === 'all-india-places'
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/70'
            }`}
          >
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>All-India District & Taluk Sell Places</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[10px] font-black uppercase tracking-wider">
              Search Bar
            </span>
          </button>
        </div>

        <div className="text-xs text-stone-500 font-medium px-2 hidden lg:block">
          {activeViewMode === 'arbitrage' ? (
            <span>Freight Deduction & Net Cash Discovery</span>
          ) : (
            <span>28+ States, Districts, Taluks & e-NAM Mandis</span>
          )}
        </div>
      </div>

      {/* RENDER VIEW ACCORDING TO TAB */}
      {activeViewMode === 'all-india-places' ? (
        <AllIndiaCropSellPlacesFinder
          embedded={true}
          onSelectPlace={(place) => {
            const firstComm = place.commoditiesHandled[0] || 'onion';
            const lower = firstComm.toLowerCase();
            if (lower.includes('onion')) setSelectedCropId('onion');
            else if (lower.includes('soybean')) setSelectedCropId('soybean');
            else if (lower.includes('wheat')) setSelectedCropId('wheat');
            else if (lower.includes('tomato')) setSelectedCropId('tomato');
            else if (lower.includes('rice') || lower.includes('paddy')) setSelectedCropId('rice');
            else if (lower.includes('chilli')) setSelectedCropId('chilli');
            else if (lower.includes('cotton')) setSelectedCropId('cotton');
            else if (lower.includes('potato')) setSelectedCropId('potato');
            setActiveViewMode('arbitrage');
          }}
        />
      ) : (
        <>
          {/* All-India District & Taluk Search Bar Callout Banner */}
          <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-emerald-950 text-white rounded-3xl p-5 border border-stone-800 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Search All-India Crop Sell Places</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold">
                  Looking for Crop Sell Places in a specific District or Taluk?
                </h3>
                <p className="text-xs text-stone-300 max-w-xl">
                  Search across Hubli, Bailhongal, Kolar, Lasalgaon, Gondal, Khanna, Sanwer, Guntur, Azadpur and all Indian states with auction hours, daily volume, and facilities.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveViewMode('all-india-places')}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all shrink-0 hover:scale-102"
              >
                <Search className="w-4 h-4 text-amber-300" />
                <span>Search by District & Taluk</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Live Data Source Attribution Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs">
        <div className="flex items-center gap-2 text-emerald-950 font-medium">
          <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Database className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-bold">Official Feeds: </span>
            <span>Directorate of Marketing & Inspection (Agmarknet) • Resource #9ef84268 • Last Synced 14m ago</span>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('datasources')}
          className="inline-flex items-center gap-1 font-bold text-emerald-800 hover:text-emerald-950 underline shrink-0 cursor-pointer self-start sm:self-auto"
        >
          <span>Inspect API Schema & Data Sources</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Crop Selector with Category Tabs & Quick Search */}
      <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
              <span>All India Crops Catalog</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                {CROPS_CATALOG.length} Commodities
              </span>
            </div>
            <p className="text-[11px] text-stone-500">
              Filter by category or search by crop name to inspect live mandi prices & transport arbitrage
            </p>
          </div>

          {/* Quick Crop Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={cropSearchInput}
              onChange={(e) => setCropSearchInput(e.target.value)}
              placeholder="Search crop (e.g. Jeera, Chilli, Tur)..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-stone-200 rounded-xl text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-emerald-600 shadow-xs"
            />
            {cropSearchInput && (
              <button
                type="button"
                onClick={() => setCropSearchInput('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { label: 'All Crops', val: 'All', count: CROPS_CATALOG.length },
            { label: 'Flowers & Floriculture', val: 'Flower', count: CROPS_CATALOG.filter(c => c.category === 'Flower').length },
            { label: 'Plantation & Nuts', val: 'Plantation', count: CROPS_CATALOG.filter(c => c.category === 'Plantation').length },
            { label: 'Medicinal & Herbs', val: 'Medicinal', count: CROPS_CATALOG.filter(c => c.category === 'Medicinal').length },
            { label: 'Vegetables & Gourds', val: 'Vegetable', count: CROPS_CATALOG.filter(c => c.category === 'Vegetable').length },
            { label: 'Fruits', val: 'Fruit', count: CROPS_CATALOG.filter(c => c.category === 'Fruit').length },
            { label: 'Spices & Condiments', val: 'Spice', count: CROPS_CATALOG.filter(c => c.category === 'Spice').length },
            { label: 'Pulses & Dals', val: 'Pulse', count: CROPS_CATALOG.filter(c => c.category === 'Pulse').length },
            { label: 'Oilseeds', val: 'Oilseed', count: CROPS_CATALOG.filter(c => c.category === 'Oilseed').length },
            { label: 'Cereals & Millets', val: 'Cereal', count: CROPS_CATALOG.filter(c => c.category === 'Cereal').length },
            { label: 'Commercial & Cash', val: 'Commercial', count: CROPS_CATALOG.filter(c => c.category === 'Commercial').length },
          ].map((cat) => {
            const isCatActive = selectedCropCategory === cat.val;
            return (
              <button
                key={cat.val}
                type="button"
                onClick={() => setSelectedCropCategory(cat.val)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 border ${
                  isCatActive
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                  isCatActive ? 'bg-stone-700 text-stone-200' : 'bg-stone-100 text-stone-500'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Crop Selection Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
          {filteredCrops.length === 0 ? (
            <div className="text-xs text-stone-500 italic py-2">
              No crops found matching "{cropSearchInput}". Try another search or reset category.
            </div>
          ) : (
            filteredCrops.map((crop) => {
              const isSelected = crop.id === selectedCropId;
              return (
                <button
                  key={crop.id}
                  onClick={() => setSelectedCropId(crop.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400 hover:bg-stone-100/80'
                  }`}
                >
                  <span>{crop.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${isSelected ? 'bg-emerald-700 text-emerald-100' : 'bg-stone-100 text-stone-500'}`}>
                    {crop.category}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* 24/7 Verified Present Value Guarantee Card */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-5 sm:p-6 overflow-hidden relative">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                24/7 Live APMC Rate Stream
              </span>

              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                Verified Present Market Value (Not Synthetic)
              </span>

              <span className="text-xs text-stone-400 font-mono hidden sm:inline">
                {liveRateForCrop.dataSource.bulletinRef}
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-display">
                {liveRateForCrop.cropName}
              </h2>
              <span className="text-sm font-semibold text-stone-500">
                ({liveRateForCrop.hindiName})
              </span>
            </div>

            <p className="text-xs text-stone-600 max-w-2xl">
              Official Agmarknet benchmark recorded at <strong>{liveRateForCrop.benchmarkMandi}</strong>. Quality grade: <strong>{liveRateForCrop.qualityStandard}</strong> with <strong>{liveRateForCrop.dailyArrivalsMetricTonnes} MT</strong> physical volume traded.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
              <div className="flex items-center gap-1 text-stone-500">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>{liveRateForCrop.lastUpdatedRelative}</span>
              </div>
              <span className="text-stone-300">•</span>
              <div className="flex items-center gap-1 text-stone-700 font-medium">
                <Scale className="w-3.5 h-3.5 text-stone-500" />
                {liveRateForCrop.mspPrice > 0 ? (
                  <span>
                    Govt MSP: <strong>₹{liveRateForCrop.mspPrice.toLocaleString('en-IN')}/Q</strong> 
                    <span className="text-emerald-700 font-bold ml-1">
                      (+₹{liveRateForCrop.mspDifference}/Q premium)
                    </span>
                  </span>
                ) : (
                  <span>Market-driven modal rate (Perishable / No statutory MSP)</span>
                )}
              </div>
            </div>
          </div>

          {/* Right Price & Audit Button Block */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 bg-stone-50 p-4 rounded-2xl border border-stone-200/80">
            <div className="sm:text-right">
              <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                Present Wholesale Modal Rate
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-800 font-display">
                ₹{liveRateForCrop.currentRateQuintal.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-stone-500"> / Quintal</span>
              </div>
              <div className="text-xs font-bold text-stone-600">
                ₹{liveRateForCrop.currentRateKg} / kg
                <span className={`ml-2 text-[11px] font-bold ${liveRateForCrop.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {liveRateForCrop.trend === 'up' ? '+' : ''}{liveRateForCrop.change24hAmount} (24h)
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsVerifierOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-xs hover:scale-102"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Audit Present Value</span>
            </button>
          </div>
        </div>
      </div>

      {/* Highlight Box: Net Realization vs Gross Mandi Rate */}
      {bestNetMandi && (
        <div className="rounded-2xl p-5 bg-gradient-to-r from-emerald-900 to-teal-900 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Highest Net In-Hand Payout Mandi for {currentCrop.name}</span>
            </div>
            <div className="text-xl font-bold font-display">
              {bestNetMandi.mandiName} ({bestNetMandi.state})
            </div>
            <p className="text-xs text-stone-300 max-w-xl">
              Even after deducting <strong>₹{bestNetMandi.freightCost}/Q for freight</strong> and handling, transporting {transportCapacityQ} Quintals to <strong>{bestNetMandi.mandiName}</strong> yields <strong>₹{bestNetMandi.netRealization.toLocaleString('en-IN')}/Q clean cash in pocket</strong>.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center shrink-0 min-w-44">
            <div className="text-[11px] text-emerald-200 uppercase font-semibold">Net Payout In-Hand</div>
            <div className="text-2xl font-black text-amber-300 font-display">
              ₹{bestNetMandi.netRealization.toLocaleString('en-IN')} <span className="text-xs font-normal text-white">/ Q</span>
            </div>
            <div className="text-[10px] text-emerald-300 mt-0.5">
              Gross: ₹{bestNetMandi.modalPrice} | Freight: -₹{bestNetMandi.freightCost}
            </div>
          </div>
        </div>
      )}

      {/* 2-Column: Multi-Mandi Table (Left) + Interactive Freight Calculator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Mandi Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search mandi or district..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-xs border-none outline-none bg-transparent placeholder-stone-400 w-44 sm:w-60"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-stone-500 font-medium">State:</span>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="text-xs border border-stone-200 rounded-lg px-2 py-1 bg-stone-50 text-stone-700 outline-none cursor-pointer"
                >
                  {availableStates.map(stateName => (
                    <option key={stateName} value={stateName}>
                      {stateName === 'All' ? 'All States' : stateName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-100 text-[10px] text-stone-400 uppercase font-bold tracking-wider">
                    <th className="py-2.5 px-2">Mandi & District</th>
                    <th className="py-2.5 px-2">Distance (Hubli)</th>
                    <th className="py-2.5 px-2">Modal Price</th>
                    <th className="py-2.5 px-2">Est. Freight</th>
                    <th className="py-2.5 px-2 text-right">Net In-Hand</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {mandisWithNet.map((m) => {
                    const isBest = bestNetMandi && bestNetMandi.id === m.id;
                    return (
                      <tr 
                        key={m.id}
                        className={`hover:bg-stone-50/80 transition-colors ${
                          isBest ? 'bg-emerald-50/50 font-medium' : ''
                        }`}
                      >
                        <td className="py-3 px-2">
                          <div className="font-bold text-stone-900 flex items-center gap-1.5">
                            <span>{m.mandiName}</span>
                            {isBest && (
                              <span className="bg-emerald-100 text-emerald-800 text-[9px] px-1.5 py-0.2 rounded-full font-bold">
                                Highest In-Hand
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-stone-500">{m.district}, {m.state}</div>
                        </td>
                        <td className="py-3 px-2 text-stone-600 whitespace-nowrap">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-stone-400" />
                            {m.distanceKmFromNashik} km
                          </span>
                        </td>
                        <td className="py-3 px-2 whitespace-nowrap">
                          <div className="font-bold text-stone-900">₹{m.modalPrice.toLocaleString('en-IN')}</div>
                          <div className="text-[10px] text-stone-400">Range: ₹{m.minPrice} - ₹{m.maxPrice}</div>
                        </td>
                        <td className="py-3 px-2 text-rose-700 font-semibold whitespace-nowrap">
                          -₹{m.freightCost}/Q
                        </td>
                        <td className="py-3 px-2 text-right whitespace-nowrap">
                          <div className="text-sm font-extrabold text-emerald-800">
                            ₹{m.netRealization.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[10px] text-stone-400">after cess & handling</div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bottom prompt to open All-India Directory */}
            <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500">
                Want to search specific taluks or up-mandi sub-yards?
              </span>
              <button
                type="button"
                onClick={() => setActiveViewMode('all-india-places')}
                className="font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
              >
                <span>Search All-India District & Taluk Directory</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Historical SVG Chart */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-stone-900 font-display">
                  30-Day Price Movement for {currentCrop.name}
                </h3>
                <p className="text-[11px] text-stone-500">
                  Daily modal rate progression across benchmark mandis
                </p>
              </div>
            </div>

            <div className="w-full overflow-x-auto py-2">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 40}`} className="w-full h-44 overflow-visible">
                {/* Horizontal Grid */}
                {[0.25, 0.5, 0.75, 1.0].map((ratio, idx) => {
                  const y = chartHeight - ratio * (chartHeight - 30);
                  const priceLabel = Math.round(minPriceInHistory + ratio * priceRange);
                  return (
                    <g key={idx}>
                      <line x1="40" y1={y} x2={chartWidth - 10} y2={y} stroke="#e7e5e4" strokeDasharray="3 3" />
                      <text x="35" y={y + 3} textAnchor="end" fontSize="9" fill="#a8a29e">
                        ₹{priceLabel}
                      </text>
                    </g>
                  );
                })}
                {/* Trend line */}
                <polyline
                  fill="none"
                  stroke="#059669"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={historyData
                    .map((item, index) => {
                      const x = 50 + (index / (historyData.length - 1)) * (chartWidth - 80);
                      const normalized = (item.price - minPriceInHistory) / priceRange;
                      const y = chartHeight - normalized * (chartHeight - 30) - 10;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                />
                {/* Points & Labels */}
                {historyData.map((item, index) => {
                  const x = 50 + (index / (historyData.length - 1)) * (chartWidth - 80);
                  const normalized = (item.price - minPriceInHistory) / priceRange;
                  const y = chartHeight - normalized * (chartHeight - 30) - 10;
                  return (
                    <g key={index}>
                      <circle cx={x} cy={y} r={3.5} fill="#059669" stroke="#ffffff" strokeWidth="1.5" />
                      <text x={x} y={chartHeight + 15} textAnchor="middle" fontSize="8.5" fill="#78716c">
                        {item.date}
                      </text>
                      <text x={x} y={y - 8} textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#065f46">
                        ₹{item.price}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column: Custom Road Freight Calculator */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900 font-display">
                  Dynamic Freight Calculator
                </h3>
                <p className="text-[10px] text-stone-500">Calculate net payout before loading truck</p>
              </div>
            </div>

            {/* Input 1: Load Quantity */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 flex justify-between">
                <span>Produce Load Quantity</span>
                <span className="text-emerald-700 font-bold">{transportCapacityQ} Quintals ({transportCapacityQ / 10} Tonnes)</span>
              </label>
              <input
                type="range"
                min="20"
                max="250"
                step="10"
                value={transportCapacityQ}
                onChange={(e) => setTransportCapacityQ(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Input 2: Distance KM */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-700 flex justify-between">
                <span>Distance to Destination</span>
                <span className="text-emerald-700 font-bold">{customDistanceKm} km</span>
              </label>
              <input
                type="range"
                min="10"
                max="1000"
                step="20"
                value={customDistanceKm}
                onChange={(e) => setCustomDistanceKm(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Calculations Breakdown */}
            {(() => {
              const baselinePrice = mandisForCrop[0]?.modalPrice || 2450;
              const freightPerQ = Math.round(customDistanceKm * 0.42);
              const handlingPerQ = 35;
              const netPerQ = baselinePrice - freightPerQ - handlingPerQ;
              const totalGross = baselinePrice * transportCapacityQ;
              const totalFreight = freightPerQ * transportCapacityQ;
              const totalNet = netPerQ * transportCapacityQ;

              return (
                <div className="bg-stone-50 rounded-xl p-3.5 space-y-2 border border-stone-200 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Gross Value ({transportCapacityQ} Q):</span>
                    <span className="font-bold text-stone-900">₹{totalGross.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-rose-700">
                    <span>Truck Diesel & Toll ({customDistanceKm} km):</span>
                    <span className="font-bold">-₹{totalFreight.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Weighing & Mandi Cess:</span>
                    <span className="font-bold">-₹{(handlingPerQ * transportCapacityQ).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-sm font-extrabold text-emerald-900">
                    <span>Net Bank Deposit:</span>
                    <span className="text-base text-emerald-700 font-display">₹{totalNet.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="text-[10px] text-stone-400 text-center">
                    Net cash: ₹{netPerQ}/Q in hand
                  </div>
                </div>
              );
            })()}

            <button
              onClick={() => setActiveTab('marketplace')}
              className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Compare with Direct Buyer Offers
            </button>
          </div>

          {/* Simple Explanation Box */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <Info className="w-4 h-4 text-amber-700" />
              <span>Why Net Realization Matters in SIH26132:</span>
            </div>
            <p className="text-[11px] leading-relaxed text-stone-700">
              Middlemen often trick farmers by quoting high prices in Delhi or Mumbai. Once the farmer travels there, they realize diesel costs eat up all profits. Farmpulse calculates the exact net realization in advance so the farmer never loses money on transport.
            </p>
          </div>
        </div>
      </div>
        </>
      )}

      {/* Present Value Verification Modal */}
      <CropPresentValueVerifierModal
        isOpen={isVerifierOpen}
        onClose={() => setIsVerifierOpen(false)}
        initialCropId={selectedCropId}
        onSelectCrop={(cropId) => setSelectedCropId(cropId)}
      />
    </div>
  );
};
