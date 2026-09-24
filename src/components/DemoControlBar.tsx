import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Clock, 
  Minimize2, 
  Maximize2,
  Presentation,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DemoControlBar: React.FC = () => {
  const { demoStep, jumpToDemoStep } = useApp();
  const [isMinimized, setIsMinimized] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(300); // 5 minutes timer
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, secondsLeft]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const steps = [
    { num: 1, label: '1. SIH26132 PPT Deck', desc: 'Simple Words, Advantages, Real-World Story' },
    { num: 2, label: '2. Mandi Discovery', desc: 'Net Realization & Transport Math' },
    { num: 3, label: '3. Farmpulse AI', desc: 'Hold vs. Sell Engine & 14-Day Curve' },
    { num: 4, label: '4. Direct Buyers', desc: 'FPO Matchmaking & Fair Bidding' },
    { num: 5, label: '5. Kisan Dashboard', desc: 'Farmer Portfolio & Bank Details' },
    { num: 6, label: '6. List Produce', desc: 'Quality Grade & Moisture Spec' },
    { num: 7, label: '7. Smart Contract', desc: 'Digital Escrow & Instant DBT' },
    { num: 8, label: '8. State APMC Radar', desc: 'Distress Early Warning System' },
    { num: 9, label: '9. Data Sources & APIs', desc: 'Agmarknet, e-NAM, IMD, WDRA, PPAC' },
  ];

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 bg-stone-900/95 text-emerald-400 px-4 py-2.5 rounded-full shadow-2xl border border-emerald-500/40 hover:bg-stone-800 cursor-pointer transition-all hover:scale-105 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span className="text-xs font-bold tracking-wide text-white">SIH Feature Navigator</span>
          <span className="bg-emerald-800/80 text-emerald-300 text-[11px] font-mono px-2 py-0.5 rounded-full">
            {formatTime(secondsLeft)}
          </span>
          <Maximize2 className="w-3.5 h-3.5 text-stone-400" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-5xl">
      <div className="bg-stone-900/95 backdrop-blur-xl border border-emerald-500/30 text-white rounded-2xl shadow-2xl p-2.5 px-4 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Indicator & Timer */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <div>
              <div className="text-[11px] font-bold text-amber-400 tracking-wider uppercase flex items-center gap-1">
                <span>SIH26132 Presentation & Live Demo</span>
              </div>
              <div className="text-[10px] text-stone-400">Step {demoStep} of 8: {steps[demoStep - 1]?.desc}</div>
            </div>
          </div>

          {/* 5-Min Timer */}
          <div className="flex items-center gap-1.5 bg-stone-800/90 px-3 py-1.5 rounded-xl border border-stone-700">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className={`text-xs font-mono font-bold ${secondsLeft < 60 ? 'text-rose-400 animate-pulse' : 'text-emerald-300'}`}>
              {formatTime(secondsLeft)}
            </span>
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className="p-1 hover:bg-stone-700 rounded text-stone-300 cursor-pointer"
              title={timerRunning ? 'Pause timer' : 'Start 5-min demo timer'}
            >
              {timerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-emerald-400" />}
            </button>
            <button
              onClick={() => {
                setTimerRunning(false);
                setSecondsLeft(300);
              }}
              className="p-1 hover:bg-stone-700 rounded text-stone-400 hover:text-white cursor-pointer"
              title="Reset timer to 5:00"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Center: Step Walkthrough Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-full py-1 scrollbar-none">
          {steps.map((s) => {
            const isCurrent = demoStep === s.num;
            return (
              <button
                key={s.num}
                onClick={() => jumpToDemoStep(s.num)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                  isCurrent
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/50 scale-102 ring-1 ring-emerald-400'
                    : 'bg-stone-800/70 text-stone-300 hover:bg-stone-700/80 hover:text-white'
                }`}
              >
                {isCurrent && <CheckCircle2 className="w-3 h-3 text-emerald-200" />}
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Prev / Next & Minimize */}
        <div className="flex items-center gap-1 self-end md:self-auto shrink-0">
          <button
            onClick={() => jumpToDemoStep(Math.max(1, demoStep - 1))}
            disabled={demoStep === 1}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            title="Previous Demo Step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => jumpToDemoStep(Math.min(8, demoStep + 1))}
            disabled={demoStep === 8}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            title="Next Demo Step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-400 hover:text-white cursor-pointer ml-1"
            title="Minimize Bar"
          >
            <Minimize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
