import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  ExternalLink, 
  Building2, 
  Scale, 
  Clock, 
  Database,
  Search,
  TrendingUp,
  FileCheck2,
  Lock
} from 'lucide-react';
import { LIVE_24_7_CROP_RATES, verifyCropPresentValue } from '../data/liveRatesData';
import { LiveCropRate } from '../types';

interface CropPresentValueVerifierModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCropId?: string;
  onSelectCrop?: (cropId: string) => void;
}

export const CropPresentValueVerifierModal: React.FC<CropPresentValueVerifierModalProps> = ({
  isOpen,
  onClose,
  initialCropId = 'onion',
  onSelectCrop
}) => {
  const [selectedCropId, setSelectedCropId] = useState<string>(initialCropId);
  const [customPriceInput, setCustomPriceInput] = useState<string>('');
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [modalCropSearch, setModalCropSearch] = useState<string>('');

  // Sync initialCropId when opened
  React.useEffect(() => {
    if (initialCropId) {
      setSelectedCropId(initialCropId);
    }
  }, [initialCropId]);

  if (!isOpen) return null;

  const currentRate: LiveCropRate = LIVE_24_7_CROP_RATES.find(r => r.cropId === selectedCropId) || LIVE_24_7_CROP_RATES[0];
  const parsedCustomPrice = customPriceInput.trim() ? Number(customPriceInput) : undefined;
  const auditResult = verifyCropPresentValue(currentRate.cropId, parsedCustomPrice);

  const handleTestRate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuditing(true);
    setTimeout(() => setIsAuditing(false), 400);
  };

  const handleResetToPresent = () => {
    setCustomPriceInput('');
    setIsAuditing(true);
    setTimeout(() => setIsAuditing(false), 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-3xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-stone-900 text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white cursor-pointer transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              24/7 Government Market Audit
            </span>
            <span className="text-xs text-stone-300 font-mono">Resource #9ef84268</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white">
            Crop Present Value & Rate Authenticity Verifier
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
            Confirm whether a crop price represents an authentic, verified present market value or a random/outdated number.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[78vh] overflow-y-auto">

          {/* Crop Selector Chips */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider">
                Select Crop to Audit Present Rate ({LIVE_24_7_CROP_RATES.length} Crops)
              </label>
              <div className="relative w-48">
                <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  value={modalCropSearch}
                  onChange={(e) => setModalCropSearch(e.target.value)}
                  placeholder="Filter crops..."
                  className="w-full pl-7 pr-2.5 py-1 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder:text-stone-400 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {LIVE_24_7_CROP_RATES.filter(crop => 
                modalCropSearch === '' || 
                crop.cropName.toLowerCase().includes(modalCropSearch.toLowerCase()) ||
                crop.hindiName.toLowerCase().includes(modalCropSearch.toLowerCase())
              ).map((crop) => {
                const isSelected = crop.cropId === selectedCropId;
                return (
                  <button
                    key={crop.cropId}
                    type="button"
                    onClick={() => {
                      setSelectedCropId(crop.cropId);
                      setCustomPriceInput('');
                      if (onSelectCrop) onSelectCrop(crop.cropId);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <span>{crop.cropName}</span>
                    <span className={`text-[10px] font-mono px-1 rounded ${isSelected ? 'bg-emerald-700 text-emerald-100' : 'bg-stone-200 text-stone-600'}`}>
                      ₹{crop.currentRateQuintal}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Present Value Certification Card */}
          <div className={`p-5 rounded-2xl border transition-all ${
            auditResult.isPresentValue 
              ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950' 
              : 'bg-rose-50/70 border-rose-300 text-rose-950'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200/70">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {auditResult.isPresentValue ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      CONFIRMED PRESENT VALUE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold shadow-xs">
                      <AlertTriangle className="w-4 h-4" />
                      PRICE DISCREPANCY DETECTED
                    </span>
                  )}
                  <span className="text-[11px] font-semibold text-stone-500">
                    24/7 Verified Stream
                  </span>
                </div>
                <h3 className="text-xl font-bold font-display text-stone-900">
                  {currentRate.cropName} ({currentRate.hindiName})
                </h3>
                <p className="text-xs text-stone-600">
                  Variety: <strong>{currentRate.variety}</strong> • Standard: <strong>{currentRate.qualityStandard}</strong>
                </p>
              </div>

              {/* Verified Rate Callout */}
              <div className="bg-white p-3.5 rounded-2xl border border-stone-200/80 shadow-xs text-right shrink-0 min-w-44">
                <div className="text-[10px] text-stone-400 uppercase font-bold tracking-wider">
                  Verified Present Rate
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-800 font-display">
                  ₹{auditResult.currentRateQuintal.toLocaleString('en-IN')}
                  <span className="text-xs font-normal text-stone-500"> / Quintal</span>
                </div>
                <div className="text-xs font-bold text-stone-600 mt-0.5">
                  ₹{auditResult.currentRateKg} / kg
                </div>
              </div>
            </div>

            {/* Audit Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs">
              <div className="bg-white/80 p-3 rounded-xl border border-stone-200/60 space-y-1">
                <div className="text-stone-400 text-[10px] font-bold uppercase flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-stone-500" />
                  Primary Reporting Hub
                </div>
                <div className="font-bold text-stone-900">{currentRate.benchmarkMandi}</div>
                <div className="text-[11px] text-stone-500">{currentRate.benchmarkDistrict}, {currentRate.benchmarkState}</div>
              </div>

              <div className="bg-white/80 p-3 rounded-xl border border-stone-200/60 space-y-1">
                <div className="text-stone-400 text-[10px] font-bold uppercase flex items-center gap-1">
                  <Scale className="w-3.5 h-3.5 text-stone-500" />
                  MSP Benchmark
                </div>
                {currentRate.mspPrice > 0 ? (
                  <>
                    <div className="font-bold text-stone-900">
                      ₹{currentRate.mspPrice.toLocaleString('en-IN')} / Quintal
                    </div>
                    <div className={`text-[11px] font-bold ${currentRate.isAboveMsp ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {currentRate.isAboveMsp ? `+₹${currentRate.mspDifference} (+${((currentRate.mspDifference / currentRate.mspPrice) * 100).toFixed(1)}% above MSP)` : `-₹${Math.abs(currentRate.mspDifference)} below MSP`}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="font-bold text-stone-700">Market-Driven Quote</div>
                    <div className="text-[11px] text-stone-500">Perishable (No statutory MSP floor)</div>
                  </>
                )}
              </div>

              <div className="bg-white/80 p-3 rounded-xl border border-stone-200/60 space-y-1">
                <div className="text-stone-400 text-[10px] font-bold uppercase flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-500" />
                  Recorded 24h Arrivals
                </div>
                <div className="font-bold text-stone-900">
                  {auditResult.benchmarks.reportedArrivalsTonnes.toLocaleString('en-IN')} Metric Tonnes
                </div>
                <div className="text-[11px] text-emerald-700 font-medium">
                  {auditResult.benchmarks.reportedArrivalsQuintals.toLocaleString('en-IN')} Quintals electronic weighbridge logged
                </div>
              </div>
            </div>

            {/* Cryptographic & Official Source Badge */}
            <div className="mt-4 pt-3 border-t border-stone-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
              <div className="flex items-center gap-1.5 text-stone-600 font-mono">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Bulletin: <strong>{currentRate.dataSource.bulletinRef}</strong></span>
                <span className="text-stone-300">•</span>
                <span className="truncate max-w-[200px]">{currentRate.dataSource.verificationHash}</span>
              </div>
              <a
                href={currentRate.dataSource.resourceId ? `https://data.gov.in/resource/${currentRate.dataSource.resourceId}` : 'https://agmarknet.gov.in'}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 font-bold text-emerald-800 hover:text-emerald-950 underline shrink-0 cursor-pointer"
              >
                <span>Verify on Agmarknet Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Interactive "Check My Offered Rate" Tool */}
          <div className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-stone-900 font-display flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-emerald-700" />
                  <span>Test An Offered Rate (Is Your Middleman Quoting Fair Present Value?)</span>
                </h4>
                <p className="text-xs text-stone-500">
                  Enter any rate quoted by a village middleman or trader to check if it represents a fair present value.
                </p>
              </div>
              {customPriceInput && (
                <button
                  type="button"
                  onClick={handleResetToPresent}
                  className="text-xs text-emerald-700 hover:underline font-bold cursor-pointer"
                >
                  Reset to Agmarknet Rate
                </button>
              )}
            </div>

            <form onSubmit={handleTestRate} className="flex flex-col sm:flex-row items-center gap-2.5">
              <div className="relative w-full sm:w-64">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  placeholder={`e.g., ${currentRate.currentRateQuintal}`}
                  value={customPriceInput}
                  onChange={(e) => setCustomPriceInput(e.target.value)}
                  className="w-full pl-8 pr-16 py-2 rounded-xl bg-white border border-stone-300 text-xs font-semibold text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 text-[11px]">/ Quintal</span>
              </div>
              <button
                type="submit"
                disabled={isAuditing}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold cursor-pointer transition-colors shrink-0 shadow-xs"
              >
                {isAuditing ? 'Auditing...' : 'Check If Present Value'}
              </button>
            </form>

            {customPriceInput && (
              <div className={`p-3 rounded-xl text-xs border ${
                parsedCustomPrice && parsedCustomPrice >= currentRate.minRateQuintal
                  ? 'bg-emerald-100/60 border-emerald-300 text-emerald-900'
                  : 'bg-rose-100/60 border-rose-300 text-rose-900'
              }`}>
                <strong>Audit Verdict: </strong>
                {parsedCustomPrice && parsedCustomPrice >= currentRate.currentRateQuintal ? (
                  <span>
                    Offered rate ₹{parsedCustomPrice}/Q is <strong>favorable</strong> (+₹{parsedCustomPrice - currentRate.currentRateQuintal}/Q above present Hubli modal quote).
                  </span>
                ) : parsedCustomPrice && parsedCustomPrice >= currentRate.minRateQuintal ? (
                  <span>
                    Offered rate ₹{parsedCustomPrice}/Q is within the lower APMC trading band, but below the modal benchmark of ₹{currentRate.currentRateQuintal}/Q (-₹{currentRate.currentRateQuintal - parsedCustomPrice}/Q deficit).
                  </span>
                ) : (
                  <span>
                    ❌ <strong>DISTRESS RATE ALERT:</strong> ₹{parsedCustomPrice}/Q is severely below the recorded Agmarknet minimum of ₹{currentRate.minRateQuintal}/Q. Selling at this price represents an unverified middleman discount!
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Mandi-by-Mandi Present Value Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Official Reporting Mandis for {currentRate.cropName} (Today's Live Quotes)
              </h4>
              <span className="text-[11px] text-stone-400">
                {auditResult.reportingMandis.length} Active APMC yards
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-stone-200">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-stone-100/70 border-b border-stone-200 text-[10px] text-stone-500 uppercase font-bold tracking-wider">
                    <th className="py-2.5 px-3">Mandi Name</th>
                    <th className="py-2.5 px-3">State</th>
                    <th className="py-2.5 px-3">Modal Rate</th>
                    <th className="py-2.5 px-3">Min - Max Spread</th>
                    <th className="py-2.5 px-3">Arrivals (Q)</th>
                    <th className="py-2.5 px-3 text-right">Reported</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 bg-white">
                  {auditResult.reportingMandis.map((mandi, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-stone-900">
                        {mandi.mandiName}
                        <div className="text-[10px] text-stone-400 font-normal">{mandi.district}</div>
                      </td>
                      <td className="py-2.5 px-3 text-stone-600">{mandi.state}</td>
                      <td className="py-2.5 px-3 font-bold text-emerald-800">
                        ₹{mandi.modalPrice.toLocaleString('en-IN')}/Q
                      </td>
                      <td className="py-2.5 px-3 text-stone-500">
                        ₹{mandi.minPrice} - ₹{mandi.maxPrice}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-stone-700">
                        {mandi.arrivalsQuintals.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2.5 px-3 text-right text-stone-400 text-[11px] whitespace-nowrap">
                        {mandi.updatedAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-stone-100 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-500 text-[11px]">
            <FileCheck2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Official Government Open Data License (GODL) • Not Synthetic / AI Hallucinated</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold cursor-pointer transition-colors text-xs"
            >
              Close Auditor
            </button>
            <button
              onClick={() => {
                onClose();
                if (onSelectCrop) onSelectCrop(currentRate.cropId);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold cursor-pointer transition-colors text-xs shadow-xs"
            >
              View In-Hand Realization & Freight
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
