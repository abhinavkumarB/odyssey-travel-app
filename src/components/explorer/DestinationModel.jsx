import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, Sparkles, CloudSun } from 'lucide-react';
import { useLocationContext } from '../../context/LocationContext';

export default function DestinationModel({ destination, isOpen, onClose, onPlanAI }) {
  const { setManualLocation } = useLocationContext();

  // Escape key listener for accessible dismissal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !destination) return null;

  const handleSetWeatherLocation = () => {
    setManualLocation({
      latitude: destination.latitude,
      longitude: destination.longitude,
      city: destination.name,
      country: destination.country,
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel border border-slate-700/80 rounded-3xl shadow-2xl z-10 flex flex-col"
        >
          {/* Close Icon */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Hero Banner */}
          <div className="relative h-72 sm:h-80 w-full shrink-0">
            <img
              src={destination.heroImage}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-odyssey-dark via-odyssey-dark/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  {destination.category}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
                  {destination.name}, <span className="text-slate-400 font-normal">{destination.country}</span>
                </h2>
                <p className="text-sm text-sky-200 mt-1">{destination.tagline}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSetWeatherLocation}
                  className="px-3.5 py-2 rounded-xl glass-panel text-xs font-medium text-slate-200 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-colors"
                  title="Update the top navigation weather widget to this city"
                >
                  <CloudSun className="w-4 h-4 text-sky-400" />
                  <span>Sync Weather</span>
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onPlanAI(destination);
                  }}
                  className="px-4 py-2 rounded-xl bg-sky-500 text-slate-950 text-xs font-semibold hover:bg-sky-400 flex items-center gap-1.5 transition-all shadow-lg shadow-sky-500/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate AI Itinerary</span>
                </button>
              </div>
            </div>
          </div>

          {/* Details & Notable Places */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Best Season</span>
                  <span className="text-slate-200 font-medium">{destination.bestTimeToVisit}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Ideal Stay</span>
                  <span className="text-slate-200 font-medium">{destination.idealDays} Days</span>
                </div>
              </div>

              <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Coordinates</span>
                  <span className="text-slate-200 font-medium font-mono text-[11px]">
                    {destination.latitude.toFixed(2)}°, {destination.longitude.toFixed(2)}°
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
                About the Destination
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {destination.description}
              </p>
            </div>

            {/* Notable Places Section */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
                Notable Places & Cultural Landmarks
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {destination.places.map((place) => (
                  <div
                    key={place.name}
                    className="rounded-xl overflow-hidden bg-slate-900/60 border border-slate-800 group/place flex flex-col"
                  >
                    <div className="h-32 w-full overflow-hidden relative">
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/place:scale-105"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-medium bg-black/70 text-slate-300 backdrop-blur-sm">
                        {place.type}
                      </span>
                    </div>
                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <h5 className="text-xs font-bold text-white mb-1">{place.name}</h5>
                      <p className="text-[11px] text-slate-400 leading-snug">{place.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}