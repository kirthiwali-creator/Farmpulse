import React from 'react';
import { X, Terminal, Check, Copy, Sparkles, BookOpen, ShieldCheck, Cpu } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const RunInstructionsModal: React.FC = () => {
  const { isRunInstructionsOpen, setIsRunInstructionsOpen } = useApp();
  const [copied, setCopied] = React.useState(false);

  if (!isRunInstructionsOpen) return null;

  const runCodeSnippet = `git clone <repo-url>
cd farmpulse
npm install
npm run dev

# App runs locally at:
# http://localhost:3000`;

  const handleCopy = () => {
    navigator.clipboard.writeText(runCodeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 max-w-2xl w-full p-6 relative my-8">
        {/* Close Button */}
        <button
          onClick={() => setIsRunInstructionsOpen(false)}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-900 font-display">
              SIH26132: Farmpulse Setup & Architecture
            </h2>
            <p className="text-xs text-stone-500">
              Strengthening Market Linkages & Transparent Price Discovery for Farmers
            </p>
          </div>
        </div>

        {/* Quick Run Box */}
        <div className="mb-5 bg-stone-900 text-stone-100 rounded-xl p-4 font-mono text-xs relative group">
          <div className="flex justify-between items-center text-stone-400 pb-2 mb-2 border-b border-stone-800 text-[11px]">
            <span>Terminal Commands</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-emerald-400 hover:text-white bg-stone-800 px-2 py-1 rounded cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          <pre className="text-emerald-300 leading-relaxed overflow-x-auto whitespace-pre">
            {runCodeSnippet}
          </pre>
        </div>

        {/* Core Architecture Highlights */}
        <div className="space-y-3 mb-6 text-xs text-stone-700">
          <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-2.5">
            <Cpu className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-emerald-950">Simple Words Presentation & SIH Deck:</span>
              <p className="text-stone-600 mt-0.5 leading-relaxed">
                Includes an 8-slide structured presentation deck with plain English explanations, explicit Advantages (Farmers, Buyers, Government), and a compelling real-world example comparing traditional trade to Farmpulse trade (+₹1,15,000 profit).
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-100 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-800 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-amber-950">Net Realization vs. Gross Mandi Rate:</span>
              <p className="text-stone-600 mt-0.5 leading-relaxed">
                Traditional portals only display raw mandi prices. Farmpulse calculates the actual cash in the farmer pocket by computing dynamic road freight (distance km × truck freight per quintal), mandi cess, and bag handling.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start gap-2.5">
            <BookOpen className="w-4 h-4 text-blue-800 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-blue-950">Full-Stack Architecture & Real-Time Data:</span>
              <p className="text-stone-600 mt-0.5 leading-relaxed">
                Connects to 48 APMC mandi feeds with deterministic seasonal models and optional server-side Gemini AI for multilingual farmer advisory.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100 flex items-start gap-2.5">
            <Cpu className="w-4 h-4 text-purple-800 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-purple-950">7 Open Government Data Sources & APIs:</span>
              <p className="text-stone-600 mt-0.5 leading-relaxed">
                Seamlessly integrates Agmarknet (DMI/MoA&FW), e-NAM (SFAC), IMD Weather & Agromet, WDRA Cold Storages, DCA Price Monitoring Division, and PPAC/MoRTH Freight benchmarks with live schema inspection and test pings.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-3 border-t border-stone-100">
          <button
            onClick={() => setIsRunInstructionsOpen(false)}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-sm transition-colors"
          >
            Return to App
          </button>
        </div>
      </div>
    </div>
  );
};
