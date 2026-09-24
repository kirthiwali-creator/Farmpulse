import React, { useState, useMemo } from 'react';
import { 
  BrainCircuit, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Truck, 
  Send, 
  MessageSquare, 
  Info,
  Presentation,
  Smile,
  Database
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CROPS_CATALOG } from '../data/mockData';
import { generateAIPrediction, askFarmpulseAIAdvisor } from '../services/aiService';

export const AiPredictionPage: React.FC = () => {
  const { selectedCropId, setSelectedCropId, setActiveTab } = useApp();
  const [qualityGrade, setQualityGrade] = useState<'Grade A (Export)' | 'Grade B (Standard)' | 'Grade C (Fair)'>('Grade A (Export)');
  const [storageType, setStorageType] = useState('Warehouse / Cold Storage');

  // Interactive AI Chat / Advisor state
  const [chatQuery, setChatQuery] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    {
      role: 'assistant',
      text: 'Namaste! I am Farmpulse AI, your agricultural market and price forecasting assistant. Ask me in simple words whether to sell your crop today, hold in storage, or compare nearby mandis.'
    }
  ]);

  const currentCrop = CROPS_CATALOG.find(c => c.id === selectedCropId) || CROPS_CATALOG[0];

  const aiResult = useMemo(() => {
    return generateAIPrediction(selectedCropId, qualityGrade, storageType);
  }, [selectedCropId, qualityGrade, storageType]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || chatQuery;
    if (!textToSend.trim() || isAsking) return;

    const userMsg = { role: 'user' as const, text: textToSend };
    setChatHistory(prev => [...prev, userMsg]);
    setChatQuery('');
    setIsAsking(true);

    try {
      const response = await askFarmpulseAIAdvisor(textToSend, {
        cropName: currentCrop.name,
        location: 'Hubli, Dharwad, Karnataka, India'
      });
      setChatHistory(prev => [...prev, { role: 'assistant', text: response }]);
    } catch {
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        text: 'Current market arrivals are moderate. Check the 14-day curve above for recommended selling windows.' 
      }]);
    } finally {
      setIsAsking(false);
    }
  };

  const curvePoints = aiResult.forecastCurve;
  const minP = Math.min(...curvePoints.map(p => p.lowerBand)) * 0.98;
  const maxP = Math.max(...curvePoints.map(p => p.upperBand)) * 1.02;
  const pRange = maxP - minP || 100;
  const svgWidth = 600;
  const svgHeight = 200;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold mb-2">
            <BrainCircuit className="w-3.5 h-3.5 text-amber-700" />
            <span>AI Price Forecasting & Hold vs. Sell Guidance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-display">
            AI Hold vs. Sell Advisor (Explained in Simple Words)
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Should you sell today or wait 7 to 10 days? We calculate storage costs, arrival spikes, and market trends so you don't panic-sell.
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

      {/* Model Input Feeds Attribution Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-xs">
        <div className="flex items-center gap-2 text-amber-950 font-medium">
          <div className="w-6 h-6 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 font-bold">
            <Database className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-bold text-amber-900">AI Model Grounded In: </span>
            <span>Agmarknet (Arrival Volatility) + IMD Agromet (7-Day Weather & Rot Risk) + WDRA (Cold Store Tariff ₹35/Q/wk)</span>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('datasources')}
          className="inline-flex items-center gap-1 font-bold text-amber-900 hover:text-stone-900 underline shrink-0 cursor-pointer self-start sm:self-auto"
        >
          <span>View Verified Data Sources</span>
        </button>
      </div>

      {/* Inputs Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
              Select Crop
            </label>
            <select
              value={selectedCropId}
              onChange={(e) => setSelectedCropId(e.target.value)}
              className="w-full text-xs font-semibold border border-stone-200 rounded-xl p-2.5 bg-stone-50 text-stone-800 outline-none cursor-pointer"
            >
              {[
                { group: 'Flowers & Floriculture', cat: 'Flower' },
                { group: 'Plantation & Nuts', cat: 'Plantation' },
                { group: 'Medicinal & Herbs', cat: 'Medicinal' },
                { group: 'Vegetables & Gourds', cat: 'Vegetable' },
                { group: 'Fruits', cat: 'Fruit' },
                { group: 'Spices & Condiments', cat: 'Spice' },
                { group: 'Pulses & Dals', cat: 'Pulse' },
                { group: 'Oilseeds', cat: 'Oilseed' },
                { group: 'Cereals & Millets', cat: 'Cereal' },
                { group: 'Commercial & Cash Crops', cat: 'Commercial' },
              ].map(({ group, cat }) => {
                const cropsInCat = CROPS_CATALOG.filter(c => c.category === cat);
                if (cropsInCat.length === 0) return null;
                return (
                  <optgroup key={cat} label={`── ${group} (${cropsInCat.length}) ──`}>
                    {cropsInCat.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.hindiName})
                      </option>
                    ))}
                  </optgroup>
                );
              })}
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
              Quality Grade
            </label>
            <select
              value={qualityGrade}
              onChange={(e) => setQualityGrade(e.target.value as any)}
              className="w-full text-xs font-semibold border border-stone-200 rounded-xl p-2.5 bg-stone-50 text-stone-800 outline-none cursor-pointer"
            >
              <option value="Grade A (Export)">Grade A (Export Quality - Uniform Size)</option>
              <option value="Grade B (Standard)">Grade B (Standard Mandi Quality)</option>
              <option value="Grade C (Fair)">Grade C (Fair Average Quality - FAQ)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
              Storage Condition
            </label>
            <select
              value={storageType}
              onChange={(e) => setStorageType(e.target.value)}
              className="w-full text-xs font-semibold border border-stone-200 rounded-xl p-2.5 bg-stone-50 text-stone-800 outline-none cursor-pointer"
            >
              <option value="Warehouse / Cold Storage">Warehouse / Cold Storage (Lowest Weight Loss)</option>
              <option value="Farm Shed">Ventilated Farm Shed (Kanda Chawl)</option>
              <option value="Open Yard">Open Yard (High Perishability Risk)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Hero Recommendation Banner in Simple Words */}
      <div className={`rounded-3xl p-6 shadow-md border text-white relative overflow-hidden ${
        aiResult.recommendedAction === 'HOLD'
          ? 'bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 border-emerald-600/50'
          : aiResult.recommendedAction === 'SELL_NOW'
          ? 'bg-gradient-to-r from-amber-900 via-rose-900 to-stone-900 border-amber-600/50'
          : 'bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border-blue-600/50'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 backdrop-blur-md border border-white/30 text-white">
                Farmpulse AI Decision Verdict
              </span>
              <span className="text-xs text-stone-300">
                Model Confidence: <strong className="text-emerald-300">{aiResult.confidenceScore}%</strong>
              </span>
            </div>

            <div className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-amber-300">
              {aiResult.recommendedAction === 'HOLD' && 'RECOMMENDED: HOLD FOR 6 TO 10 DAYS'}
              {aiResult.recommendedAction === 'SELL_NOW' && 'RECOMMENDED: SELL NOW (AVOID PRICE DROP)'}
              {aiResult.recommendedAction === 'STAGGER_SELL' && 'RECOMMENDED: SELL 40% NOW / HOLD 60%'}
            </div>

            <p className="text-sm text-stone-200 max-w-3xl leading-relaxed">
              {aiResult.aiInsightText}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
              <div className="bg-white/10 px-3 py-1.5 rounded-lg">
                <span className="text-stone-300">Current Rate: </span>
                <span className="font-bold text-white">₹{aiResult.currentPrice}/Q</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg">
                <span className="text-stone-300">Predicted 14-Day Rate: </span>
                <span className="font-bold text-emerald-300">₹{aiResult.predictedPrice14Days}/Q</span>
              </div>
              <div className="bg-white/10 px-3 py-1.5 rounded-lg">
                <span className="text-stone-300">Weekly Storage Cost: </span>
                <span className="font-bold text-amber-200">₹{aiResult.holdingCostPerQuintalPerWeek}/Q</span>
              </div>
            </div>
          </div>

          {/* Expected Gain Pill */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center shrink-0 min-w-56">
            <div className="text-xs uppercase font-bold text-stone-300">Projected Net Realization Gain</div>
            <div className={`text-4xl font-black font-display my-1 ${
              aiResult.expectedNetGainPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {aiResult.expectedNetGainPercent >= 0 ? `+${aiResult.expectedNetGainPercent}%` : `${aiResult.expectedNetGainPercent}%`}
            </div>
            <div className="text-[11px] text-stone-300">
              Clean profit after deducting storage rent & shrinkage
            </div>
            <button
              onClick={() => setActiveTab('marketplace')}
              className="mt-3 w-full py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold rounded-xl text-xs cursor-pointer transition-colors"
            >
              Lock in Direct Buyer Deal
            </button>
          </div>
        </div>
      </div>

      {/* 2-Column: 14-Day Trajectory Curve + Drivers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 14-Day Curve */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-stone-900 font-display flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>14-Day Price Forecast Probability Curve</span>
              </h3>
              <p className="text-[11px] text-stone-500">
                Modeled trajectory with 95% confidence variance envelope
              </p>
            </div>
          </div>

          <div className="w-full overflow-x-auto py-2">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight + 35}`} className="w-full h-52">
              {/* Horizontal Grid */}
              {[0.25, 0.5, 0.75, 1.0].map((ratio, idx) => {
                const y = svgHeight - ratio * (svgHeight - 40);
                const price = Math.round(minP + ratio * pRange);
                return (
                  <g key={idx}>
                    <line x1="45" y1={y} x2={svgWidth - 10} y2={y} stroke="#f5f5f4" strokeDasharray="3 3" />
                    <text x="40" y={y + 3} textAnchor="end" fontSize="9" fill="#a8a29e">
                      ₹{price}
                    </text>
                  </g>
                );
              })}

              {/* Confidence Band Polygon */}
              {(() => {
                const upperPoints = curvePoints.map((p, i) => {
                  const x = 55 + (i / (curvePoints.length - 1)) * (svgWidth - 85);
                  const y = svgHeight - ((p.upperBand - minP) / pRange) * (svgHeight - 40) - 15;
                  return `${x},${y}`;
                });
                const lowerPoints = [...curvePoints].reverse().map((p, i) => {
                  const revIndex = curvePoints.length - 1 - i;
                  const x = 55 + (revIndex / (curvePoints.length - 1)) * (svgWidth - 85);
                  const y = svgHeight - ((p.lowerBand - minP) / pRange) * (svgHeight - 40) - 15;
                  return `${x},${y}`;
                });
                const polygonPoints = [...upperPoints, ...lowerPoints].join(' ');
                return (
                  <polygon
                    points={polygonPoints}
                    fill="#d1fae5"
                    opacity="0.5"
                    stroke="#a7f3d0"
                    strokeWidth="1"
                  />
                );
              })()}

              {/* Main Line */}
              <polyline
                fill="none"
                stroke="#059669"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={curvePoints
                  .map((p, i) => {
                    const x = 55 + (i / (curvePoints.length - 1)) * (svgWidth - 85);
                    const y = svgHeight - ((p.predictedPrice - minP) / pRange) * (svgHeight - 40) - 15;
                    return `${x},${y}`;
                  })
                  .join(' ')}
              />

              {/* Points */}
              {curvePoints.map((p, i) => {
                const x = 55 + (i / (curvePoints.length - 1)) * (svgWidth - 85);
                const y = svgHeight - ((p.predictedPrice - minP) / pRange) * (svgHeight - 40) - 15;
                return (
                  <g key={i}>
                    <circle cx={x} cy={y} r={4} fill="#059669" stroke="#ffffff" strokeWidth="2" />
                    <text x={x} y={svgHeight + 18} textAnchor="middle" fontSize="9" fill="#78716c">
                      {p.date}
                    </text>
                    <text x={x} y={y - 8} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#065f46">
                      ₹{p.predictedPrice}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 flex items-start gap-2">
            <Info className="w-4 h-4 text-stone-500 mt-0.5 shrink-0" />
            <p>
              The green line represents our best model forecast; the light green band shows the safe 95% price range.
            </p>
          </div>
        </div>

        {/* Right Col: Sensitivity Factors & Best Mandi */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 space-y-4">
          <div className="pb-3 border-b border-stone-100">
            <h3 className="text-sm font-bold text-stone-900 font-display">
              Key Market Drivers (In Simple Words)
            </h3>
            <p className="text-[11px] text-stone-500">Why the AI is recommending this action</p>
          </div>

          <div className="space-y-3">
            {aiResult.keyDrivers.map((driver, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-stone-900">{driver.factor}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase ${
                    driver.impact === 'positive'
                      ? 'bg-emerald-100 text-emerald-800'
                      : driver.impact === 'negative'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-stone-200 text-stone-700'
                  }`}>
                    {driver.impact}
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  {driver.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs space-y-1.5">
            <div className="font-bold text-emerald-950 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-700" />
              <span>Recommended Target Mandi</span>
            </div>
            <div className="text-sm font-extrabold text-stone-900">
              {aiResult.bestMandiRecommendation.mandiName}
            </div>
            <div className="text-[11px] text-stone-600">
              Estimated Freight: <strong>-₹{aiResult.bestMandiRecommendation.transportCostPerQ}/Q</strong> • Net Realization: <strong className="text-emerald-800 font-bold">₹{aiResult.bestMandiRecommendation.netRealizationPerQ}/Q</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive AI Chat Section */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 font-display">
                Ask Farmpulse AI Agronomist (In Plain English, Hindi, or Kannada)
              </h3>
              <p className="text-[11px] text-stone-500">
                Ask questions about market timing, storage shrinkage, or FPO negotiation
              </p>
            </div>
          </div>
        </div>

        {/* Quick Prompts */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] text-stone-400 shrink-0 font-medium">Quick Questions:</span>
          {[
            'Should I hold onions for 10 days?',
            'What is the transport cost to Bengaluru Mandi?',
            'How does Sahyadri FPO direct pricing work?',
            'What is the MSP rate for soybean?'
          ].map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs whitespace-nowrap cursor-pointer transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat Box */}
        <div className="bg-stone-50 rounded-xl p-4 max-h-60 overflow-y-auto space-y-3 border border-stone-200">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-2xl rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-emerald-700 text-white rounded-br-none'
                    : 'bg-white border border-stone-200 text-stone-800 rounded-bl-none shadow-xs whitespace-pre-line'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isAsking && (
            <div className="flex items-center gap-2 text-xs text-stone-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Farmpulse AI is calculating seasonal trends...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Type your question (e.g. 'How much does storage cost for 100 bags?')"
            value={chatQuery}
            onChange={(e) => setChatQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 text-xs border border-stone-300 rounded-xl px-3.5 py-2.5 outline-none focus:border-emerald-600 bg-white"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!chatQuery.trim() || isAsking}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Ask AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};
