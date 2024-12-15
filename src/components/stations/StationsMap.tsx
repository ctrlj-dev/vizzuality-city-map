'use client';
import { Station } from '@/lib/types';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { useRef } from 'react';
import { Map } from '../ui/Map';
import { OnMarketMouseEvent } from '../ui/Map/Map';
import { getStationsMarkers } from './stations.utils';

type StationsMapsProps = {
  stations: Station[];
};

const StationsMap = ({ stations }: StationsMapsProps) => {
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const markers = getStationsMarkers(stations);

  const handleOnMouseEnter = (e: OnMarketMouseEvent) => {
    if (!e.features) {
      return;
    }

    const coordinates: LngLatLike = e.lngLat;
    const name = e?.features[0]?.properties?.name || 'No data';
    const freeBikes = e?.features[0]?.properties?.freeBikes || 0;
    const empySlots = e?.features[0]?.properties?.emptySlots || 0;
    const description = `<div class="p-2"><h4 class="text-primary-800 text-base leading-7 mb-2">${name}</h4><ul><li>Free bikes <strong>${freeBikes}</strong></li><li>Empty slots <strong>${empySlots}</strong></ul</div>`;

    popupRef.current?.remove();
    popupRef.current = new mapboxgl.Popup({ offset: 5 })
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(e.target as mapboxgl.Map);
  };

  const handleOnMouseLeave = () => {
    popupRef.current?.remove();
    popupRef.current = null;
  };

  return (
    <Map
      id={'stations'}
      showNearmeControl={false}
      markers={markers}
      onMarkerHover={handleOnMouseEnter}
      onMarkerLeave={handleOnMouseLeave}
    />
  );
};

export default StationsMap;
