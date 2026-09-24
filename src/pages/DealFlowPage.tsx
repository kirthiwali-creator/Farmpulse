import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  Lock,
  Presentation
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import { Deal } from '../types';

export const DealFlowPage: React.FC = () => {
  const { deals, updateDealStatus, farmerProfile, setActiveTab } = useApp();
  const [selectedDealId, setSelectedDealId] = useState<string>(deals[0]?.id || '');

  const activeDeal = deals.find(d => d.id === selectedDealId) || deals[0];

  const stages: { key: Deal['status']; label: string; desc: string }[] = [
    { key: 'Offer Sent', label: 'Offer Sent', desc: 'Terms proposed' },
    { key: 'Accepted', label: 'Contract Signed & Escrow Locked', desc: '100% money in bank escrow' },
    { key: 'Dispatched', label: 'Logistics Dispatched', desc: 'Truck en route to buyer' },
    { key: 'Inspected', label: 'Weighbridge & Quality Pass', desc: 'Weight verified at scale' },
    { key: 'Completed', label: 'Instant DBT Payout Settled', desc: 'Direct credit to SBI account' }
  ];

  const getStageIndex = (status: Deal['status']) => {
    switch (status) {
      case 'Draft': return 0;
      case 'Offer Sent': return 0;
      case 'Accepted': return 1;
      case 'Dispatched': return 2;
      case 'Inspected': return 3;
      case 'Completed': return 4;
      default: return 1;
    }
  };

  const handleAdvanceStatus = () => {
    if (!activeDeal) return;
    const currentIdx = getStageIndex(activeDeal.status);
    const nextStages: Deal['status'][] = ['Accepted', 'Dispatched', 'Inspected', 'Completed'];
    const nextStatus = nextStages[currentIdx];
    if (nextStatus) {
      updateDealStatus(activeDeal.id, nextStatus);
      if (nextStatus === 'Completed') {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Digital Escrow & Transparent Smart Contracts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
            Direct Deals & Escrow Settlement Simulator
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Paperless agreements protecting the farmer against payment defaults with instant bank transfer upon weighing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('presentation')}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-semibold text-xs border border-stone-300 shadow-xs flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Presentation className="w-4 h-4 text-amber-500" />
            <span>SIH PPT Deck</span>
          </button>
        </div>
      </div>

      {deals.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
          <FileText className="w-12 h-12 text-stone-300 mx-auto" />
          <h3 className="text-base font-bold text-stone-800">No active contracts yet</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Initiate a direct purchase deal with verified buyers like Sahyadri FPO or ITC in the Marketplace tab.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: List of Agreements */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-stone-500 uppercase tracking-wider px-1">
              Active Agreements ({deals.length})
            </div>
            {deals.map((deal) => {
              const isSelected = deal.id === activeDeal?.id;
              return (
                <div
                  key={deal.id}
                  onClick={() => setSelectedDealId(deal.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-500 shadow-sm ring-1 ring-emerald-500'
                      : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-stone-500">{deal.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      deal.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {deal.status}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">{deal.buyerName}</h4>
                    <p className="text-[11px] text-stone-500">
                      {deal.quantityQuintals} Quintals • {deal.cropName}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-stone-200/60 text-xs">
                    <span className="text-stone-500">Settlement:</span>
                    <span className="font-extrabold text-emerald-800">₹{deal.totalDealValue.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right 2 Columns: Milestone Tracker & Agreement */}
          {activeDeal && (
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-stone-400">{activeDeal.id}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {activeDeal.status}
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-stone-900 font-display mt-0.5">
                      {activeDeal.cropName} with {activeDeal.buyerName}
                    </h2>
                  </div>
                  {activeDeal.status !== 'Completed' && (
                    <button
                      onClick={handleAdvanceStatus}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition-all hover:scale-102"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Simulate Next Step & Payout</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Progress Steps */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                    Milestone Progress
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                    {stages.map((stage, idx) => {
                      const currentIdx = getStageIndex(activeDeal.status);
                      const isPast = idx < currentIdx;
                      const isCurrent = idx === currentIdx;
                      return (
                        <div
                          key={stage.key}
                          className={`p-3 rounded-xl border text-center space-y-1 transition-all ${
                            isPast
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                              : isCurrent
                              ? 'bg-amber-50 border-amber-400 text-amber-950 ring-1 ring-amber-400'
                              : 'bg-stone-50 border-stone-200 text-stone-400'
                          }`}
                        >
                          <div className="flex items-center justify-center">
                            {isPast ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : isCurrent ? (
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-stone-300" />
                            )}
                          </div>
                          <div className="text-[11px] font-bold leading-tight line-clamp-2">
                            {stage.label}
                          </div>
                          <div className="text-[9px] text-stone-500">{stage.desc}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Agreement Details Box */}
                <div className="bg-stone-50/80 rounded-2xl p-5 border border-stone-200 space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <div className="font-bold text-stone-900 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Cryptographic Trade Agreement Proof</span>
                    </div>
                    <span className="font-mono text-[10px] text-stone-400 truncate max-w-xs">
                      Contract Hash: {activeDeal.contractHash}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <span className="text-stone-400 text-[10px] uppercase font-bold block">Seller (Farmer)</span>
                      <strong className="text-stone-900">{farmerProfile.name}</strong>
                      <div className="text-[10px] text-stone-500">{farmerProfile.location}</div>
                    </div>
                    <div>
                      <span className="text-stone-400 text-[10px] uppercase font-bold block">Buyer Entity</span>
                      <strong className="text-stone-900">{activeDeal.buyerName}</strong>
                      <div className="text-[10px] text-stone-500">Verified FPO / Corporates</div>
                    </div>
                    <div>
                      <span className="text-stone-400 text-[10px] uppercase font-bold block">Transport Terms</span>
                      <strong className="text-stone-900">{activeDeal.freightBearer} Bearer</strong>
                      <div className="text-[10px] text-stone-500">Pickup on {activeDeal.pickupDate}</div>
                    </div>
                    <div>
                      <span className="text-stone-400 text-[10px] uppercase font-bold block">Payment Security</span>
                      <strong className="text-emerald-700">{activeDeal.paymentTerms}</strong>
                      <div className="text-[10px] text-stone-500">Direct KCC Bank Credit</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-200 space-y-1.5">
                    <div className="flex justify-between text-stone-600">
                      <span>Produce Value ({activeDeal.quantityQuintals} Q @ ₹{activeDeal.agreedPricePerQuintal}/Q):</span>
                      <span className="font-semibold text-stone-900">₹{activeDeal.totalDealValue.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-emerald-700">
                      <span>Broker Commission Deducted:</span>
                      <span className="font-bold">₹0 (100% Direct to Farmer)</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-stone-200 text-sm font-extrabold text-stone-900">
                      <span className="text-emerald-900">Net Farmer Payout:</span>
                      <span className="text-base text-emerald-700 font-display">₹{activeDeal.totalDealValue.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                  <div>
                    <strong className="block">Legal Enforceability & Model APMC Direct Contract:</strong>
                    <p className="text-[11px] text-stone-600 mt-0.5">
                      This smart contract guarantees that buyer funds are deposited before pickup. Funds credit directly to the farmer SBI Kisan Credit Card account with SMS confirmation in regional language.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
