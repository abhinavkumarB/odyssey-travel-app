import { useState, useEffect } from 'react';
import { fetchCurrentWeather } from '../services/WeatherService';

export function useWeather(latitude, longitude) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (latitude == null || longitude == null) return;

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchCurrentWeather(latitude, longitude, controller.signal)
      .then((weather) => {
        setData(weather);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Unable to load weather');
        setLoading(false);
      });

    return () => controller.abort();
  }, [latitude, longitude]);

  return { data, loading, error };
}