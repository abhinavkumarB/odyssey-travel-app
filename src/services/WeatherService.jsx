/**
 * WMO Weather interpretation codes (WW)
 * Reference: https://open-meteo.com/en/docs
 */
export const WMO_CODE_MAP = {
  0: { label: 'Clear Sky', icon: 'Sun' },
  1: { label: 'Mainly Clear', icon: 'SunMedium' },
  2: { label: 'Partly Cloudy', icon: 'CloudSun' },
  3: { label: 'Overcast', icon: 'Cloud' },
  45: { label: 'Foggy', icon: 'CloudFog' },
  48: { label: 'Depositing Rime Fog', icon: 'CloudFog' },
  51: { label: 'Light Drizzle', icon: 'CloudDrizzle' },
  53: { label: 'Moderate Drizzle', icon: 'CloudDrizzle' },
  55: { label: 'Dense Drizzle', icon: 'CloudDrizzle' },
  61: { label: 'Slight Rain', icon: 'CloudRain' },
  63: { label: 'Moderate Rain', icon: 'CloudRain' },
  65: { label: 'Heavy Rain', icon: 'CloudRain' },
  71: { label: 'Slight Snow', icon: 'CloudSnow' },
  73: { label: 'Moderate Snow', icon: 'CloudSnow' },
  75: { label: 'Heavy Snow', icon: 'CloudSnow' },
  80: { label: 'Slight Showers', icon: 'CloudRain' },
  81: { label: 'Moderate Showers', icon: 'CloudRain' },
  82: { label: 'Violent Showers', icon: 'CloudRain' },
  95: { label: 'Thunderstorm', icon: 'CloudLightning' },
};

/**
 * Fetches real-time weather from Open-Meteo.
 * Zero API keys required, completely free and CORS-enabled.
 */
export async function fetchCurrentWeather(latitude, longitude, signal) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`;

  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Weather telemetry unavailable (${response.status})`);
  }

  const data = await response.json();
  const current = data.current;
  const weatherMeta = WMO_CODE_MAP[current.weather_code] || { label: 'Partly Cloudy', icon: 'CloudSun' };

  return {
    temperature: Math.round(current.temperature_2m),
    apparentTemperature: Math.round(current.apparent_temperature),
    humidity: current.relative_humidity_2m,
    windSpeed: Math.round(current.wind_speed_10m),
    isDay: Boolean(current.is_day),
    condition: weatherMeta.label,
    iconName: weatherMeta.icon,
  };
}

/**
 * Reverse geocoding to resolve coordinates into human-readable city/country names.
 * Uses Open-Meteo's geocoding endpoint.
 */
export async function reverseGeocode(latitude, longitude, signal) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    const res = await fetch(url, {
      signal,
      headers: { 'Accept-Language': 'en' }
    });
    if (!res.ok) return null;
    const json = await res.json();
    const city = json.address.city || json.address.town || json.address.village || json.address.state || 'Local Region';
    const country = json.address.country || '';
    return { city, country };
  } catch {
    return { city: 'Selected Region', country: '' };
  }
}