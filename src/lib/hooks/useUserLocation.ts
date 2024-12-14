'use client';

import { useEffect, useState } from 'react';

export const useUserLocation = () => {
  const defaultLocation: [number, number] = [0, 0];
  const [location, setLocation] = useState<[number, number]>(defaultLocation);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLocation(defaultLocation);
      return;
    }

    const successCallback = (position: GeolocationPosition) => {
      const { longitude, latitude } = position.coords;
      setLocation([longitude, latitude]);
    };

    const errorCallback = (err: GeolocationPositionError) => {
      setError(err.message);
      setLocation(defaultLocation);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  return { location, error };
};
