import React from 'react';
import { Clock, Tag, MapPin } from 'lucide-react';

const TAG_STYLES = {
  Culture: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  Culinary: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  Nature: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Adventure: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  Relaxation: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
};

const PERIOD_COLORS = {
  Morning: 'bg-amber-400',
  Afternoon: 'bg-sky-400',
  Evening: 'bg-indigo-400',
};

export default function ActivityCard({ activity }) {
  const tagStyle = TAG_STYLES[activity.tag] || 'bg-slate-800 text-slate-300 border-slate-700';
  const dotColor = PERIOD_COLORS[activity.period] || 'bg-sky-400';

  return (
    <div className="relative pl-6 pb-8 border-l border-slate-800 group last:pb-2 last:border-l-transparent">
      {/* Timeline Node Indicator */}
      <span className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${dotColor} ring-4 ring-odyssey-dark`} />

      {/* Card Body */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800/80 hover:border-sky-500/30 transition-all">
        {/* Time and Category Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white font-mono bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
              {activity.time}
            </span>
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              {activity.duration}
            </span>
          </div>

          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${tagStyle}`}>
            {activity.tag}
          </span>
        </div>

        {/* Place Title */}
        <h4 className="text-base font-bold text-white mb-1.5 flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
          <span>{activity.place}</span>
        </h4>

        {/* Description */}
        <p className="text-xs text-slate-300 leading-relaxed">
          {activity.description}
        </p>
      </div>
    </div>
  );
}