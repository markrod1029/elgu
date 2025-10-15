// hooks/useGoogleMapsLoader.ts
import { useEffect, useState } from 'react';

let googleMapsLoading = false;
let googleMapsLoaded = false;
let googleMapsError: string | null = null;
const listeners: Array<(loaded: boolean, error: string | null) => void> = [];

const loadGoogleMaps = () => {
  if (googleMapsLoaded || googleMapsLoading) return;

  googleMapsLoading = true;
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    googleMapsError = 'Google Maps API key is missing.';
    googleMapsLoading = false;
    listeners.forEach(listener => listener(false, googleMapsError));
    return;
  }

  const existingScript = document.querySelector<HTMLScriptElement>(
    `script[src^="https://maps.googleapis.com/maps/api/js"]`
  );

  // Prevent duplicate script injection
  if (existingScript) {
    googleMapsLoading = false;
    googleMapsLoaded = true;
    listeners.forEach(listener => listener(true, null));
    return;
  }

  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,drawing,geometry`;
  script.async = true;
  script.defer = true;

  script.onload = () => {
    if (window.google && window.google.maps) {
      googleMapsLoaded = true;
      googleMapsError = null;
    } else {
      googleMapsError = 'Google Maps loaded but did not initialize properly.';
    }
    googleMapsLoading = false;
    listeners.forEach(listener => listener(googleMapsLoaded, googleMapsError));
  };

  script.onerror = () => {
    googleMapsError = 'Failed to load Google Maps API.';
    googleMapsLoading = false;
    listeners.forEach(listener => listener(false, googleMapsError));
  };

  // Handle API auth failure (invalid key or restricted domain)
  (window as any).gm_authFailure = () => {
    googleMapsError = 'Google Maps API authentication failed.';
    googleMapsLoading = false;
    listeners.forEach(listener => listener(false, googleMapsError));
  };

  document.head.appendChild(script);
};

export const useGoogleMapsLoader = () => {
  const [isLoaded, setIsLoaded] = useState(googleMapsLoaded);
  const [error, setError] = useState<string | null>(googleMapsError);

  useEffect(() => {
    const listener = (loaded: boolean, errorMsg: string | null) => {
      setIsLoaded(loaded);
      setError(errorMsg);
    };

    listeners.push(listener);

    // Load script if not yet loaded or loading
    if (!googleMapsLoaded && !googleMapsLoading) {
      loadGoogleMaps();
    }

    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  return { isLoaded, error };
};
