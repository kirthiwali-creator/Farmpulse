import React, { useState } from 'react';
import { 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Truck, 
  BrainCircuit, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  Award,
  ChevronRight,
  PlusCircle,
  Calculator,
  Store,
  FileText,
  MapPin,
  PhoneCall,
  ChevronDown,
  HelpCircle,
  Layers,
  ArrowUpRight,
  BadgeCheck,
  Clock,
  Shield,
  Search,
  Database
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CROPS_CATALOG, MANDI_RECORDS, INITIAL_PRODUCE_LISTINGS } from '../data/mockData';

export const LandingPage: React.FC = () => {
  const { setActiveTab, setSelectedCropId } = useApp();

  // Quick Calculator state on homepage
  const [calcCropId, setCalcCropId] = useState('onion');
  const [calcQuintals, setCalcQuintals] = useState<number>(50);
  const [calcDistanceKm, setCalcDistanceKm] = useState<number>(45);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Active Market Tab (Listings vs Buyers)
  const [marketTab, setMarketTab] = useState<'listings' | 'rates'>('rates');

  // Search filter
  const [searchCrop, setSearchCrop] = useState('');

  // Selected crop details for calculator
  const selectedCrop = CROPS_CATALOG.find(c => c.id === calcCropId) || CROPS_CATALOG[0];
  const mandiForCalc = MANDI_RECORDS.find(m => m.cropId === calcCropId) || MANDI_RECORDS[0];

  // Calculator Math
  const grossPricePerQuintal = mandiForCalc.modalPrice;
  const freightPerKmPerQuintal = 2.4; // ₹2.4 per km per quintal
  const freightPerQuintal = Math.round(calcDistanceKm * freightPerKmPerQuintal);
  const netInHandPerQuintal = Math.max(0, grossPricePerQuintal - freightPerQuintal);
  const totalGrossValue = grossPricePerQuintal * calcQuintals;
  const totalFreight = freightPerQuintal * calcQuintals;
  const totalNetTakeHome = netInHandPerQuintal * calcQuintals;
  const middlemanFeeSaved = Math.round(totalGrossValue * 0.08); // 8% commission saved

  const filteredMandiRecords = MANDI_RECORDS.filter(m => 
    searchCrop === '' || 
    m.cropName.toLowerCase().includes(searchCrop.toLowerCase()) ||
    m.mandiName.toLowerCase().includes(searchCrop.toLowerCase()) ||
    m.district.toLowerCase().includes(searchCrop.toLowerCase())
  );

  const faqs = [
    {
      q: 'What is "Net In-Hand Payout" and why does it matter?',
      a: 'Most mandi boards advertise only the gross modal price. But if a mandi 80 km away offers ₹2,500/quintal and a mandi 15 km away offers ₹2,350/quintal, the distant mandi might actually yield less profit after truck diesel and loading charges. Farmpulse calculates the exact road freight deduction so you see the real cash that goes into your pocket.'
    },
    {
      q: 'How does the AI predict whether to Hold or Sell?',
      a: 'Farmpulse AI analyzes historical arrivals across 48 regional mandis, current weather conditions, cold storage rent (typically ₹35/quintal/week), and natural weight loss. If the projected price rise exceeds the storage cost, it recommends "HOLD". If a price crash is predicted due to upcoming arrivals, it warns you to "SELL NOW".'
    },
    {
      q: 'How does the Digital Escrow protect my payment?',
      a: 'When an institutional buyer or FPO places an order, 100% of the agreed payment is locked in a certified digital escrow account before dispatch. Once the produce arrives at the weighbridge and quality is verified, the money is instantly disbursed to your bank via Direct Benefit Transfer (DBT).'
    },
    {
      q: 'Do farmers have to pay any middleman commission (Dalal cut)?',
      a: 'Zero commission. In traditional mandis, commission agents cut 6% to 10% from the farmer and another cut from the buyer. Farmpulse connects you directly with institutional buyers, retail chains, and processing plants with no hidden deductions.'
    }
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-50/80 via-white to-stone-50 border-b border-stone-200/60">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-950 text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            <span>Empowering Farmers with Direct Mandi Transparency & Fair Trade</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight font-display max-w-4xl mx-auto leading-tight sm:leading-tight">
            Real In-Hand Mandi Prices. <br className="hidden sm:inline" />
            <span className="text-emerald-700">AI Harvest Timing.</span> Direct Verified Buyers.
          </h1>

          {/* Subtitle in Plain Words */}
          <p className="text-base sm:text-lg text-stone-600 max-w-3xl mx-auto leading-relaxed font-normal">
            Never lose your hard-earned profits to middleman rumors. Discover what you actually take home after road transport, get AI signals on when prices will peak, and sell directly to verified food companies with 100% digital bank safety.
          </p>

          {/* Search Bar for Live Crop Rates */}
          <div className="max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center bg-white rounded-2xl border-2 border-emerald-600/30 p-2 shadow-lg hover:border-emerald-600 transition-colors">
              <Search className="w-5 h-5 text-stone-400 ml-2.5" />
              <input 
                type="text"
                value={searchCrop}
                onChange={(e) => setSearchCrop(e.target.value)}
                placeholder="Search your crop or mandi (e.g. Onion, Tomato, Hubli, Bengaluru)..."
                className="w-full px-3 py-2 text-sm text-stone-800 placeholder-stone-400 focus:outline-none bg-transparent"
              />
              <button
                onClick={() => setActiveTab('prices')}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shrink-0 cursor-pointer shadow-xs transition-colors"
              >
                Find Best Rate
              </button>
            </div>
            {/* Quick Popular Crop Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2.5 text-[11px] text-stone-600">
              <span className="text-stone-400 font-medium">Trending crops:</span>
              {CROPS_CATALOG.slice(0, 5).map((crop) => (
                <button
                  key={crop.id}
                  onClick={() => {
                    setSelectedCropId(crop.id);
                    setCalcCropId(crop.id);
                    setActiveTab('prices');
                  }}
                  className="px-2 py-0.5 rounded-lg bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-800 border border-stone-200 cursor-pointer transition-colors"
                >
                  {crop.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => setActiveTab('prices')}
              className="px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md flex items-center gap-2 cursor-pointer transition-all hover:scale-102"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Explore Live Mandi Prices</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('add-produce')}
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-sm shadow-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-102"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Harvest for Sale</span>
            </button>
            <button
              onClick={() => setActiveTab('ai-prediction')}
              className="px-5 py-3.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-semibold text-sm border border-stone-300 shadow-xs flex items-center gap-2 cursor-pointer transition-all"
            >
              <BrainCircuit className="w-4 h-4 text-emerald-600" />
              <span>AI Hold or Sell Signal</span>
            </button>
          </div>

          {/* Quick Metrics Ticker */}
          <div className="pt-6">
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm max-w-5xl mx-auto">
              <div className="flex items-center justify-between px-2 pb-2.5 text-[11px] font-bold text-stone-500 uppercase tracking-wider border-b border-stone-100">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Live APMC Agmarknet Feeds (Updated Hourly)
                </span>
                <span className="text-stone-400">All India Coverage</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 pt-2.5 text-left">
                {filteredMandiRecords.slice(0, 5).map((m) => (
                  <div 
                    key={m.id}
                    onClick={() => {
                      setSelectedCropId(m.cropId);
                      setActiveTab('prices');
                    }}
                    className="p-3 rounded-xl bg-stone-50 hover:bg-emerald-50/70 border border-stone-200/80 cursor-pointer transition-all hover:shadow-xs"
                  >
                    <div className="text-[11px] font-semibold text-stone-500 truncate">{m.mandiName}</div>
                    <div className="text-xs font-bold text-stone-900 truncate mt-0.5">{m.cropName}</div>
                    <div className="flex items-baseline justify-between mt-1.5">
                      <span className="text-base font-extrabold text-emerald-800">₹{m.modalPrice.toLocaleString('en-IN')}</span>
                      <span className="text-[10px] text-stone-500">/ quintal</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] mt-1 pt-1 border-t border-stone-200/50">
                      <span className="text-stone-500">{m.district}</span>
                      <span className={`font-bold ${m.priceTrend === 'up' ? 'text-emerald-600' : 'text-stone-600'}`}>
                        {m.priceTrend === 'up' ? `+${m.changePercent}%` : 'Stable'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE TAKE-HOME IN-HAND PAYOUT CALCULATOR */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-700/50 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-700/60 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-bold uppercase mb-2">
                <Calculator className="w-3.5 h-3.5" />
                <span>Interactive Farmer Calculator</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Calculate Your Real In-Hand Profit
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200 mt-1 max-w-2xl">
                See exactly what goes into your bank account after truck transport diesel deductions.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('prices')}
              className="self-start md:self-auto px-4 py-2 bg-white hover:bg-emerald-50 text-emerald-950 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors shrink-0"
            >
              <span>View All 48 Mandis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Calculator Controls and Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Input Controls */}
            <div className="lg:col-span-6 space-y-4">
              {/* Crop Choice */}
              <div>
                <label className="block text-xs font-bold text-emerald-200 mb-1.5 uppercase tracking-wider">
                  Select Your Crop
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {CROPS_CATALOG.slice(0, 6).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCalcCropId(c.id)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold text-left transition-all cursor-pointer truncate ${
                        calcCropId === c.id
                          ? 'bg-amber-400 text-stone-950 ring-2 ring-amber-300'
                          : 'bg-emerald-950/60 text-emerald-100 hover:bg-emerald-900 border border-emerald-700/60'
                      }`}
                    >
                      {c.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Slider */}
              <div className="space-y-1.5 bg-emerald-950/40 p-4 rounded-2xl border border-emerald-700/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-emerald-200 font-semibold">Your Harvest Quantity:</span>
                  <span className="font-extrabold text-amber-300 text-sm">{calcQuintals} Quintals ({calcQuintals * 100} kg)</span>
                </div>
                <input 
                  type="range"
                  min={10}
                  max={300}
                  step={5}
                  value={calcQuintals}
                  onChange={(e) => setCalcQuintals(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-emerald-300/80">
                  <span>Small Farmer (10 Qtl)</span>
                  <span>Medium (100 Qtl)</span>
                  <span>Commercial (300 Qtl)</span>
                </div>
              </div>

              {/* Distance Slider */}
              <div className="space-y-1.5 bg-emerald-950/40 p-4 rounded-2xl border border-emerald-700/50">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-emerald-200 font-semibold">Distance to Mandi:</span>
                  <span className="font-extrabold text-amber-300 text-sm">{calcDistanceKm} km</span>
                </div>
                <input 
                  type="range"
                  min={5}
                  max={200}
                  step={5}
                  value={calcDistanceKm}
                  onChange={(e) => setCalcDistanceKm(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-emerald-300/80">
                  <span>Local Mandi (5 km)</span>
                  <span>City Hub (75 km)</span>
                  <span>Distant Terminal (200 km)</span>
                </div>
              </div>
            </div>

            {/* Results Display Card */}
            <div className="lg:col-span-6 bg-stone-900/90 rounded-2xl p-5 border border-emerald-600/40 space-y-4">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-stone-800">
                <span className="text-stone-300">Selected Market Rate:</span>
                <span className="font-bold text-white text-sm">
                  {mandiForCalc.mandiName} • ₹{grossPricePerQuintal.toLocaleString('en-IN')}/Qtl
                </span>
              </div>

              {/* Math breakdown */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center text-stone-300">
                  <span>Gross Mandi Board Value ({calcQuintals} Qtl × ₹{grossPricePerQuintal}):</span>
                  <span className="font-semibold text-white">₹{totalGrossValue.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-center text-rose-300">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-rose-400" />
                    <span>Estimated Truck Freight ({calcDistanceKm} km):</span>
                  </span>
                  <span className="font-bold">- ₹{totalFreight.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-center text-emerald-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Zero Middleman Dalal Cut (Saved ~8%):</span>
                  </span>
                  <span className="font-bold">+ ₹{middlemanFeeSaved.toLocaleString('en-IN')} Saved</span>
                </div>
              </div>

              {/* Final Big Net Payout */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950 to-stone-900 border border-emerald-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                    Your Real Net Take-Home Payout
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-display">
                    ₹{totalNetTakeHome.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-stone-300">
                    (₹{netInHandPerQuintal.toLocaleString('en-IN')} per quintal in your hand)
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedCropId(calcCropId);
                    setActiveTab('add-produce');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-stone-950 font-bold text-xs cursor-pointer shadow-md transition-colors shrink-0 flex items-center justify-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>List for This Price</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR CORE MODULES FOR FARMERS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Comprehensive Digital Tools
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
            How Farmpulse Protects Your Harvest & Profit
          </h2>
          <p className="text-sm text-stone-600 max-w-2xl mx-auto">
            Everything an Indian farmer needs to get the maximum rupee value for every single quintal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div 
            onClick={() => setActiveTab('prices')}
            className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-emerald-500 hover:shadow-lg cursor-pointer transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2">1. Mandi Price Discovery</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Live rates from APMC Agmarknet across districts. Compares gross price with distance to reveal the true highest-paying market.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>Compare Mandi Rates</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => setActiveTab('ai-prediction')}
            className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-amber-500 hover:shadow-lg cursor-pointer transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2">2. AI Hold vs Sell Advice</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                14-day price forecasting algorithm. Tells you whether holding in cold storage will increase your profit or if prices will crash.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-amber-700">
              <span>Get AI Recommendation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => setActiveTab('marketplace')}
            className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-teal-500 hover:shadow-lg cursor-pointer transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2">3. Direct FPO & Buyers</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Connect directly with certified Farmer Producer Organizations (FPOs), retail chains, and food processors with zero middleman dalal.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-teal-700">
              <span>Find Verified Buyers</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4 */}
          <div 
            onClick={() => setActiveTab('deals')}
            className="p-6 rounded-2xl bg-white border border-stone-200 hover:border-indigo-500 hover:shadow-lg cursor-pointer transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-2">4. Digital Escrow & DBT</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                100% money deposited in certified bank escrow before harvest leaves your farm. Payment released upon weighbridge verification.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-indigo-700">
              <span>Track Escrow Deals</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. REAL-WORLD CASE STUDY: RAMESH PATIL (LASALGAON, MAHARASHTRA) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-amber-50/70 border border-amber-300 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-2">
            <Award className="w-4 h-4 text-amber-700" />
            <span>Real-World Impact Story</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-2xl font-bold text-stone-900 font-display">
                How Ramesh Patil Earned ₹1,15,000 More on His Onion Harvest
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                Ramesh Patil, a farmer from Lasalgaon, harvested <strong>100 quintals of red onions</strong>. In previous seasons, middleman agents offered only ₹1,500/quintal at his farm gate, warning him that prices would crash.
              </p>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                Using Farmpulse, Ramesh saw that Bengaluru APMC was paying ₹2,850/quintal. The AI advised him to <strong>HOLD for 10 days</strong>, where prices peaked at ₹3,100/quintal. A verified FPO purchased his crop directly, locking ₹3,10,000 in escrow with doorstep truck pickup!
              </p>

              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold border border-emerald-300">
                  +69.7% Higher Net Cash
                </span>
                <span className="px-3 py-1 rounded-lg bg-white text-stone-700 font-semibold border border-stone-200">
                  Doorstep Logistics
                </span>
                <span className="px-3 py-1 rounded-lg bg-white text-stone-700 font-semibold border border-stone-200">
                  Instant DBT Payment
                </span>
              </div>
            </div>

            {/* Comparison Box */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-4 sm:p-5 border border-amber-200 shadow-sm space-y-3">
              <div className="text-xs font-bold text-stone-900 pb-2 border-b border-stone-100 flex justify-between">
                <span>Outcome Comparison (100 Quintals)</span>
                <span className="text-emerald-700 font-bold">Lasalgaon, MH</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-stone-800">
                  <div className="font-bold text-rose-800 text-[11px]">WITHOUT FARMPULSE (Middleman Distress Sale):</div>
                  <div className="flex justify-between mt-1">
                    <span>100 Qtl @ ₹1,500/Qtl:</span>
                    <span className="font-bold">₹1,50,000</span>
                  </div>
                  <div className="text-[10px] text-rose-700 mt-0.5">
                    Minus 8% Dalal Cut & Uncalibrated Scale Loss (-₹15,000)
                  </div>
                  <div className="text-xs font-extrabold text-rose-900 pt-1 border-t border-rose-200 mt-1 flex justify-between">
                    <span>Net in Pocket:</span>
                    <span>₹1,35,000</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-stone-800">
                  <div className="font-bold text-emerald-800 text-[11px]">WITH FARMPULSE (AI Hold + Direct FPO Escrow):</div>
                  <div className="flex justify-between mt-1">
                    <span>100 Qtl @ ₹3,100/Qtl:</span>
                    <span className="font-bold text-emerald-900">₹3,10,000</span>
                  </div>
                  <div className="text-[10px] text-emerald-700 mt-0.5">
                    Minus Transport & 10-day storage (-₹60,000)
                  </div>
                  <div className="text-xs font-extrabold text-emerald-900 pt-1 border-t border-emerald-200 mt-1 flex justify-between">
                    <span>Net Cash in Bank:</span>
                    <span className="text-sm text-emerald-700">₹2,50,000</span>
                  </div>
                </div>
              </div>

              <div className="text-center pt-1">
                <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  Net Gain: +₹1,15,000 Extra Cash!
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS: 4-STEP VISUAL JOURNEY */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Simple 4-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
            From Your Farm Gate to Your Bank Account
          </h2>
          <p className="text-sm text-stone-600 max-w-xl mx-auto">
            Designed for ease of use, local language support, and zero confusion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 relative space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white font-extrabold flex items-center justify-center text-sm">
              1
            </div>
            <h4 className="font-bold text-stone-900 text-sm">Check True Mandi Rates</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Enter your crop and location. Farmpulse displays live rates with freight deductions so you see true take-home pay.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 relative space-y-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 font-extrabold flex items-center justify-center text-sm">
              2
            </div>
            <h4 className="font-bold text-stone-900 text-sm">Follow AI Timing Signal</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              See 14-day price predictions. Learn if holding produce in local storage will increase your returns or if you should sell immediately.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 relative space-y-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white font-extrabold flex items-center justify-center text-sm">
              3
            </div>
            <h4 className="font-bold text-stone-900 text-sm">Deal with Verified Buyers</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Accept orders from government-registered FPOs, retail giants, or food processing factories. No dalal cuts.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 relative space-y-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-extrabold flex items-center justify-center text-sm">
              4
            </div>
            <h4 className="font-bold text-stone-900 text-sm">Escrow Bank Payment</h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Produce is weighed digitally at the weighbridge. Payment is deposited straight into your bank account with no delay.
            </p>
          </div>
        </div>
      </section>

      {/* 6. LIVE PRODUCE LISTINGS & MARKETPLACE PREVIEW */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Live Trade Board
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-stone-900">
                Active Farm Produce Available for Procurement
              </h3>
            </div>

            <button
              onClick={() => setActiveTab('marketplace')}
              className="self-start sm:self-auto px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Store className="w-4 h-4" />
              <span>Enter Full Marketplace</span>
            </button>
          </div>

          {/* Harvest Listings Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INITIAL_PRODUCE_LISTINGS.slice(0, 3).map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-400 hover:shadow-xs transition-all space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {item.qualityGrade}
                    </span>
                    <h4 className="font-bold text-sm text-stone-900 mt-1">{item.cropName}</h4>
                    <div className="flex items-center gap-1 text-[11px] text-stone-500 mt-0.5">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      <span>{item.farmerLocation}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-extrabold text-emerald-800">₹{item.expectedPricePerQuintal}</div>
                    <div className="text-[10px] text-stone-500">per quintal</div>
                  </div>
                </div>

                <div className="text-xs text-stone-600 bg-white p-2.5 rounded-xl border border-stone-200/60 flex justify-between">
                  <span>Available Quantity:</span>
                  <span className="font-bold text-stone-900">{item.quantityQuintals} Quintals</span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[11px] text-stone-500 flex items-center gap-1">
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{item.farmerName} (Verified)</span>
                  </span>
                  <button
                    onClick={() => setActiveTab('marketplace')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs cursor-pointer"
                  >
                    Place Bid
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. VERIFIED GOVERNMENT DATA SOURCES & API NETWORK */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-900 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800/80 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800 text-emerald-100 text-xs font-bold mb-2">
                <Database className="w-3.5 h-3.5 text-emerald-300" />
                <span>Open Government Data (data.gov.in)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                Official Agricultural Data Sources & Open APIs
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200 mt-1 max-w-2xl">
                Farmpulse does not rely on unverified hearsay. All price quotes, arrival volumes, weather risks, and freight tariffs are ingested via verified public APIs.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('datasources')}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all shrink-0 self-start sm:self-auto"
            >
              <Database className="w-4 h-4" />
              <span>Explore All Data Sources & Schemas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              onClick={() => setActiveTab('datasources')}
              className="p-4 rounded-2xl bg-emerald-900/60 border border-emerald-800 hover:border-emerald-500/50 hover:bg-emerald-900/90 transition-all cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-800 text-emerald-200">
                  Agmarknet API
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">142ms</span>
              </div>
              <h4 className="font-bold text-sm text-white">APMC Mandi Prices</h4>
              <p className="text-[11px] text-emerald-200 leading-relaxed">
                Daily arrival volumes (MT) and min, max & modal prices from 2,800+ regulated APMC mandis nationwide.
              </p>
            </div>

            <div 
              onClick={() => setActiveTab('datasources')}
              className="p-4 rounded-2xl bg-emerald-900/60 border border-emerald-800 hover:border-emerald-500/50 hover:bg-emerald-900/90 transition-all cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-800 text-teal-200">
                  e-NAM Gateway
                </span>
                <span className="text-[10px] text-teal-300 font-bold">168ms</span>
              </div>
              <h4 className="font-bold text-sm text-white">Electronic Auctions</h4>
              <p className="text-[11px] text-emerald-200 leading-relaxed">
                Computerized weighbridge lots and electronic trade benchmarking across 1,361 integrated APMCs.
              </p>
            </div>

            <div 
              onClick={() => setActiveTab('datasources')}
              className="p-4 rounded-2xl bg-emerald-900/60 border border-emerald-800 hover:border-emerald-500/50 hover:bg-emerald-900/90 transition-all cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-800 text-amber-200">
                  IMD Agromet
                </span>
                <span className="text-[10px] text-amber-300 font-bold">195ms</span>
              </div>
              <h4 className="font-bold text-sm text-white">Weather & Spoilage</h4>
              <p className="text-[11px] text-emerald-200 leading-relaxed">
                District-level humidity, rainfall alerts, and shelf-life projections to prevent transit rot.
              </p>
            </div>

            <div 
              onClick={() => setActiveTab('datasources')}
              className="p-4 rounded-2xl bg-emerald-900/60 border border-emerald-800 hover:border-emerald-500/50 hover:bg-emerald-900/90 transition-all cursor-pointer space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-800 text-indigo-200">
                  WDRA Warehouses
                </span>
                <span className="text-[10px] text-indigo-300 font-bold">210ms</span>
              </div>
              <h4 className="font-bold text-sm text-white">Cold Storage & Tariffs</h4>
              <p className="text-[11px] text-emerald-200 leading-relaxed">
                Weekly storage rents (₹35/Q/wk) and vacant capacity across 6,200+ accredited facilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Farmer Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
            Common Questions Answered Simply
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm text-stone-900 hover:text-emerald-800 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 text-stone-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. KISAN CALL CENTRE HELPLINE & BOTTOM CTA BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-emerald-800 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <PhoneCall className="w-5 h-5 text-amber-300" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                Free Toll-Free Farmer Support
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Need Help Finding Prices or Selling Produce?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
              Call the official Kisan Helpline at <strong>1800-180-1551</strong> (toll-free) or speak with our mandi coordinator network.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('prices')}
              className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-extrabold text-xs cursor-pointer shadow-sm transition-colors"
            >
              Check Prices Now
            </button>
            <button
              onClick={() => setActiveTab('add-produce')}
              className="px-5 py-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs cursor-pointer shadow-sm transition-colors"
            >
              List Harvest for Free
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
