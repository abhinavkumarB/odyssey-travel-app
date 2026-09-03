import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Sparkles, ArrowUpRight } from 'lucide-react';

export default function DestinationCard({ destination, onSelect, onPlanAI }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl overflow-hidden glass-panel border border-slate-800/80 hover:border-sky-500/40 transition-colors flex flex-col justify-between"
    >
      {/* Visual Image Header */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-900">
        {/* Placeholder skeleton */}
        {!imgLoaded && (
          <div className="absolute inset-0 bg-slate-800 animate-pulse" />
        )}
        
        <img
          src={destination.heroImage}
          alt={destination.name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Gradient Scrim for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-odyssey-dark via-transparent to-black/30" />

        {/* Category & Rating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-odyssey-dark/80 backdrop-blur-md text-sky-400 border border-white/10">
            {destination.category}
          </span>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-odyssey-dark/80 backdrop-blur-md text-amber-400 border border-white/10">
            <Star className="w-3 h-3 fill-amber-400" />
            <span>{destination.rating}</span>
          </div>
        </div>

        {/* City & Country Label */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-1.5">
            {destination.name}
            <span className="text-sm font-normal text-slate-400">, {destination.country}</span>
          </h3>
          <p className="text-xs text-sky-300 font-medium line-clamp-1">{destination.tagline}</p>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {destination.description}
        </p>

        {/* Notable Places Pill Preview */}
        <div className="mb-4">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
            Iconic Landmarks
          </span>
          <div className="flex flex-wrap gap-1.5">
            {destination.places.map((place) => (
              <span
                key={place.name}
                className="px-2 py-0.5 rounded-md bg-slate-800/60 border border-slate-700/50 text-[10px] text-slate-300"
              >
                {place.name}
              </span>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
          <button
            onClick={() => onSelect(destination)}
            className="flex-1 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>View Details</span>
          </button>

          <button
            onClick={() => onPlanAI(destination)}
            className="px-3 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 text-xs font-medium transition-all flex items-center gap-1 active:scale-95"
            title="Generate AI itinerary for this location"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Plan</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}