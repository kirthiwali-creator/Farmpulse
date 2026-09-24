import React, { useState } from 'react';
import { 
  Building2, 
  AlertTriangle, 
  Presentation 
} from 'lucide-react';
import { ADMIN_MANDI_ANALYTICS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const AdminAnalyticsPage: React.FC = () => {
  const [selectedRiskFilter, setSelectedRiskFilter] = useState('All');
  const { setActiveTab } = useApp();

  const filteredDistricts = ADMIN_MANDI_ANALYTICS.districtHeatmap.filter(d => {
    return selectedRiskFilter === 'All' || d.distressRisk === selectedRiskFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-xs font-semibold mb-2">
            <Building2 className="w-3.5 h-3.5 text-blue-700" />
            <span>State Agriculture Marketing Board & APMC Directorate</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
            State-Level Agri-Market Analytics & Distress Radar
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Macro surveillance of mandi price movements, incoming harvest volumes, and early warning triggers for distress selling.
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

      {/* 5 Macro KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Mandis Monitored</span>
          <div className="text-2xl font-black text-stone-900 font-display">
            {ADMIN_MANDI_ANALYTICS.totalMandisMonitored}
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold">Agmarknet & e-NAM</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Active FPOs</span>
          <div className="text-2xl font-black text-stone-900 font-display">
            {ADMIN_MANDI_ANALYTICS.activeFPOsEnrolled}
          </div>
          <span className="text-[10px] text-teal-700 font-semibold">Verified Buyers</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Farmers Linked</span>
          <div className="text-2xl font-black text-stone-900 font-display">
            {ADMIN_MANDI_ANALYTICS.farmersBenefitted.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold">86% Smallholders</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Trade Volume</span>
          <div className="text-2xl font-black text-stone-900 font-display">
            ₹{ADMIN_MANDI_ANALYTICS.totalTradeVolumeCrores} Cr
          </div>
          <span className="text-[10px] text-stone-500 font-semibold">Zero Default Rate</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-sm space-y-1">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Farmer Margin Uplift</span>
          <div className="text-2xl font-black text-emerald-700 font-display">
            {ADMIN_MANDI_ANALYTICS.averageFarmerRealizationDelta}
          </div>
          <span className="text-[10px] text-emerald-800 font-semibold">Net Extra Cash</span>
        </div>
      </div>

      {/* Distress Sale Early Warning Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-950 block text-sm">
              Distress Sale Early Warning in Solapur District
            </span>
            <p className="text-stone-600 text-xs mt-0.5">
              Arrivals have outpaced local cold storage capacity by 34%. Modal price dipped -4.5% below cost of production. Automatic FPO procurement dispatch notification sent to regional buyer clusters.
            </p>
          </div>
        </div>
        <button className="px-3.5 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-semibold cursor-pointer shrink-0">
          Trigger MSP Intervention
        </button>
      </div>

      {/* 2-Column: District Table + Top Crops Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="text-sm font-bold text-stone-900 font-display">
                District-Level Arrival & Distress Risk Surveillance
              </h3>
              <p className="text-[11px] text-stone-500">Real-time indicators across Karnataka & Maharashtra corridors</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-stone-400">Risk:</span>
              <select
                value={selectedRiskFilter}
                onChange={(e) => setSelectedRiskFilter(e.target.value)}
                className="text-xs border border-stone-200 rounded-lg px-2 py-1 bg-stone-50 text-stone-700 outline-none cursor-pointer"
              >
                <option value="All">All Levels</option>
                <option value="Low">Low Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="High">High (Distress)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] text-stone-400 uppercase font-bold border-b border-stone-100">
                  <th className="py-2.5 px-2">District & State</th>
                  <th className="py-2.5 px-2">Arrival Volume</th>
                  <th className="py-2.5 px-2">Price Trend</th>
                  <th className="py-2.5 px-2 text-right">Distress Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredDistricts.map((item, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/80">
                    <td className="py-3 px-2">
                      <div className="font-bold text-stone-900">{item.district}</div>
                      <div className="text-[10px] text-stone-400">{item.state}</div>
                    </td>
                    <td className="py-3 px-2 font-semibold text-stone-800">
                      {item.volumeQ.toLocaleString('en-IN')} Quintals
                    </td>
                    <td className="py-3 px-2">
                      <span className={`font-bold ${item.priceTrend.startsWith('+') ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {item.priceTrend}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.distressRisk === 'Low'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.distressRisk === 'Medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800 animate-pulse'
                      }`}>
                        {item.distressRisk} Risk
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col: Mandi Average vs Direct Buyer Rate */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 space-y-4">
          <div className="pb-3 border-b border-stone-100">
            <h3 className="text-sm font-bold text-stone-900 font-display">
              Mandi Auction vs. Direct Buyer Rate
            </h3>
            <p className="text-[11px] text-stone-500">
              Quantifying farmer margin gains per quintal
            </p>
          </div>

          <div className="space-y-3.5">
            {ADMIN_MANDI_ANALYTICS.topInDemandCrops.map((c, idx) => {
              const delta = c.directBuyerAvg - c.avgMandi;
              const deltaPercent = ((delta / c.avgMandi) * 100).toFixed(1);
              return (
                <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-900">{c.name}</span>
                    <span className="text-emerald-700 font-extrabold">+{deltaPercent}% Uplift</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-white p-2 rounded-lg border border-stone-100">
                      <span className="text-stone-400 block text-[9px] uppercase">Traditional Mandi</span>
                      <strong className="text-stone-800">₹{c.avgMandi.toLocaleString('en-IN')}/Q</strong>
                    </div>
                    <div className="bg-emerald-50/80 p-2 rounded-lg border border-emerald-200">
                      <span className="text-emerald-800 block text-[9px] uppercase font-semibold">Farmpulse Direct</span>
                      <strong className="text-emerald-900 font-bold">₹{c.directBuyerAvg.toLocaleString('en-IN')}/Q</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-950">
            <span className="font-bold block mb-0.5">Policy Recommendation:</span>
            <p className="text-[11px] text-stone-600">
              Promote digital weighing at 14 secondary APMCs to eliminate tare tampering and encourage direct FPO contracting under the ONDC Agri network.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
