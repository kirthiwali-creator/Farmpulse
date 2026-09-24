import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  CreditCard, 
  Landmark, 
  Globe, 
  CheckCircle2, 
  Check, 
  Save,
  Presentation
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';

export const ProfilePage: React.FC = () => {
  const { farmerProfile, language, setLanguage, setActiveTab } = useApp();
  const [saved, setSaved] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [mandiSpikeAlerts, setMandiSpikeAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Kisan Credit Card (KCC) Verified Profile</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
            Kisan Profile & Bank Account Details
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Verified smallholder credentials powering Direct Benefit Transfer (DBT) and digital escrow settlements.
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

      <form onSubmit={handleSave} className="space-y-6">
        {/* Farmer Personal & Farm Details */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 font-bold text-lg flex items-center justify-center border-2 border-emerald-400">
                RP
              </div>
              <div>
                <h2 className="text-base font-bold text-stone-900 font-display flex items-center gap-2">
                  <span>{farmerProfile.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </h2>
                <p className="text-xs text-stone-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  <span>{farmerProfile.location}, {farmerProfile.state}</span>
                </p>
              </div>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full">
              KCC Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                Kisan Credit Card ID
              </label>
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 font-mono font-bold text-stone-900">
                {farmerProfile.kisanId || 'KA-DWD-2026-9822'}
              </div>
            </div>
            <div>
              <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                Registered Mobile
              </label>
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 font-bold text-stone-900 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>{farmerProfile.phone || '+91 98221 44521'}</span>
              </div>
            </div>
            <div>
              <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                Cultivated Landholding
              </label>
              <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 font-bold text-stone-900">
                {farmerProfile.landAreaAcres} Acres (Smallholder Farmer)
              </div>
            </div>
          </div>
        </div>

        {/* Banking & Kisan Credit Card (KCC) Settlement */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Landmark className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-stone-900 font-display">
                Kisan Credit Card (KCC) & Direct Bank Account (DBT)
              </h3>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              DBT Auto-Settlement Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            {/* Visual KCC Card */}
            <div className="md:col-span-5 bg-gradient-to-tr from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-2xl p-5 shadow-md flex flex-col justify-between relative overflow-hidden border border-emerald-700/60 min-h-[190px]">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-200">
                    Kisan Credit Card (KCC)
                  </div>
                  <div className="text-xs font-semibold text-stone-200">State Bank of India</div>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-700/60 border border-emerald-500/40 text-[10px] font-bold text-amber-300">
                  <CreditCard className="w-3 h-3" />
                  <span>RuPay Kisan</span>
                </div>
              </div>

              <div className="py-2">
                <div className="w-8 h-6 bg-gradient-to-br from-amber-200 to-amber-400 rounded-sm border border-amber-500 shadow-xs mb-2 opacity-90" />
                <div className="font-mono text-sm tracking-widest text-emerald-100 font-bold drop-shadow-xs">
                  6521 •••• •••• 4521
                </div>
              </div>

              <div className="flex justify-between items-end text-[11px] pt-1 border-t border-emerald-700/60">
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-emerald-300 font-semibold">Cardholder</div>
                  <div className="font-bold tracking-wide uppercase text-white">RAMESH PATIL</div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] uppercase tracking-wider text-emerald-300 font-semibold">Valid Thru</div>
                  <div className="font-mono font-bold text-white">08/31</div>
                </div>
              </div>
            </div>

            {/* Linked Bank Details */}
            <div className="md:col-span-7 space-y-3">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-stone-400">Linked Bank & Branch</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">Primary Account</span>
                </div>
                <div className="font-bold text-stone-900 text-sm">State Bank of India (SBI)</div>
                <div className="text-stone-600 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                  <span>Hubli Agricultural Branch, Dharwad, Karnataka, India</span>
                </div>
                <div className="text-xs text-stone-800 font-mono font-semibold pt-1 border-t border-stone-200 flex flex-wrap gap-x-4 gap-y-1">
                  <span>A/c: <strong>**********4521</strong></span>
                  <span>IFSC: <strong>SBIN0000844</strong></span>
                  <span>Mobile: <strong>+91 98221 44521</strong></span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold block text-[11px] text-emerald-900">Instant Escrow Settlement Guaranteed</span>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    Sale proceeds from verified buyers credit directly to this KCC account with real-time SMS confirmation sent to <strong>+91 98221 44521</strong> in Kannada/English.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Language Preferences */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 space-y-4 text-xs">
          <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
            <Globe className="w-4 h-4 text-emerald-700" />
            <h3 className="text-sm font-bold text-stone-900 font-display">
              Regional Language & SMS Advisory
            </h3>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-2">
              Preferred Language for App & Alerts
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { code: 'en' as Language, title: 'English', sub: 'Standard English' },
                { code: 'hi' as Language, title: 'हिंदी (Hindi)', sub: 'सरल हिंदी' },
                { code: 'kn' as Language, title: 'ಕನ್ನಡ (Kannada)', sub: 'ಸುಲಭ ಕನ್ನಡ' },
              ].map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLanguage(l.code)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    language === l.code
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-1 ring-emerald-600 font-bold'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div className="font-bold">{l.title}</div>
                  <div className="text-[10px] text-stone-500">{l.sub}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-stone-800 block">Daily Mandi Price Spike Alerts (SMS)</span>
                <span className="text-[11px] text-stone-500">Get SMS when prices jump by more than ₹100/Q in nearby mandis</span>
              </div>
              <input
                type="checkbox"
                checked={mandiSpikeAlerts}
                onChange={(e) => setMandiSpikeAlerts(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-stone-800 block">WhatsApp Farmpulse AI Hold/Sell Advisory</span>
                <span className="text-[11px] text-stone-500">Receive 14-day price prediction digest on WhatsApp</span>
              </div>
              <input
                type="checkbox"
                checked={whatsappAlerts}
                onChange={(e) => setWhatsappAlerts(e.target.checked)}
                className="w-4 h-4 accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-end gap-3">
          {saved && (
            <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
              <Check className="w-4 h-4" />
              <span>Preferences Saved Successfully!</span>
            </span>
          )}
          <button
            type="submit"
            className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
