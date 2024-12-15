'use client';

import { useUserLocation } from '@/lib/hooks/useUserLocation';
import { FeatureCollection } from 'geojson';
import mapboxgl, { SourceSpecification } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';
import { MapControlsLocation, MapControlsZoom } from './MapControls';
import { calculateBounds, getInitialPosition } from './map.utils';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';
export type OnMarketMouseEvent = mapboxgl.MapMouseEvent & mapboxgl.MapEvent;

export type Marker<Properties = Record<string, unknown>> = {
  id: string;
  longitude: number;
  latitude: number;
  properties?: Properties;
};

export type MapProps = {
  id: string;
  markers: Marker[];
  onMarkerClick?: (event: OnMarketMouseEvent) => void;
  onMarkerHover?: (event: OnMarketMouseEvent) => void;
  onMarkerLeave?: (event: OnMarketMouseEvent) => void;
};

export const Map = ({
  id,
  onMarkerClick,
  onMarkerHover,
  onMarkerLeave,
  markers,
}: MapProps) => {
  const { location } = useUserLocation();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const data: FeatureCollection = {
    type: 'FeatureCollection',
    features: markers.map(marker => ({
      type: 'Feature',
      properties: {
        id: marker.id,
        ...(marker.properties && { ...marker.properties }),
      },
      geometry: {
        type: 'Point',
        coordinates: [marker.longitude, marker.latitude],
      },
    })),
  };

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    map.current = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v11',
      container: mapRef.current,
      center: getInitialPosition(markers),
      zoom: markers.length > 0 ? 9 : 2,
      projection: {
        name: 'mercator',
        center: [0, 30],
        parallels: [30, 30],
      },
    });

    map.current.on('load', () => {
      // Add the initial source of markers
      const source: SourceSpecification = {
        type: 'geojson',
        data,
      };

      if (!map.current?.getSource(id)) {
        map.current?.addSource(id, source);
      }

      if (!map.current?.getLayer(id)) {
        map.current?.addLayer({
          id: id,
          type: 'circle',
          source: id,
          paint: {
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-color': 'hsla(19, 88%, 61%, 0.6)',
            'circle-stroke-color': 'hsla(19, 88%, 61%, 1)',
          },
        });
      }

      map.current?.on('mouseenter', id, () => {
        map.current?.getCanvas().style.setProperty('cursor', 'pointer');
      });
      map.current?.on('mouseleave', id, () => {
        map.current?.getCanvas().style.setProperty('cursor', '');
      });

      // Handle click events on the markers
      if (onMarkerClick) {
        map.current?.on('click', id, onMarkerClick);
      }
      // Handle hover events on the markers
      if (onMarkerHover) {
        map.current?.on('mouseenter', id, onMarkerHover);
      }
      if (onMarkerLeave) {
        map.current?.on('mouseleave', id, onMarkerLeave);
      }
    });

    // Use drag events to handle cursor changes
    map.current?.on('dragstart', () => {
      map.current?.getCanvas().style.setProperty('cursor', 'grabbing');
    });

    map.current?.on('dragend', () => {
      map.current?.getCanvas().style.setProperty('cursor', '');
    });

    return () => {
      map.current?.remove();
    };
  }, [location]);

  // Effect to update markers and ui when they change
  useEffect(() => {
    if (map.current) {
      const source = map.current.getSource(id) as mapboxgl.GeoJSONSource;

      if (source) {
        source.setData(data);
      }

      if (markers.length > 0 && map.current) {
        const bounds = calculateBounds(markers);

        if (bounds) {
          map.current.fitBounds(bounds, {
            padding: 20,
            essential: true,
            maxZoom: 10,
          });
        }
      }
    }
  }, [markers]);

  return (
    <div className="relative h-full w-full">
      <div ref={mapRef} className="h-full w-full"></div>
      <MapControlsZoom ref={map} />
      <MapControlsLocation ref={map} location={location} />
    </div>
  );
};

export default Map;
