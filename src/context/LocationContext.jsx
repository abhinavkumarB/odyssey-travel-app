import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { reverseGeocode } from '../services/WeatherService';

const LocationContext = createContext(null);

// Default fallback location when geolocation is denied or unavailable (Tokyo)
const DEFAULT_LOCATION = {
  latitude: 35.6762,
  longitude: 139.6503,
  city: 'Tokyo',
  country: 'Japan',
  status: 'fallback', // 'idle' | 'detecting' | 'granted' | 'denied' | 'manual' | 'fallback'
};

export function LocationProvider({ children }) {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [errorMsg, setErrorMsg] = useState(null);

  const requestCoordinates = useCallback(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({ ...prev, status: 'denied' }));
      setErrorMsg('Geolocation is not supported by your browser.');
      return;
    }

    setLocation(prev => ({ ...prev, status: 'detecting' }));
    setErrorMsg(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const place = await reverseGeocode(latitude, longitude);
        setLocation({
          latitude,
          longitude,
          city: place?.city || 'Your Location',
          country: place?.country || '',
          status: 'granted',
        });
      },
      (error) => {
        let message = 'Location access denied. Displaying featured destination.';
        if (error.code === error.TIMEOUT) message = 'Location request timed out.';
        
        setErrorMsg(message);
        setLocation({
          ...DEFAULT_LOCATION,
          status: 'denied',
        });
      },
      { timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  // Set manual coordinates from explorer or search
  const setManualLocation = useCallback((locData) => {
    setLocation({
      latitude: locData.latitude,
      longitude: locData.longitude,
      city: locData.city,
      country: locData.country || '',
      status: 'manual',
    });
    setErrorMsg(null);
  }, []);

  useEffect(() => {
    requestCoordinates();
  }, [requestCoordinates]);

  return (
    <LocationContext.Provider value={{ location, errorMsg, requestCoordinates, setManualLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
}