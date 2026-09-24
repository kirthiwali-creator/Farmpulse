import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Building2, 
  Clock, 
  Scale, 
  ExternalLink, 
  CheckCircle2, 
  SlidersHorizontal, 
  X, 
  Phone, 
  TrendingUp, 
  Sparkles,
  Layers,
  ArrowRight,
  Filter,
  Check
} from 'lucide-react';
import { ALL_INDIA_CROP_SELL_PLACES, searchAllIndiaSellPlaces } from '../data/allIndiaSellPlaces';
import { CropSellPlace } from '../types';
import { useApp } from '../context/AppContext';

interface AllIndiaCropSellPlacesFinderProps {
  embedded?: boolean;
  isOpen?: boolean;
  onSelectPlace?: (place: CropSellPlace) => void;
  onClose?: () => void;
}

const POPULAR_DISTRICT_TALUK_PRESETS = [
  { label: 'Hubli (Dharwad, KA)', district: 'Dharwad', taluk: 'Hubli', state: 'Karnataka' },
  { label: 'Bailhongal (Belagavi, KA)', district: 'Belagavi', taluk: 'Bailhongal', state: 'Karnataka' },
  { label: 'Kolar (Kolar, KA)', district: 'Kolar', taluk: 'Kolar', state: 'Karnataka' },
  { label: 'Byadgi (Haveri, KA)', district: 'Haveri', taluk: 'Byadgi', state: 'Karnataka' },
  { label: 'Lasalgaon (Niphad, MH)', district: 'Nashik', taluk: 'Niphad', state: 'Maharashtra' },
  { label: 'Vashi (Navi Mumbai, MH)', district: 'Thane', taluk: 'Thane', state: 'Maharashtra' },
  { label: 'Gultekdi (Pune, MH)', district: 'Pune', taluk: 'Haveli', state: 'Maharashtra' },
  { label: 'Gondal (Rajkot, GJ)', district: 'Rajkot', taluk: 'Gondal', state: 'Gujarat' },
  { label: 'Unjha (Mehsana, GJ)', district: 'Mehsana', taluk: 'Unjha', state: 'Gujarat' },
  { label: 'Khanna (Ludhiana, PB)', district: 'Ludhiana', taluk: 'Khanna', state: 'Punjab' },
  { label: 'Sanwer (Indore, MP)', district: 'Indore', taluk: 'Sanwer', state: 'Madhya Pradesh' },
  { label: 'Guntur (Guntur, AP)', district: 'Guntur', taluk: 'Guntur', state: 'Andhra Pradesh' },
  { label: 'Perundurai (Erode, TN)', district: 'Erode', taluk: 'Perundurai', state: 'Tamil Nadu' },
  { label: 'Azadpur (North Delhi, DL)', district: 'North Delhi', taluk: 'Model Town', state: 'Delhi' },
];

export const AllIndiaCropSellPlacesFinder: React.FC<AllIndiaCropSellPlacesFinderProps> = ({
  embedded = false,
  isOpen = true,
  onSelectPlace,
  onClose
}) => {
  const { setSelectedCropId, setActiveTab } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedTaluk, setSelectedTaluk] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCommodity, setSelectedCommodity] = useState('All');
  const [enamOnly, setEnamOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  if (!embedded && !isOpen) return null;

  // Derive unique states from all records
  const allStates = useMemo(() => {
    return ['All', ...Array.from(new Set(ALL_INDIA_CROP_SELL_PLACES.map(p => p.state))).sort()];
  }, []);

  // Derive districts based on selected state
  const availableDistricts = useMemo(() => {
    let places = ALL_INDIA_CROP_SELL_PLACES;
    if (selectedState !== 'All') {
      places = places.filter(p => p.state === selectedState);
    }
    return ['All', ...Array.from(new Set(places.map(p => p.district))).sort()];
  }, [selectedState]);

  // Derive taluks based on selected state and district
  const availableTaluks = useMemo(() => {
    let places = ALL_INDIA_CROP_SELL_PLACES;
    if (selectedState !== 'All') {
      places = places.filter(p => p.state === selectedState);
    }
    if (selectedDistrict !== 'All') {
      places = places.filter(p => p.district === selectedDistrict);
    }
    return ['All', ...Array.from(new Set(places.map(p => p.taluk))).sort()];
  }, [selectedState, selectedDistrict]);

  // Filtered places
  const searchResults = useMemo(() => {
    return searchAllIndiaSellPlaces({
      keyword: searchTerm,
      state: selectedState,
      district: selectedDistrict,
      taluk: selectedTaluk,
      type: selectedType,
      commodity: selectedCommodity,
      enamOnly
    });
  }, [searchTerm, selectedState, selectedDistrict, selectedTaluk, selectedType, selectedCommodity, enamOnly]);

  const handleApplyPreset = (preset: typeof POPULAR_DISTRICT_TALUK_PRESETS[0]) => {
    setSelectedState(preset.state);
    setSelectedDistrict(preset.district);
    setSelectedTaluk(preset.taluk);
    setSearchTerm('');
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedState('All');
    setSelectedDistrict('All');
    setSelectedTaluk('All');
    setSelectedType('All');
    setSelectedCommodity('All');
    setEnamOnly(false);
  };

  const totalStatesCount = useMemo(() => new Set(ALL_INDIA_CROP_SELL_PLACES.map(p => p.state)).size, []);
  const totalDistrictsCount = useMemo(() => new Set(ALL_INDIA_CROP_SELL_PLACES.map(p => p.district)).size, []);
  const totalTaluksCount = useMemo(() => new Set(ALL_INDIA_CROP_SELL_PLACES.map(p => p.taluk)).size, []);
  const totalEnamCount = useMemo(() => ALL_INDIA_CROP_SELL_PLACES.filter(p => p.enamEnabled).length, []);

  const content = (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-stone-900 rounded-3xl p-6 text-white shadow-xl border border-emerald-900/60 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                All-India Mandi & Crop Sell Places Network
              </span>
              <span className="text-xs text-stone-300 font-mono">
                Official APMC & e-NAM Directory
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
              Find Specific District & Taluk Crop Sell Places
            </h2>
            <p className="text-xs sm:text-sm text-stone-300">
              Locate authorized government APMC yards, sub-market yards, and e-NAM electronic auction floors across all districts and taluks in India with auction schedules, facilities, and direct price linkage.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-xs text-center shrink-0">
            <div className="px-2.5 py-1">
              <div className="text-xl sm:text-2xl font-black text-amber-400 font-display">
                {ALL_INDIA_CROP_SELL_PLACES.length}
              </div>
              <div className="text-[10px] text-stone-400 font-bold uppercase">Sell Places</div>
            </div>
            <div className="px-2.5 py-1 border-l border-white/10">
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-display">
                {totalStatesCount}
              </div>
              <div className="text-[10px] text-stone-400 font-bold uppercase">States/UTs</div>
            </div>
            <div className="px-2.5 py-1 border-l border-white/10">
              <div className="text-xl sm:text-2xl font-black text-teal-300 font-display">
                {totalDistrictsCount}
              </div>
              <div className="text-[10px] text-stone-400 font-bold uppercase">Districts</div>
            </div>
            <div className="px-2.5 py-1 border-l border-white/10">
              <div className="text-xl sm:text-2xl font-black text-cyan-300 font-display">
                {totalTaluksCount}
              </div>
              <div className="text-[10px] text-stone-400 font-bold uppercase">Taluks/Tehsils</div>
            </div>
          </div>
        </div>
      </div>

      {/* PRIMARY SEARCH BAR: District, Taluk, Mandi or Pin */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-5 sm:p-6 space-y-4">
        
        {/* Search Input Box */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            id="all-india-mandi-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type district (e.g. Dharwad, Belagavi, Nashik), taluk (e.g. Hubli, Bailhongal, Niphad), mandi name, or commodity..."
            className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-stone-50 border border-stone-300 text-sm sm:text-base font-semibold text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all shadow-inner"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Click District & Taluk Preset Chips */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Quick District & Taluk Presets
            </span>
            {(selectedState !== 'All' || selectedDistrict !== 'All' || selectedTaluk !== 'All' || searchTerm) && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-emerald-700 hover:underline font-bold cursor-pointer"
              >
                Clear All Filters
              </button>
            )}
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {POPULAR_DISTRICT_TALUK_PRESETS.map((preset, idx) => {
              const isActive = selectedDistrict === preset.district && selectedTaluk === preset.taluk;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all border flex items-center gap-1 shrink-0 ${
                    isActive 
                      ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs' 
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100 hover:border-stone-300'
                  }`}
                >
                  <MapPin className={`w-3 h-3 ${isActive ? 'text-amber-300' : 'text-stone-400'}`} />
                  <span>{preset.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Granular Cascading Dropdowns: State -> District -> Taluk -> Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-stone-100 text-xs">
          
          {/* State Dropdown */}
          <div>
            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
              1. State ({allStates.length - 1} States/UTs)
            </label>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict('All');
                setSelectedTaluk('All');
              }}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {allStates.map(st => (
                <option key={st} value={st}>{st === 'All' ? 'All Indian States' : st}</option>
              ))}
            </select>
          </div>

          {/* District Dropdown */}
          <div>
            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
              2. District ({availableDistricts.length - 1} Districts)
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setSelectedTaluk('All');
              }}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {availableDistricts.map(dist => (
                <option key={dist} value={dist}>{dist === 'All' ? 'All Districts' : dist}</option>
              ))}
            </select>
          </div>

          {/* Taluk / Tehsil Dropdown */}
          <div>
            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
              3. Taluk / Tehsil / Block ({availableTaluks.length - 1} Taluks)
            </label>
            <select
              value={selectedTaluk}
              onChange={(e) => setSelectedTaluk(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {availableTaluks.map(t => (
                <option key={t} value={t}>{t === 'All' ? 'All Taluks / Tehsils' : t}</option>
              ))}
            </select>
          </div>

          {/* Market Type */}
          <div>
            <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">
              4. Market Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Yard Types</option>
              <option value="Principal APMC Yard">Principal APMC Yards</option>
              <option value="Sub-Market Yard">Sub-Market Yards (Up-mandi)</option>
              <option value="e-NAM Integrated Mandi">e-NAM Integrated Floors</option>
              <option value="Specialized Commodity Yard">Specialized Flower & Commodity Terminals</option>
            </select>
          </div>
        </div>

        {/* Checkbox toggle: e-NAM only */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-700">
            <input
              type="checkbox"
              checked={enamOnly}
              onChange={(e) => setEnamOnly(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded border-stone-300 focus:ring-emerald-500 cursor-pointer"
            />
            <span>Show only <strong>e-NAM Electronic Trading Enabled</strong> Mandis ({totalEnamCount} active)</span>
          </label>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-500 font-medium">
              Found <strong>{searchResults.totalMatches}</strong> matching crop sell places
            </span>
            <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold cursor-pointer transition-all ${
                  viewMode === 'grid' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Cards
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`px-2.5 py-1 rounded-md text-xs font-bold cursor-pointer transition-all ${
                  viewMode === 'table' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Table View
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* RESULTS DISPLAY */}
      {searchResults.places.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-amber-700">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-stone-800">No Crop Sell Places Found</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            No APMC market yards matched your search filters. Try clearing the district or taluk filter to view all mandis across the state.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-emerald-800 text-white font-bold text-xs cursor-pointer hover:bg-emerald-900 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.places.map((place) => (
            <div
              key={place.id}
              className="bg-white rounded-2xl border border-stone-200/90 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                
                {/* Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    place.type === 'Principal APMC Yard'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-teal-100 text-teal-800 border border-teal-300'
                  }`}>
                    {place.type}
                  </span>

                  {place.enamEnabled ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      e-NAM Live
                    </span>
                  ) : (
                    <span className="text-[10px] text-stone-400 font-semibold">
                      Physical APMC
                    </span>
                  )}
                </div>

                {/* Mandi Name */}
                <h3 className="text-base font-bold font-display text-stone-900 leading-snug">
                  {place.name}
                </h3>

                {/* District, Taluk, State Badges */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-600">
                  <span className="inline-flex items-center gap-1 bg-stone-100 px-2 py-0.5 rounded-md font-semibold text-stone-800">
                    <MapPin className="w-3 h-3 text-stone-500" />
                    Taluk: <strong>{place.taluk}</strong>
                  </span>
                  <span className="bg-stone-100 px-2 py-0.5 rounded-md font-semibold text-stone-800">
                    District: <strong>{place.district}</strong>
                  </span>
                  <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-semibold">
                    {place.state}
                  </span>
                  {place.pincode && (
                    <span className="font-mono text-stone-400 text-[11px]">
                      PIN {place.pincode}
                    </span>
                  )}
                </div>

                {/* Operating hours & Daily Volume */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-stone-100">
                  <div className="space-y-0.5">
                    <div className="text-stone-400 font-bold uppercase text-[9px] flex items-center gap-1">
                      <Clock className="w-3 h-3 text-stone-400" />
                      Auction Hours
                    </div>
                    <div className="font-semibold text-stone-800 truncate" title={place.auctionTimings}>
                      {place.auctionTimings}
                    </div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-stone-400 font-bold uppercase text-[9px] flex items-center gap-1">
                      <Scale className="w-3 h-3 text-stone-400" />
                      Avg Daily Trade
                    </div>
                    <div className="font-bold text-emerald-800">
                      {place.dailyAvgVolumeTonnes.toLocaleString('en-IN')} Tonnes / day
                    </div>
                  </div>
                </div>

                {/* Commodities Handled */}
                <div className="space-y-1 pt-1 border-t border-stone-100">
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    Commodities Handled:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {place.commoditiesHandled.map((comm, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-[10px] font-medium"
                      >
                        {comm}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Facilities */}
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    Yard Facilities:
                  </div>
                  <div className="text-[11px] text-stone-600 line-clamp-2" title={place.facilities.join(' • ')}>
                    {place.facilities.join(' • ')}
                  </div>
                </div>

                {/* Helpline */}
                {place.contactHelpline && (
                  <div className="text-[10px] text-stone-500 flex items-center gap-1 font-mono pt-1">
                    <Phone className="w-3 h-3 text-stone-400 shrink-0" />
                    <span className="truncate">{place.contactHelpline}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectPlace) {
                      onSelectPlace(place);
                    } else {
                      // Map first commodity if possible
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
                      
                      setActiveTab('prices');
                    }
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                >
                  <span>Compare Modal Rates</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href={place.enamEnabled ? 'https://enam.gov.in' : 'https://agmarknet.gov.in'}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition-colors"
                  title="View on Official Agmarknet / e-NAM Portal"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-xs bg-white">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-stone-100 border-b border-stone-200 text-[10px] text-stone-500 uppercase font-bold tracking-wider">
                <th className="py-3 px-4">Mandi & Type</th>
                <th className="py-3 px-4">Taluk / Tehsil</th>
                <th className="py-3 px-4">District</th>
                <th className="py-3 px-4">State</th>
                <th className="py-3 px-4">Key Commodities</th>
                <th className="py-3 px-4">Daily Volume</th>
                <th className="py-3 px-4">e-NAM</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {searchResults.places.map((place) => (
                <tr key={place.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-stone-900">{place.name}</div>
                    <div className="text-[10px] text-stone-400 font-medium">{place.type}</div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-stone-800">
                    {place.taluk}
                  </td>
                  <td className="py-3 px-4 font-semibold text-stone-800">
                    {place.district}
                  </td>
                  <td className="py-3 px-4 text-stone-600">
                    {place.state}
                  </td>
                  <td className="py-3 px-4 text-stone-600 max-w-xs">
                    <span className="line-clamp-1">{place.commoditiesHandled.join(', ')}</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-800">
                    {place.dailyAvgVolumeTonnes.toLocaleString('en-IN')} T
                  </td>
                  <td className="py-3 px-4">
                    {place.enamEnabled ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Yes
                      </span>
                    ) : (
                      <span className="text-stone-400 text-[10px]">No</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
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
                        
                        setActiveTab('prices');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs cursor-pointer"
                    >
                      Compare
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );

  if (embedded) {
    return content;
  }

  // Modal mode
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-stone-50 rounded-3xl shadow-2xl border border-stone-200 w-full max-w-6xl max-h-[92vh] overflow-y-auto my-auto relative animate-in fade-in zoom-in-95 duration-200 p-4 sm:p-6">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 cursor-pointer transition-colors z-20"
            title="Close Finder"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        {content}
      </div>
    </div>
  );
};
