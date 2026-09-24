import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  Activity, 
  ChevronRight, 
  Search,
  Scale,
  MapPin,
  Building2
} from 'lucide-react';
import { LIVE_24_7_CROP_RATES } from '../data/liveRatesData';
import { useApp } from '../context/AppContext';
import { CropPresentValueVerifierModal } from './CropPresentValueVerifierModal';
import { AllIndiaCropSellPlacesFinder } from './AllIndiaCropSellPlacesFinder';

export const LiveCropRateTicker: React.FC = () => {
  const { selectedCropId, setSelectedCropId, setActiveTab } = useApp();
  const [isVerifierOpen, setIsVerifierOpen] = useState(false);
  const [isPlacesFinderOpen, setIsPlacesFinderOpen] = useState(false);
  const [auditCropId, setAuditCropId] = useState('onion');

  const handleOpenVerifier = (cropId: string) => {
    setAuditCropId(cropId);
    setIsVerifierOpen(true);
  };

  return (
    <>
      <div className="bg-stone-900 text-stone-100 border-b border-stone-800 shadow-sm relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
            
            {/* Left Status Badge */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[11px] font-bold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="tracking-wide uppercase">24/7 Live Rates</span>
              </div>
              <span className="text-[11px] text-stone-400 hidden sm:inline">
                Verified Present Values • Agmarknet & e-NAM Stream
              </span>
            </div>

            {/* Horizontal Ticker Chips */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none flex-1 max-w-full">
              {LIVE_24_7_CROP_RATES.map((crop) => {
                const isSelected = crop.cropId === selectedCropId;
                const isUp = crop.trend === 'up';

                return (
                  <div
                    key={crop.cropId}
                    onClick={() => {
                      setSelectedCropId(crop.cropId);
                    }}
                    className={`flex items-center gap-2 px-3 py-1 rounded-xl text-xs whitespace-nowrap cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-emerald-950/90 border-emerald-500 text-white shadow-xs'
                        : 'bg-stone-800/80 border-stone-700/80 text-stone-300 hover:bg-stone-800 hover:text-white'
                    }`}
                    title={`Click to analyze ${crop.cropName} in Price Discovery`}
                  >
                    <span className="font-bold">{crop.cropName.split('(')[0].trim()}</span>
                    
                    {/* Rate */}
                    <div className="flex items-baseline gap-1">
                      <span className="font-black text-amber-400 font-display">
                        ₹{crop.currentRateQuintal.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-stone-400 font-normal">/Q</span>
                    </div>

                    {/* 24h change */}
                    <span className={`text-[10px] flex items-center font-bold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {isUp ? (
                        <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-0.5 inline" />
                      )}
                      {isUp ? '+' : ''}{crop.change24hAmount}
                    </span>

                    {/* Quick Audit Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenVerifier(crop.cropId);
                      }}
                      className="ml-1 p-0.5 rounded text-stone-400 hover:text-emerald-300 hover:bg-stone-700/60 cursor-pointer"
                      title={`Verify ${crop.cropName} present value against Agmarknet`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Right Action: Full Audit Tool Trigger & District/Taluk Search */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setIsPlacesFinderOpen(true)}
                className="px-2.5 py-1 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 hover:border-emerald-500/80 font-bold text-[11px] flex items-center gap-1.5 shadow-xs cursor-pointer transition-all hover:text-white"
                title="Search All-India Crop Sell Places by District & Taluk"
              >
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">District & Taluk</span>
                <span>Mandis</span>
              </button>

              <button
                onClick={() => handleOpenVerifier(selectedCropId || 'onion')}
                className="px-3 py-1 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-[11px] flex items-center gap-1.5 shadow-xs cursor-pointer transition-all hover:scale-102"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                <span>Verify Rate</span>
              </button>
              
              <button
                onClick={() => setActiveTab('prices')}
                className="text-[11px] text-stone-400 hover:text-white flex items-center gap-0.5 cursor-pointer hidden lg:flex"
              >
                <span>Arbitrage</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

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
    </>
  );
};
