'use client';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

export const Map = ({}) => {
  const mapRef = useRef(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapRef.current!,
      center: [-71.363, 44.475],
      zoom: 2,
      projection: {
        name: 'mercator',
        center: [0, 30],
        parallels: [30, 30],
      },
    });

    map.current?.on('load', function () {});

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="relative">
      <div ref={mapRef} className="absolute top-0 bottom-0 w-full"></div>
    </div>
  );
};

export default Map;
