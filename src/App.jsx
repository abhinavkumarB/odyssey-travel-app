import React, { useState } from 'react';
import { LocationProvider } from './context/LocationContext';
import VideoHero from './components/hero/VideoHero';
import WeatherWidget from './components/weather/WeatherWidget';
import DestinationExplorer from './components/explorer/DestinationExplorer';
import ItineraryView from './components/itinerary/ItineraryView';
import OfflineBanner from './components/common/OfflineBanner';
import { DESTINATIONS } from './data/DestinationsData';

export default function App() {
  const [selectedAIDestination, setSelectedAIDestination] = useState(DESTINATIONS[0]);

  const handleScrollToExplore = () => {
    const explorerSection = document.getElementById('explorer-section');
    if (explorerSection) {
      explorerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectDestinationForAI = (destination) => {
    setSelectedAIDestination(destination);
    const itinerarySection = document.getElementById('itinerary-section');
    if (itinerarySection) {
      itinerarySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LocationProvider>
      <OfflineBanner />
      <div className="min-h-screen bg-odyssey-dark text-slate-100 flex flex-col relative selection:bg-odyssey-accent selection:text-black">
        {/* Floating Top Header / Weather Bar */}
        <header className="absolute top-6 left-6 right-6 z-30 flex items-center justify-between max-w-7xl mx-auto pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            <span className="text-lg font-bold tracking-tight text-white">ODYSSEY</span>
            <span className="px-2 py-0.5 text-[10px] font-semibold bg-odyssey-accent/10 border border-odyssey-accent/20 text-odyssey-accent rounded-md">
              STUDIO
            </span>
          </div>
          
          <div className="pointer-events-auto">
            <WeatherWidget />
          </div>
        </header>

        {/* 1. Hero Section */}
        <VideoHero onExploreClick={handleScrollToExplore} />

        {/* 2. Destination Explorer */}
        <DestinationExplorer onSelectDestinationForAI={handleSelectDestinationForAI} />

        {/* 3. AI Travel Canvas & Itinerary */}
        <ItineraryView destination={selectedAIDestination} />

        {/* Footer */}
        <footer className="mt-auto py-10 border-t border-slate-800/80 text-center text-xs text-slate-500">
          <p>© 2026 Odyssey Studio • Built with React, Vite & Tailwind CSS</p>
        </footer>
      </div>
    </LocationProvider>
  );
}