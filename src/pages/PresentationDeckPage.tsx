import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Presentation, 
  Sparkles, 
  Play, 
  FileText, 
  CheckCircle2, 
  Award, 
  Lightbulb, 
  ArrowRight, 
  Copy, 
  Check, 
  Maximize2, 
  Minimize2, 
  ShieldCheck, 
  DollarSign, 
  TrendingUp, 
  Building2, 
  UserCheck, 
  Smile, 
  AlertCircle,
  Download,
  Printer,
  FileCode,
  Share2,
  Loader2,
  ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PLATFORM_PRESENTATION_SLIDES } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { NavigationTab } from '../context/AppContext';
import { 
  generatePptx, 
  downloadHtmlPresentation, 
  downloadPresentationMarkdown 
} from '../utils/exportFormats';

export const PresentationDeckPage: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSimpleWordsMode, setIsSimpleWordsMode] = useState(true);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  const { setActiveTab, setSelectedCropId } = useApp();

  const slide = PLATFORM_PRESENTATION_SLIDES[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < PLATFORM_PRESENTATION_SLIDES.length - 1) {
      const nextIdx = currentSlideIndex + 1;
      setCurrentSlideIndex(nextIdx);
      if (nextIdx === 2 || nextIdx === PLATFORM_PRESENTATION_SLIDES.length - 1) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const handleDownloadPptx = async () => {
    try {
      setIsDownloading(true);
      const fileName = await generatePptx({ isSimpleWords: isSimpleWordsMode });
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 }
      });
      setDownloadMessage(`PowerPoint file "${fileName}" downloaded successfully!`);
      setTimeout(() => setDownloadMessage(null), 4500);
    } catch {
      setDownloadMessage('Export notice: Falling back to Interactive HTML presentation download.');
      downloadHtmlPresentation(isSimpleWordsMode);
      setTimeout(() => setDownloadMessage(null), 4500);
    } finally {
      setIsDownloading(false);
      setShowDownloadMenu(false);
    }
  };

  const handleDownloadHtml = () => {
    downloadHtmlPresentation(isSimpleWordsMode);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 }
    });
    setDownloadMessage('Interactive HTML Presentation downloaded! Open in any browser.');
    setTimeout(() => setDownloadMessage(null), 4500);
    setShowDownloadMenu(false);
  };

  const handleDownloadMarkdown = () => {
    downloadPresentationMarkdown(isSimpleWordsMode);
    setDownloadMessage('Presentation Script & Notes (.md) downloaded!');
    setTimeout(() => setDownloadMessage(null), 4500);
    setShowDownloadMenu(false);
  };

  const handlePrintPdf = () => {
    setShowDownloadMenu(false);
    window.print();
  };

  const handleCopySlideText = () => {
    const textToCopy = `[SIH26132 PPT] Slide ${slide.slideNumber}: ${isSimpleWordsMode ? slide.simpleTitle : slide.title}
Subtitle: ${slide.subtitle}

Summary in Simple Words:
${slide.simpleSummary}

Key Points:
${(isSimpleWordsMode ? slide.simpleKeyPoints : slide.keyPoints).map((pt, i) => `${i + 1}. ${pt}`).join('\n')}

${slide.realWorldExample ? `
Real-World Example (${slide.realWorldExample.farmerName}):
Old Way: Earned ₹${slide.realWorldExample.oldWayScenario.totalEarnings.toLocaleString('en-IN')}
Farmpulse Way: Earned ₹${slide.realWorldExample.newWayScenario.totalEarnings.toLocaleString('en-IN')}
Net Extra Money: +₹${slide.realWorldExample.netExtraCash.toLocaleString('en-IN')}
Lesson: ${slide.realWorldExample.keyLesson}
` : ''}

${slide.advantages ? `
Key Advantages:
${slide.advantages.map(a => `- For ${a.audience}: ${a.benefit} (${a.simpleExplanation})`).join('\n')}
` : ''}

Speaker Notes:
${slide.speakerNotes}`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6 ${isFullScreen ? 'fixed inset-0 z-50 bg-stone-950 p-6 overflow-y-auto max-w-none' : ''}`}>
      {/* Top Deck Controls Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-900 shadow-xs">
            <Presentation className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-stone-900 px-2 py-0.5 rounded-sm">
                SIH26132
              </span>
              <span className="text-xs text-stone-500 font-semibold">
                8 Slides • Strengthen Market Linkages & Price Discovery
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
              Official SIH Solution Presentation (Simple Words Edition)
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 relative">
          {/* Simple Words Switcher */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs">
            <button
              onClick={() => setIsSimpleWordsMode(true)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isSimpleWordsMode
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Smile className="w-3.5 h-3.5" />
              <span>Simple Words (Kisan & Judge)</span>
            </button>
            <button
              onClick={() => setIsSimpleWordsMode(false)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                !isSimpleWordsMode
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Detailed Technical
            </button>
          </div>

          {/* Direct Download PPT Button */}
          <button
            onClick={handleDownloadPptx}
            disabled={isDownloading}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-stone-950 text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1.5 transition-all"
            title="Download full 8-slide PowerPoint presentation (.pptx)"
          >
            {isDownloading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            <span>{isDownloading ? 'Generating PPT...' : 'Download PPT (.pptx)'}</span>
          </button>

          {/* Download Options Dropdown Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowDownloadMenu(!showDownloadMenu)}
              className="px-2.5 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold cursor-pointer flex items-center gap-1"
              title="More download & export options"
            >
              <span>Export</span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
            </button>

            {showDownloadMenu && (
              <div className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-2xl shadow-xl border border-stone-200 p-2 z-50 text-xs space-y-1">
                <div className="px-2 py-1 font-bold text-stone-400 text-[10px] uppercase tracking-wider">
                  Download Formats
                </div>
                <button
                  onClick={handleDownloadPptx}
                  className="w-full text-left p-2 rounded-xl hover:bg-amber-50 flex items-start gap-2.5 text-stone-800 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-stone-900">PowerPoint Deck (.pptx)</div>
                    <div className="text-[10px] text-stone-500">8 styled slides with Ramesh case study & notes</div>
                  </div>
                </button>

                <button
                  onClick={handleDownloadHtml}
                  className="w-full text-left p-2 rounded-xl hover:bg-emerald-50 flex items-start gap-2.5 text-stone-800 cursor-pointer"
                >
                  <FileCode className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-stone-900">Interactive Offline HTML (.html)</div>
                    <div className="text-[10px] text-stone-500">Self-contained presentation with keyboard keys</div>
                  </div>
                </button>

                <button
                  onClick={handlePrintPdf}
                  className="w-full text-left p-2 rounded-xl hover:bg-blue-50 flex items-start gap-2.5 text-stone-800 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-stone-900">Print / Save as PDF</div>
                    <div className="text-[10px] text-stone-500">Browser print formatted as printable slides</div>
                  </div>
                </button>

                <button
                  onClick={handleDownloadMarkdown}
                  className="w-full text-left p-2 rounded-xl hover:bg-stone-100 flex items-start gap-2.5 text-stone-800 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-stone-900">Presentation Script (.md)</div>
                    <div className="text-[10px] text-stone-500">Full verbatim transcript & speaker notes</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Copy Slide Text */}
          <button
            onClick={handleCopySlideText}
            className="px-3 py-1.5 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold cursor-pointer flex items-center gap-1.5"
            title="Copy this slide text for PPT presentation"
          >
            {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
            <span>{copiedText ? 'Copied!' : 'Copy Slide Text'}</span>
          </button>

          {/* Notes Toggle */}
          <button
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer flex items-center gap-1.5 ${
              showSpeakerNotes
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{showSpeakerNotes ? 'Hide Speaker Notes' : 'Show Speaker Notes'}</span>
          </button>

          {/* Full Screen Toggle */}
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold cursor-pointer"
            title={isFullScreen ? 'Exit full screen' : 'Full screen slide view'}
          >
            {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Download Toast Notification Banner */}
      {downloadMessage && (
        <div className="bg-emerald-800 text-white px-4 py-3 rounded-2xl shadow-lg flex items-center justify-between gap-3 text-xs font-medium animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>{downloadMessage}</span>
          </div>
          <button
            onClick={() => setDownloadMessage(null)}
            className="text-emerald-200 hover:text-white text-xs underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Slide Thumbnails Quick Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {PLATFORM_PRESENTATION_SLIDES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlideIndex(idx)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-all shrink-0 flex items-center gap-1.5 border ${
              currentSlideIndex === idx
                ? 'bg-amber-400 text-stone-950 font-bold border-amber-500 shadow-sm ring-2 ring-amber-300'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50 hover:border-stone-300'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-stone-900/10 text-stone-900 font-bold text-[10px] flex items-center justify-center">
              {s.slideNumber}
            </span>
            <span>{s.topicFocus}</span>
            {s.realWorldExample && (
              <span className="bg-emerald-100 text-emerald-900 text-[9px] px-1 py-0.2 rounded font-bold">
                Real Example
              </span>
            )}
            {s.advantages && (
              <span className="bg-blue-100 text-blue-900 text-[9px] px-1 py-0.2 rounded font-bold">
                Advantages
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main Slide Presentation Canvas */}
      <div className="bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-stone-800 relative min-h-[480px] flex flex-col justify-between overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Slide Header: SIH Problem & Step Counter */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {slide.sihFocus}
            </span>
            {isSimpleWordsMode && (
              <span className="bg-emerald-900/80 text-emerald-300 border border-emerald-600/50 text-[10px] px-2 py-0.5 rounded-full font-semibold">
                Simple Words Mode Active
              </span>
            )}
          </div>
          <span className="font-mono text-xs text-stone-400 bg-stone-800 px-2.5 py-1 rounded-lg">
            Slide {slide.slideNumber} of {PLATFORM_PRESENTATION_SLIDES.length}
          </span>
        </div>

        {/* Slide Main Body Content */}
        <div className="my-6 space-y-6 relative z-10">
          {/* Headings */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-white leading-tight">
              {isSimpleWordsMode ? slide.simpleTitle : slide.title}
            </h2>
            <p className="text-sm sm:text-base text-emerald-300 font-medium leading-relaxed">
              {slide.subtitle}
            </p>
          </div>

          {/* Simple Words Summary Callout Box */}
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-100 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 block mb-0.5 font-bold uppercase text-[11px] tracking-wider">
                In Simple Words:
              </strong>
              <p>{slide.simpleSummary}</p>
            </div>
          </div>

          {/* Bullet Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {(isSimpleWordsMode ? slide.simpleKeyPoints : slide.keyPoints).map((pt, index) => (
              <div
                key={index}
                className="p-3.5 rounded-xl bg-stone-800/70 border border-stone-700/70 text-xs text-stone-200 leading-relaxed flex items-start gap-3 backdrop-blur-sm"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-900 border border-emerald-400 text-emerald-300 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <div className="font-medium">{pt}</div>
              </div>
            ))}
          </div>

          {/* DEDICATED REAL-WORLD EXAMPLE CARD (When present on the slide) */}
          {slide.realWorldExample && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/80 via-stone-900 to-emerald-950/80 border border-amber-500/40 text-xs space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-500/30 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-400 text-stone-950 font-black text-xs">
                    REAL CASE STUDY
                  </span>
                  <span className="font-bold text-white text-sm">
                    {slide.realWorldExample.title}
                  </span>
                </div>
                <span className="text-stone-300 text-[11px]">
                  Batch: <strong className="text-amber-300">{slide.realWorldExample.quantity}</strong> ({slide.realWorldExample.crop})
                </span>
              </div>

              {/* Old Way vs Farmpulse Way Visual Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Old Way Box */}
                <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-800/50 space-y-2">
                  <div className="flex items-center justify-between text-rose-300 font-bold text-xs">
                    <span>❌ The Old Way (Village Broker)</span>
                    <span className="text-rose-400 font-mono">₹{slide.realWorldExample.oldWayScenario.pricePerQ}/Q</span>
                  </div>
                  <p className="text-[11px] text-stone-300">
                    {slide.realWorldExample.oldWayScenario.description}
                  </p>
                  <div className="pt-2 border-t border-rose-900/80 flex justify-between text-stone-400 text-[11px]">
                    <span>Net in hand after hidden fees:</span>
                    <strong className="text-rose-300 font-mono">₹{slide.realWorldExample.oldWayScenario.netInHand}/Q</strong>
                  </div>
                  <div className="flex justify-between items-baseline text-xs font-bold text-stone-200">
                    <span>Total Cash Earned:</span>
                    <span className="text-sm font-black text-rose-300 font-display">
                      ₹{slide.realWorldExample.oldWayScenario.totalEarnings.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Farmpulse Way Box */}
                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/50 space-y-2">
                  <div className="flex items-center justify-between text-emerald-300 font-bold text-xs">
                    <span>✅ The Farmpulse Way (Direct FPO Deal)</span>
                    <span className="text-emerald-300 font-mono">₹{slide.realWorldExample.newWayScenario.pricePerQ}/Q</span>
                  </div>
                  <p className="text-[11px] text-stone-300">
                    {slide.realWorldExample.newWayScenario.description}
                  </p>
                  <div className="pt-2 border-t border-emerald-900/80 flex justify-between text-stone-400 text-[11px]">
                    <span>Net in hand (Buyer paid pickup):</span>
                    <strong className="text-emerald-300 font-mono">₹{slide.realWorldExample.newWayScenario.netInHand}/Q</strong>
                  </div>
                  <div className="flex justify-between items-baseline text-xs font-bold text-stone-200">
                    <span>Total Cash Earned:</span>
                    <span className="text-sm font-black text-emerald-300 font-display">
                      ₹{slide.realWorldExample.newWayScenario.totalEarnings.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Net Extra Cash Callout */}
              <div className="p-3 rounded-xl bg-amber-400 text-stone-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-bold">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-stone-950 shrink-0" />
                  <span>Extra Cash in Farmer's Bank Account:</span>
                </div>
                <div className="text-lg sm:text-xl font-black font-display">
                  +₹{slide.realWorldExample.netExtraCash.toLocaleString('en-IN')} (+69.7% Higher Income!)
                </div>
              </div>

              <div className="text-[11px] text-stone-300 italic">
                "{slide.realWorldExample.keyLesson}"
              </div>
            </div>
          )}

          {/* DEDICATED ADVANTAGES GRID (When present on the slide) */}
          {slide.advantages && (
            <div className="space-y-2 pt-1">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Explicit Advantages of Farmpulse:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {slide.advantages.map((adv, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700 text-xs space-y-1"
                  >
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                      adv.audience === 'Farmer'
                        ? 'bg-emerald-900 text-emerald-200 border border-emerald-500'
                        : adv.audience === 'Buyer'
                        ? 'bg-blue-900 text-blue-200 border border-blue-500'
                        : 'bg-amber-900 text-amber-200 border border-amber-500'
                    }`}>
                      For {adv.audience}
                    </span>
                    <div className="font-bold text-white text-xs pt-1">
                      {adv.benefit}
                    </div>
                    <p className="text-[11px] text-stone-300 leading-relaxed">
                      {adv.simpleExplanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Metric Highlight Box */}
          {slide.metricsOrHighlight && (
            <div className="p-3.5 rounded-2xl bg-stone-800/80 border border-stone-700 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-stone-300">Key SIH Metric:</span>
                <strong className="text-amber-300">{slide.metricsOrHighlight}</strong>
              </div>
              {slide.suggestedAppTab && (
                <button
                  onClick={() => setActiveTab(slide.suggestedAppTab as NavigationTab)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors shrink-0 shadow-xs"
                >
                  <span>Try Feature in App</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Slide Footer Navigation Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-800 relative z-10">
          <button
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold cursor-pointer text-stone-300 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Slide</span>
          </button>

          {/* Interactive Slide Dots */}
          <div className="flex items-center gap-1.5">
            {PLATFORM_PRESENTATION_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  currentSlideIndex === idx ? 'w-8 bg-amber-400' : 'w-2.5 bg-stone-700 hover:bg-stone-500'
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentSlideIndex === PLATFORM_PRESENTATION_SLIDES.length - 1}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold cursor-pointer text-white shadow-md shadow-emerald-900/40 transition-colors"
          >
            <span>Next Slide</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Speaker Notes Box (Farmer/Judge Plain Explanation) */}
      {showSpeakerNotes && (
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-amber-950 font-bold text-xs">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-700" />
              <span>Speaker Notes & Plain Explanation for Slide {slide.slideNumber}:</span>
            </div>
            <span className="text-[11px] text-amber-800 font-normal">
              Read this aloud during judging presentation
            </span>
          </div>
          <p className="text-xs text-stone-800 leading-relaxed italic bg-white p-4 rounded-xl border border-amber-100 shadow-xs">
            "{slide.speakerNotes}"
          </p>
        </div>
      )}

      {/* Download & Export Presentation Section */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white rounded-3xl p-6 border border-stone-700 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-700/60 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-stone-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-sm">
                Instant Download
              </span>
              <h2 className="text-lg font-bold font-display text-white">
                Download SIH26132 Presentation (All 8 Slides)
              </h2>
            </div>
            <p className="text-xs text-stone-300 mt-1">
              Choose your preferred format for the judging evaluation or offline presentation:
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-950/80 border border-emerald-700/50 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Current Mode: {isSimpleWordsMode ? 'Simple Words' : 'Technical'}</span>
            </span>
          </div>
        </div>

        {/* 4 Download Option Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* 1. PowerPoint PPTX */}
          <div className="bg-stone-800/80 rounded-2xl border border-stone-700 p-4 flex flex-col justify-between hover:border-amber-400/60 transition-colors">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-base">
                PPT
              </div>
              <h3 className="font-bold text-sm text-white">PowerPoint (.pptx)</h3>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Standard Microsoft PowerPoint presentation. Includes custom styled slides, Ramesh Patel case study, and embedded speaker notes.
              </p>
            </div>
            <button
              onClick={handleDownloadPptx}
              disabled={isDownloading}
              className="mt-4 w-full py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-stone-950 font-bold text-xs cursor-pointer flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>{isDownloading ? 'Building PPTX...' : 'Download .pptx'}</span>
            </button>
          </div>

          {/* 2. Interactive Offline HTML */}
          <div className="bg-stone-800/80 rounded-2xl border border-stone-700 p-4 flex flex-col justify-between hover:border-emerald-400/60 transition-colors">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-base">
                HTML
              </div>
              <h3 className="font-bold text-sm text-white">Interactive Deck (.html)</h3>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Self-contained, portable offline slide show. Works in any browser without internet. Supports keyboard navigation (Arrow keys & Fullscreen).
              </p>
            </div>
            <button
              onClick={handleDownloadHtml}
              className="mt-4 w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs cursor-pointer flex items-center justify-center gap-2 transition-colors"
            >
              <FileCode className="w-4 h-4" />
              <span>Download .html</span>
            </button>
          </div>

          {/* 3. Printable PDF View */}
          <div className="bg-stone-800/80 rounded-2xl border border-stone-700 p-4 flex flex-col justify-between hover:border-blue-400/60 transition-colors">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-base">
                PDF
              </div>
              <h3 className="font-bold text-sm text-white">Print / Save as PDF</h3>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Opens the browser print dialog formatted as presentation slides. Choose "Save as PDF" to generate an official PDF handout for judges.
              </p>
            </div>
            <button
              onClick={handlePrintPdf}
              className="mt-4 w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs cursor-pointer flex items-center justify-center gap-2 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
          </div>

          {/* 4. Presentation Script Markdown */}
          <div className="bg-stone-800/80 rounded-2xl border border-stone-700 p-4 flex flex-col justify-between hover:border-stone-400/60 transition-colors">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-stone-700 text-stone-200 flex items-center justify-center font-bold text-base">
                DOC
              </div>
              <h3 className="font-bold text-sm text-white">Verbatim Script (.md)</h3>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Complete slide text transcript, verbatim speaking points, comparison calculations, and anticipated judge Q&A defense answers.
              </p>
            </div>
            <button
              onClick={handleDownloadMarkdown}
              className="mt-4 w-full py-2 px-3 rounded-xl bg-stone-700 hover:bg-stone-600 active:bg-stone-800 text-white font-bold text-xs cursor-pointer flex items-center justify-center gap-2 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Download .md</span>
            </button>
          </div>
        </div>

        {/* Source Code Download Note */}
        <div className="bg-stone-950/60 rounded-xl p-3 border border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Looking to download the source code?</strong> Use the Google AI Studio <strong>Settings &gt; Export to GitHub</strong> or <strong>Download ZIP</strong> to export the full project repository anytime.
            </span>
          </div>
        </div>
      </div>

      {/* Quick Launchpad to All 7 Interactive Screens */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Verify the Solution Live in the App
            </h3>
            <p className="text-[11px] text-stone-500">
              Every concept shown in this PPT is fully functional and interactive in Farmpulse:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => {
              setSelectedCropId('onion');
              setActiveTab('prices');
            }}
            className="p-2.5 rounded-xl bg-stone-50 hover:bg-emerald-50 text-left border border-stone-200 cursor-pointer transition-colors"
          >
            <div className="font-bold text-xs text-stone-900 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>1. Mandi Prices</span>
            </div>
            <div className="text-[10px] text-stone-500 mt-0.5">Net in-hand transport math</div>
          </button>

          <button
            onClick={() => {
              setSelectedCropId('onion');
              setActiveTab('ai-prediction');
            }}
            className="p-2.5 rounded-xl bg-stone-50 hover:bg-amber-50 text-left border border-stone-200 cursor-pointer transition-colors"
          >
            <div className="font-bold text-xs text-stone-900 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>2. AI Hold vs Sell</span>
            </div>
            <div className="text-[10px] text-stone-500 mt-0.5">14-day price curve & storage</div>
          </button>

          <button
            onClick={() => setActiveTab('marketplace')}
            className="p-2.5 rounded-xl bg-stone-50 hover:bg-teal-50 text-left border border-stone-200 cursor-pointer transition-colors"
          >
            <div className="font-bold text-xs text-stone-900 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-teal-600" />
              <span>3. Direct Buyers</span>
            </div>
            <div className="text-[10px] text-stone-500 mt-0.5">Sahyadri FPO & ITC deals</div>
          </button>

          <button
            onClick={() => setActiveTab('deals')}
            className="p-2.5 rounded-xl bg-stone-50 hover:bg-blue-50 text-left border border-stone-200 cursor-pointer transition-colors"
          >
            <div className="font-bold text-xs text-stone-900 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>4. Digital Escrow</span>
            </div>
            <div className="text-[10px] text-stone-500 mt-0.5">Instant DBT bank transfer</div>
          </button>
        </div>
      </div>
    </div>
  );
};
