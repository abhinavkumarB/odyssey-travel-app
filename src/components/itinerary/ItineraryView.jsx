import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Compass, RefreshCw, MessageSquare, MapPin } from 'lucide-react';
import { generateItinerary } from '../../services/aiService';
import ActivityCard from './ActivityCard';
import AIChatDrawer from './AIChatDrawer';

const TRAVEL_STYLES = ['Balanced', 'Cultural', 'Culinary', 'Adventure'];

export default function ItineraryView({ destination }) {
  const [daysCount, setDaysCount] = useState(3);
  const [style, setStyle] = useState('Balanced');
  const [itinerary, setItinerary] = useState(null);
  const [activeDay, setActiveDay] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Trigger generation whenever the destination changes or user clicks regenerate
  const handleGenerate = async () => {
    if (!destination) return;
    setIsLoading(true);
    const result = await generateItinerary({
      destination,
      days: daysCount,
      travelStyle: style
    });
    setItinerary(result);
    setActiveDay(1);
    setIsLoading(false);
  };

  useEffect(() => {
    if (destination) {
      handleGenerate();
    }
  }, [destination]);

  if (!destination) return null;

  const currentDayPlan = itinerary?.days?.find((d) => d.dayNumber === activeDay);

  return (
    <section id="itinerary-section" className="py-16 px-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Travel Canvas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Day-by-Day Itinerary: {destination.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Structured multi-day schedule crafted dynamically for your stay.
          </p>
        </div>

        {/* Generator Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Duration Selector */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            {[2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => setDaysCount(num)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  daysCount === num
                    ? 'bg-sky-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {num} Days
              </button>
            ))}
          </div>

          {/* Style Selector */}
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-400"
          >
            {TRAVEL_STYLES.map((s) => (
              <option key={s} value={s}>{s} Style</option>
            ))}
          </select>

          {/* Regenerate Button */}
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5 border border-slate-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-sky-400' : ''}`} />
            <span>Regenerate</span>
          </button>

          {/* Chat Concierge Button */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="px-4 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Ask Concierge</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        /* Loading Skeleton */
        <div className="glass-panel rounded-3xl p-8 border border-slate-800 text-center flex flex-col items-center justify-center min-h-[350px]">
          <div className="w-12 h-12 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-4 animate-pulse">
            <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Designing Your Custom Journey</h3>
          <p className="text-xs text-slate-400 max-w-md mb-6">
            Analyzing local routes, landmark hours, and atmospheric pacing for {destination.name}...
          </p>
          <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-sky-400 rounded-full animate-[pulse_1.5s_infinite]" />
          </div>
        </div>
      ) : itinerary ? (
        /* Rendered Itinerary */
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800/80">
          {/* Summary Banner */}
          <div className="mb-8 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">
                Itinerary Theme
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">{itinerary.theme}</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-2xl">{itinerary.summary}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-700">
                {itinerary.totalDays} Total Days
              </span>
            </div>
          </div>

          {/* Day Selection Tabs */}
          <div className="flex items-center gap-2 mb-8 border-b border-slate-800 pb-4 overflow-x-auto scrollbar-none">
            {itinerary.days?.map((day) => (
              <button
                key={day.dayNumber}
                onClick={() => setActiveDay(day.dayNumber)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeDay === day.dayNumber
                    ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/20'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Day {day.dayNumber}</span>
              </button>
            ))}
          </div>

          {/* Active Day Details */}
          {currentDayPlan && (
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h4 className="text-xl font-bold text-white">{currentDayPlan.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{currentDayPlan.summary}</p>
              </div>

              {/* Vertical Stepper List */}
              <div className="mt-6 ml-2">
                {currentDayPlan.activities?.map((activity, idx) => (
                  <ActivityCard key={idx} activity={activity} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      ) : null}

      {/* AI Conversational Drawer */}
      <AIChatDrawer
        destination={destination}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </section>
  );
}