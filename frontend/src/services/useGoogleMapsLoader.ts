import { useEffect, useState } from 'react';

export const useGoogleMapsLoader = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Use type assertion to fix window.google errors
    const win = window as any;
    
    if (win.google && win.google.maps) {
      setIsLoaded(true);
      return;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      setError('Google Maps API key is not configured');
      return;
    }

    const existingScript = document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`);
    if (existingScript) {
      const checkLoaded = setInterval(() => {
        if (win.google && win.google.maps) {
          setIsLoaded(true);
          clearInterval(checkLoaded);
        }
      }, 100);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,drawing,geometry`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setTimeout(() => {
        if (win.google && win.google.maps) {
          setIsLoaded(true);
        } else {
          setError('Google Maps loaded but not properly initialized');
        }
      }, 100);
    };

    script.onerror = () => {
      setError('Failed to load Google Maps API');
    };

    win.gm_authFailure = () => {
      setError('Google Maps API authentication failed');
    };

    document.head.appendChild(script);

    return () => {
      win.gm_authFailure = () => { };
    };
  }, []);

  return { isLoaded, error };
};