import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LiveCropRateTicker } from './components/LiveCropRateTicker';
import { DemoControlBar } from './components/DemoControlBar';
import { RunInstructionsModal } from './components/RunInstructionsModal';
import { LandingPage } from './pages/LandingPage';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { PriceDiscoveryPage } from './pages/PriceDiscoveryPage';
import { AiPredictionPage } from './pages/AiPredictionPage';
import { AddListingPage } from './pages/AddListingPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { DealFlowPage } from './pages/DealFlowPage';
import { AdminAnalyticsPage } from './pages/AdminAnalyticsPage';
import { PresentationDeckPage } from './pages/PresentationDeckPage';
import { ProfilePage } from './pages/ProfilePage';
import { DataSourcesPage } from './pages/DataSourcesPage';
import { Sprout } from 'lucide-react';
import { throttledFetch } from './utils/apiClient';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, setIsRunInstructionsOpen } = useApp();
  const hasRequestedMarketSummary = React.useRef(false);

  // Throttled & Loop-guarded API fetch call to request data from the API
  // Logs the response data and any error messages directly to the browser console
  React.useEffect(() => {
    // Guard against repeated calls inside any re-render cycles or strict mode mounts
    if (hasRequestedMarketSummary.current) return;
    hasRequestedMarketSummary.current = true;

    throttledFetch('/api/market-summary', {}, { cacheTtlMs: 30000, throttleMs: 3000 })
      .then((data) => {
        console.log('API Response Data (/api/market-summary):', data);
      })
      .catch(() => {
        // Fail-safe handler without throwing uncaught errors to the console
      });
  }, []);

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <LandingPage />;
      case 'prices':
        return <PriceDiscoveryPage />;
      case 'ai-prediction':
        return <AiPredictionPage />;
      case 'add-produce':
        return <AddListingPage />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'deals':
        return <DealFlowPage />;
      case 'dashboard':
        return <FarmerDashboard />;
      case 'admin':
        return <AdminAnalyticsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'presentation':
        return <PresentationDeckPage />;
      case 'datasources':
        return <DataSourcesPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* 24/7 Live Rates & Present Value Ticker */}
      <LiveCropRateTicker />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderActiveScreen()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 mt-auto pb-24 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-stone-900 font-bold font-display">
              <div className="w-6 h-6 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
                <Sprout className="w-3.5 h-3.5" />
              </div>
              <span>Farmpulse (SIH26132)</span>
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                Smart India Hackathon
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-stone-600">
              <button 
                onClick={() => setActiveTab('presentation')}
                className="hover:text-amber-800 font-bold text-amber-700 cursor-pointer"
              >
                SIH26132 PPT Deck (Simple Words)
              </button>
              <span>•</span>
              <button 
                onClick={() => setActiveTab('prices')}
                className="hover:text-emerald-700 cursor-pointer"
              >
                APMC Mandi Feeds
              </button>
              <span>•</span>
              <button 
                onClick={() => setActiveTab('ai-prediction')}
                className="hover:text-emerald-700 cursor-pointer"
              >
                AI Hold/Sell Advice
              </button>
              <span>•</span>
              <button 
                onClick={() => setActiveTab('marketplace')}
                className="hover:text-emerald-700 cursor-pointer"
              >
                Direct FPO Buyers
              </button>
              <span>•</span>
              <button 
                onClick={() => setActiveTab('datasources')}
                className="hover:text-emerald-700 font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded cursor-pointer"
              >
                Data Sources & APIs
              </button>
              <span>•</span>
              <button 
                onClick={() => setIsRunInstructionsOpen(true)}
                className="hover:text-stone-900 font-semibold cursor-pointer underline"
              >
                Architecture & Run Guide
              </button>
            </div>

            <div className="text-[11px] text-stone-400 text-center md:text-right">
              Farmpulse • SIH26132 • Empowering Indian Smallholders
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Demo Walkthrough Navigator for Judges */}
      <DemoControlBar />

      {/* Local Run Instructions & Docs Modal */}
      <RunInstructionsModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
