import React from 'react';
import { useLocationContext } from '../../context/LocationContext';
import { useWeather } from '../../hooks/useWeather';
import { 
  Sun, SunMedium, CloudSun, Cloud, CloudFog, 
  CloudDrizzle, CloudRain, CloudSnow, CloudLightning, 
  MapPin, RefreshCw, AlertCircle 
} from 'lucide-react';

const ICON_COMPONENTS = {
  Sun,
  SunMedium,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
};

export default function WeatherWidget() {
  const { location, errorMsg, requestCoordinates } = useLocationContext();
  const { data: weather, loading, error } = useWeather(location.latitude, location.longitude);

  const IconComponent = weather?.iconName && ICON_COMPONENTS[weather.iconName] 
    ? ICON_COMPONENTS[weather.iconName] 
    : CloudSun;

  return (
    <div className="glass-panel px-4 py-2.5 rounded-2xl flex items-center gap-3.5 shadow-xl border border-white/10 text-xs">
      {/* Location Badge */}
      <div className="flex items-center gap-1.5 text-slate-300 font-medium">
        <MapPin className="w-3.5 h-3.5 text-odyssey-accent" />
        <span>{location.city}</span>
        {location.status === 'denied' && (
          <span 
            title={errorMsg || "Location access denied; showing fallback"}
            className="w-2 h-2 rounded-full bg-amber-400 cursor-help" 
          />
        )}
      </div>

      <div className="h-4 w-[1px] bg-slate-700/60" />

      {/* Weather State */}
      {loading ? (
        <div className="flex items-center gap-2 text-odyssey-muted animate-pulse">
          <RefreshCw className="w-3 h-3 animate-spin" />
          <span>Syncing weather...</span>
        </div>
      ) : error ? (
        <div className="flex items-center gap-1.5 text-rose-400">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Weather offline</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <IconComponent className="w-4 h-4 text-sky-400" />
          <span className="font-semibold text-white text-sm">
            {weather.temperature}°C
          </span>
          <span className="text-odyssey-muted hidden sm:inline">
            • {weather.condition}
          </span>
        </div>
      )}

      {/* Manual Refresh / Re-detect button */}
      {location.status === 'denied' && (
        <button
          onClick={requestCoordinates}
          title="Grant location permission"
          className="ml-1 text-[10px] text-odyssey-accent hover:underline"
        >
          Enable GPS
        </button>
      )}
    </div>
  );
}