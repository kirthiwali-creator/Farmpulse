import React, { useState } from 'react';
import { 
  Store, 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  CheckCircle2, 
  Plus, 
  Building2, 
  ChevronRight, 
  User,
  Presentation
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { VERIFIED_BUYERS } from '../data/mockData';
import { Buyer } from '../types';

export const MarketplacePage: React.FC = () => {
  const { setActiveTab, listings, createDeal } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuyerType, setSelectedBuyerType] = useState('All');
  const [maxDistance, setMaxDistance] = useState<number>(600);

  // Negotiation Modal State
  const [negotiatingBuyer, setNegotiatingBuyer] = useState<Buyer | null>(null);
  const [selectedListingId, setSelectedListingId] = useState(listings[0]?.id || '');
  const [negotiatedPrice, setNegotiatedPrice] = useState<number>(2800);
  const [dealQuantity, setDealQuantity] = useState<number>(50);
  const [freightPayer, setFreightPayer] = useState<'Buyer' | 'Farmer' | 'Shared 50-50'>('Buyer');
  const [escrowTerms, setEscrowTerms] = useState<'100% Escrow on Dispatch' | '50% Advance, 50% on Delivery' | 'Instant DBT on Weighbridge'>('100% Escrow on Dispatch');

  const filteredBuyers = VERIFIED_BUYERS.filter((b) => {
    const matchesType = selectedBuyerType === 'All' || b.type === selectedBuyerType;
    const matchesDistance = b.distanceKm <= maxDistance;
    const matchesSearch = searchQuery === '' || 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      b.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.activelyBuyingCrops.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesDistance && matchesSearch;
  });

  const handleOpenNegotiation = (buyer: Buyer) => {
    setNegotiatingBuyer(buyer);
    if (listings.length > 0) {
      setSelectedListingId(listings[0].id);
      setNegotiatedPrice(listings[0].expectedPricePerQuintal);
      setDealQuantity(Math.min(50, listings[0].quantityQuintals));
    }
  };

  const handleConfirmDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!negotiatingBuyer) return;

    const chosenListing = listings.find(l => l.id === selectedListingId) || listings[0];
    const totalVal = dealQuantity * negotiatedPrice;

    createDeal({
      listingId: chosenListing?.id || 'list-101',
      buyerId: negotiatingBuyer.id,
      buyerName: negotiatingBuyer.name,
      cropName: chosenListing?.cropName || 'Red Onion (Garva)',
      quantityQuintals: dealQuantity,
      agreedPricePerQuintal: negotiatedPrice,
      totalDealValue: totalVal,
      freightBearer: freightPayer,
      paymentTerms: escrowTerms,
      status: 'Accepted',
      pickupDate: '2026-09-18',
    });

    setNegotiatingBuyer(null);
    setActiveTab('deals');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900 text-xs font-semibold mb-2">
            <Building2 className="w-3.5 h-3.5 text-teal-700" />
            <span>Direct Buyer Marketplace (Zero Broker Fee)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
            Connect with Verified FPOs & Institutional Buyers
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Bypass local middlemen. Sell directly to verified Farmer Producer Companies, food processors, and retail chains with farm-gate pickup.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('add-produce')}
            className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer transition-all hover:scale-102"
          >
            <Plus className="w-4 h-4" />
            <span>List Harvest</span>
          </button>
          <button
            onClick={() => setActiveTab('presentation')}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 font-semibold text-xs border border-stone-300 shadow-xs flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Presentation className="w-4 h-4 text-amber-500" />
            <span>SIH PPT Deck</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-stone-50 rounded-xl border border-stone-200">
            <Search className="w-4 h-4 text-stone-400 shrink-0" />
            <input
              type="text"
              placeholder="Search buyer, location, or crop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-transparent border-none outline-none text-stone-800 placeholder-stone-400"
            />
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-stone-50 rounded-xl border border-stone-200">
            <Filter className="w-4 h-4 text-stone-400 shrink-0" />
            <select
              value={selectedBuyerType}
              onChange={(e) => setSelectedBuyerType(e.target.value)}
              className="w-full text-xs bg-transparent border-none outline-none text-stone-800 font-medium cursor-pointer"
            >
              <option value="All">All Buyer Categories</option>
              <option value="FPO / Cooperative">FPOs & Cooperatives</option>
              <option value="Institutional Buyer">Institutional Aggregators (ITC)</option>
              <option value="Retail Aggregator">Retail Chains (BigBasket)</option>
              <option value="Food Processor / Mill">Food Processors (Godrej)</option>
            </select>
          </div>

          <div className="flex items-center justify-between gap-2 px-3 py-1.5 bg-stone-50 rounded-xl border border-stone-200 text-xs">
            <div className="flex items-center gap-1.5 text-stone-600">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>Max Distance:</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="25"
                max="1000"
                step="25"
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-24 accent-emerald-600 cursor-pointer"
              />
              <span className="font-bold text-stone-900 min-w-14 text-right">{maxDistance} km</span>
            </div>
          </div>
        </div>
      </div>

      {/* Buyer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredBuyers.map((buyer) => (
          <div
            key={buyer.id}
            className="bg-white rounded-2xl border border-stone-200 hover:border-emerald-300 hover:shadow-md p-5 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-stone-900 font-display">
                      {buyer.name}
                    </h3>
                    {buyer.verifiedBuyer && (
                      <span title="Verified Institutional Buyer">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                    <span className="bg-stone-100 px-2 py-0.5 rounded text-[10px] font-semibold text-stone-700">
                      {buyer.type}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      {buyer.location} ({buyer.distanceKm} km away)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg text-amber-900 text-xs font-bold shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{buyer.rating}</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1.5">
                  Actively Purchasing Crops
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {buyer.activelyBuyingCrops.map((crop, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-900 border border-emerald-200/80"
                    >
                      {crop}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/80 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-500">Buying Price Range:</span>
                  <span className="font-extrabold text-emerald-800">{buyer.offeredPriceRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Procurement Target:</span>
                  <span className="font-semibold text-stone-800">{buyer.buyingCapacityQuintals.toLocaleString('en-IN')} Quintals</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Track Record:</span>
                  <span className="text-stone-700">{buyer.dealsCompleted} completed farmer deals</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-3">
              <div className="text-[11px] text-stone-500 flex items-center gap-1">
                <User className="w-3 h-3 text-stone-400" />
                <span>Contact: {buyer.contactPerson}</span>
              </div>
              <button
                onClick={() => handleOpenNegotiation(buyer)}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1 cursor-pointer transition-all hover:scale-102"
              >
                <span>Initiate Direct Deal</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Negotiation Modal */}
      {negotiatingBuyer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 max-w-xl w-full p-6 space-y-5 relative my-8">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  Direct Sale Contract
                </span>
                <h2 className="text-lg font-bold text-stone-900 font-display">
                  Trade with {negotiatingBuyer.name}
                </h2>
              </div>
              <button
                onClick={() => setNegotiatingBuyer(null)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmDeal} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Select Harvest Batch to Sell
                </label>
                <select
                  value={selectedListingId}
                  onChange={(e) => {
                    setSelectedListingId(e.target.value);
                    const l = listings.find(item => item.id === e.target.value);
                    if (l) {
                      setNegotiatedPrice(l.expectedPricePerQuintal);
                      setDealQuantity(Math.min(50, l.quantityQuintals));
                    }
                  }}
                  className="w-full border border-stone-200 rounded-xl p-2.5 bg-stone-50 text-stone-800 font-semibold outline-none"
                >
                  {listings.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.cropName} ({l.variety}) • {l.quantityQuintals} Q Available (Asking ₹{l.expectedPricePerQuintal}/Q)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Quantity (Quintals)
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="500"
                    value={dealQuantity}
                    onChange={(e) => setDealQuantity(Number(e.target.value))}
                    className="w-full border border-stone-200 rounded-xl p-2.5 bg-stone-50 font-bold text-stone-900 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-stone-700 block mb-1">
                    Agreed Price (₹ / Quintal)
                  </label>
                  <input
                    type="number"
                    min="500"
                    max="50000"
                    value={negotiatedPrice}
                    onChange={(e) => setNegotiatedPrice(Number(e.target.value))}
                    className="w-full border border-stone-200 rounded-xl p-2.5 bg-stone-50 font-bold text-emerald-800 outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Transport Terms
                </label>
                <select
                  value={freightPayer}
                  onChange={(e) => setFreightPayer(e.target.value as any)}
                  className="w-full border border-stone-200 rounded-xl p-2 bg-stone-50 text-stone-800 outline-none"
                >
                  <option value="Buyer">Buyer Arranges & Pays Pickup Truck (Doorstep)</option>
                  <option value="Farmer">Farmer Arranges Transport to Depot</option>
                  <option value="Shared 50-50">Shared 50-50 Freight Model</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  Escrow Payment Security
                </label>
                <select
                  value={escrowTerms}
                  onChange={(e) => setEscrowTerms(e.target.value as any)}
                  className="w-full border border-stone-200 rounded-xl p-2 bg-stone-50 text-stone-800 outline-none"
                >
                  <option value="100% Escrow on Dispatch">100% Locked in Escrow Before Truck Leaves Farm</option>
                  <option value="Instant DBT on Weighbridge">Instant DBT Bank Credit upon Digital Weighbridge Weigh-in</option>
                  <option value="50% Advance, 50% on Delivery">50% Advance Deposit, 50% on Quality Inspection</option>
                </select>
              </div>

              {/* Total Summary */}
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1">
                <div className="flex justify-between text-stone-600">
                  <span>Batch Value ({dealQuantity} Quintals @ ₹{negotiatedPrice}/Q):</span>
                  <span className="font-bold text-stone-900">₹{(dealQuantity * negotiatedPrice).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-emerald-800 font-extrabold text-sm pt-1 border-t border-emerald-200">
                  <span>Total Escrow Lock Amount:</span>
                  <span>₹{(dealQuantity * negotiatedPrice).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setNegotiatingBuyer(null)}
                  className="px-4 py-2 border border-stone-200 rounded-xl text-stone-600 hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-sm cursor-pointer"
                >
                  Confirm & Create Digital Contract
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
