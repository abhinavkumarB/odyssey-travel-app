import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Compass } from 'lucide-react';
import { DESTINATIONS, CATEGORIES } from '../../data/DestinationsData';
import DestinationCard from './DestinationCard';
import DestinationModel from './DestinationModel';
import { useDebounce } from '../../hooks/useDebounce';

export default function DestinationExplorer({ onSelectDestinationForAI }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalDest, setActiveModalDest] = useState(null);

  // Debounce the search input to maintain 60fps responsiveness
  const debouncedSearch = useDebounce(searchTerm, 200);

  // Filter destinations based on category and search query
  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((dest) => {
      const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
      const matchesSearch =
        dest.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        dest.country.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        dest.tagline.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [debouncedSearch, selectedCategory]);

  return (
    <section id="explorer-section" className="py-16 px-6 max-w-7xl mx-auto w-full">
      {/* Header Title & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-xs font-semibold text-sky-400 uppercase tracking-widest block mb-2">
            Curated Discovery
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Explore Global Destinations
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md">
          Filter by travel style or search across iconic cities, historic districts, and natural wonders.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-10">
        {/* Search Input */}
        <div className="relative w-full lg:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Tokyo, Amalfi, Paris..."
            className="w-full pl-11 pr-4 py-3 rounded-xl glass-panel border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-1.5 py-0.5"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                  : 'glass-panel text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Destination Cards */}
      {filteredDestinations.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onSelect={(dest) => setActiveModalDest(dest)}
                onPlanAI={(dest) => onSelectDestinationForAI(dest)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty Search State */
        <div className="py-20 flex flex-col items-center justify-center text-center glass-panel rounded-3xl border border-slate-800/80 p-8">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 mb-4">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-1">No destinations found</h3>
          <p className="text-xs text-slate-400 max-w-sm mb-6">
            We couldn't find any destinations matching "{searchTerm}". Try checking your spelling or clearing filters.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-200 hover:text-white transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Destination Modal Detail */}
      <DestinationModel
        destination={activeModalDest}
        isOpen={Boolean(activeModalDest)}
        onClose={() => setActiveModalDest(null)}
        onPlanAI={(dest) => onSelectDestinationForAI(dest)}
      />
    </section>
  );
}