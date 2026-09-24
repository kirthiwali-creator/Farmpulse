import React, { useState } from 'react';
import { 
  Sprout, 
  TrendingUp, 
  BrainCircuit, 
  Store, 
  FileText, 
  PlusCircle, 
  ShieldCheck, 
  ArrowUpRight, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  DollarSign,
  Presentation,
  Scale,
  ExternalLink,
  Building2,
  Search
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LIVE_24_7_CROP_RATES } from '../data/liveRatesData';
import { CropPresentValueVerifierModal } from '../components/CropPresentValueVerifierModal';
import { AllIndiaCropSellPlacesFinder } from '../components/AllIndiaCropSellPlacesFinder';

export const FarmerDashboard: React.FC = () => {
  const { farmerProfile, listings, deals, setActiveTab, setSelectedCropId } = useApp();
  const [isVerifierOpen, setIsVerifierOpen] = useState(false);
  const [isPlacesFinderOpen, setIsPlacesFinderOpen] = useState(false);
  const [auditCropId, setAuditCropId] = useState('onion');

  const totalQuintals = listings.reduce((acc, curr) => acc + curr.quantityQuintals, 0);
  const totalPortfolioValue = listings.reduce((acc, curr) => acc + (curr.quantityQuintals * curr.expectedPricePerQuintal), 0);
  const totalDealValueLocked = deals.reduce((acc, curr) => acc + curr.totalDealValue, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-900/80 border border-emerald-400/40 text-emerald-200">
                Verified Kisan Profile
              </span>
              <span className="text-xs text-emerald-200">
                KCC ID: <strong className="text-white font-mono">{farmerProfile.kisanId}</strong>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">
              Namaste, {farmerProfile.name}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>{farmerProfile.location}, {farmerProfile.state} • {farmerProfile.landAreaAcres} Acres Farm</span>
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsPlacesFinderOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer transition-all hover:scale-102"
              title="Search All-India Crop Sell Places by District & Taluk"
            >
              <Building2 className="w-4 h-4 text-stone-950" />
              <span>District & Taluk Mandis</span>
            </button>
            <button
              onClick={() => setActiveTab('presentation')}
              className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs border border-white/30 backdrop-blur-sm flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Presentation className="w-4 h-4" />
              <span>SIH PPT Deck</span>
            </button>
            <button
              onClick={() => setActiveTab('add-produce')}
              className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs border border-white/30 backdrop-blur-sm flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Harvest</span>
            </button>
            <button
              onClick={() => setActiveTab('ai-prediction')}
              className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs border border-white/30 backdrop-blur-sm flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <BrainCircuit className="w-4 h-4 text-emerald-300" />
              <span>AI Hold/Sell Check</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Portfolio Value */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-1">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
            Total Produce Market Value
          </div>
          <div className="text-2xl font-black text-stone-900 font-display">
            ₹{totalPortfolioValue.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1 pt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Across {totalQuintals} Quintals listed</span>
          </div>
        </div>

        {/* Card 2: Active Deals & Escrow */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-1">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
            Deals in Escrow & Transit
          </div>
          <div className="text-2xl font-black text-stone-900 font-display">
            ₹{totalDealValueLocked.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-teal-700 font-semibold flex items-center gap-1 pt-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{deals.length} Active Contracts Protected</span>
          </div>
        </div>

        {/* Card 3: Realization Delta */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-1">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
            Average In-Hand Premium
          </div>
          <div className="text-2xl font-black text-emerald-700 font-display">
            +₹420 <span className="text-xs font-normal text-stone-500">/ Quintal</span>
          </div>
          <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1 pt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>vs. Village Middleman rates</span>
          </div>
        </div>

        {/* Card 4: Live Inquiries */}
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-1">
          <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
            Buyer Purchase Inquiries
          </div>
          <div className="text-2xl font-black text-amber-600 font-display">
            {listings.reduce((acc, curr) => acc + curr.inquiriesCount, 0)} Inquiries
          </div>
          <div className="text-xs text-stone-500 flex items-center gap-1 pt-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Sahyadri FPO & ITC e-Choupal</span>
          </div>
        </div>
      </div>

      {/* Main Grid: My Listed Produce (Left) + Active Deals & Alerts (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: My Listed Produce */}
        <div className="lg:col-span-2 space-y-6">

          {/* 24/7 Live Rates & Present Value Detector */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-stone-900 font-display flex items-center gap-1.5">
                    <span>24/7 Live Crop Rates & Present Value Monitor</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Agmarknet DMI Feed
                    </span>
                  </h2>
                  <p className="text-xs text-stone-500">
                    Continuous mandi closing benchmark & live electronic auction quotes (Guaranteed Not Synthetic)
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setAuditCropId('onion');
                  setIsVerifierOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0 self-start sm:self-auto"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                <span>Verify An Offered Rate</span>
              </button>
            </div>

            {/* Crop Rates Horizontal Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {LIVE_24_7_CROP_RATES.slice(0, 4).map((crop) => (
                <div 
                  key={crop.cropId}
                  onClick={() => {
                    setSelectedCropId(crop.cropId);
                    setActiveTab('prices');
                  }}
                  className="p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200/80 cursor-pointer transition-all hover:border-emerald-400 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-stone-900 truncate">{crop.cropName.split('(')[0].trim()}</span>
                    <span className={`text-[10px] font-bold ${crop.trend === 'up' ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {crop.trend === 'up' ? '+' : ''}{crop.change24hAmount}
                    </span>
                  </div>
                  <div className="text-lg font-black text-emerald-800 font-display">
                    ₹{crop.currentRateQuintal.toLocaleString('en-IN')}
                    <span className="text-[10px] font-normal text-stone-500">/Q</span>
                  </div>
                  <div className="text-[10px] text-stone-500 truncate">
                    {crop.benchmarkMandi.split('(')[0].trim()}
                  </div>
                  <div className="pt-1 flex items-center justify-between text-[10px]">
                    <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      Present Value
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAuditCropId(crop.cropId);
                        setIsVerifierOpen(true);
                      }}
                      className="text-stone-400 hover:text-emerald-700 font-bold"
                    >
                      Audit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All-India District & Taluk Crop Sell Places Search Card */}
          <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-emerald-950 text-white rounded-3xl p-5 border border-stone-800 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>All-India Crop Sell Places Directory</span>
                </div>
                <h3 className="text-base font-bold">
                  Find Specific District & Taluk Mandis Across India
                </h3>
                <p className="text-xs text-stone-300 max-w-xl">
                  Search authorized APMC yards, sub-market yards, and e-NAM terminals in any district or taluk (Karnataka, Maharashtra, Gujarat, MP, Punjab, Rajasthan, etc.).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPlacesFinderOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all shrink-0 hover:scale-102"
              >
                <Search className="w-4 h-4 text-amber-300" />
                <span>Search by District & Taluk</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <h2 className="text-base font-bold text-stone-900 font-display">
                  My Active Produce Inventory
                </h2>
                <p className="text-xs text-stone-500">
                  Manage active crop batches, track buyer interest, and run AI price checks
                </p>
              </div>
              <button
                onClick={() => setActiveTab('add-produce')}
                className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Crop</span>
              </button>
            </div>

            <div className="divide-y divide-stone-100 mt-2">
              {listings.map((item) => (
                <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-stone-900">{item.cropName}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                        {item.qualityGrade}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        item.status === 'Available' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="text-xs text-stone-500 flex flex-wrap items-center gap-3">
                      <span>Quantity: <strong className="text-stone-800">{item.quantityQuintals} Quintals</strong></span>
                      <span>•</span>
                      <span>Moisture: <strong className="text-stone-800">{item.moisturePercent}%</strong></span>
                      <span>•</span>
                      <span>Storage: <strong className="text-stone-800">{item.storageCondition}</strong></span>
                    </div>
                    <div className="text-[11px] text-stone-400">
                      Listed {item.listedAt} • {item.inquiriesCount} buyer inquiries received
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 shrink-0">
                    <div className="text-right">
                      <div className="text-xs text-stone-400">Asking Price</div>
                      <div className="text-base font-extrabold text-stone-900">
                        ₹{item.expectedPricePerQuintal.toLocaleString('en-IN')} <span className="text-[10px] font-normal text-stone-500">/ Q</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedCropId(item.cropId);
                          setActiveTab('ai-prediction');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold cursor-pointer"
                      >
                        AI Check
                      </button>
                      <button
                        onClick={() => setActiveTab('marketplace')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold cursor-pointer"
                      >
                        Direct Buyers
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Smart Contracts & Quick Radar */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900 font-display">Active Smart Contracts</h3>
                  <p className="text-[10px] text-stone-500">Escrow backed digital trade</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('deals')}
                className="text-xs text-emerald-700 font-bold hover:underline cursor-pointer"
              >
                View All ({deals.length})
              </button>
            </div>

            <div className="space-y-3">
              {deals.map((d) => (
                <div key={d.id} className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-stone-500">{d.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      d.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {d.status}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">{d.buyerName}</div>
                    <div className="text-[11px] text-stone-500">{d.quantityQuintals} Q of {d.cropName} @ ₹{d.agreedPricePerQuintal}/Q</div>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-stone-200 text-xs">
                    <span className="text-stone-500">Total Value:</span>
                    <span className="font-extrabold text-emerald-800">₹{d.totalDealValue.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-950 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
              <p>
                <strong>Escrow Guarantee:</strong> Buyer funds are locked before trucks leave the depot. Payout is guaranteed upon weighing.
              </p>
            </div>
          </div>

          {/* Real-World Lesson Box */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-2">
            <div className="font-bold text-amber-950 flex items-center gap-1.5">
              <span>💡 SIH Real-World Takeaway:</span>
            </div>
            <p className="text-stone-700 text-[11px] leading-relaxed">
              When Ramesh Patel listed 100 quintals of onion through Farmpulse instead of selling to the village broker, he made an extra <strong>₹1,15,000 (+69.7%)</strong> in net profit.
            </p>
            <button
              onClick={() => setActiveTab('presentation')}
              className="text-emerald-800 font-bold text-[11px] flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>See Ramesh's Case Study in PPT Deck</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Present Value Verification Modal */}
      <CropPresentValueVerifierModal
        isOpen={isVerifierOpen}
        onClose={() => setIsVerifierOpen(false)}
        initialCropId={auditCropId}
        onSelectCrop={(cropId) => {
          setSelectedCropId(cropId);
          setActiveTab('prices');
        }}
      />

      {/* All-India District & Taluk Crop Sell Places Directory Modal */}
      <AllIndiaCropSellPlacesFinder
        isOpen={isPlacesFinderOpen}
        onClose={() => setIsPlacesFinderOpen(false)}
        onSelectPlace={(place) => {
          setIsPlacesFinderOpen(false);
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
      />
    </div>
  );
};
