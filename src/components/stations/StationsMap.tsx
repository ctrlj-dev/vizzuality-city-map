'use client';

import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { memo, useContext, useMemo, useRef } from 'react';
import { Map } from '../ui/Map';
import { OnMarketMouseEvent } from '../ui/Map/Map';
import { StationsStateContext } from './StationsContext';
import { getStationsMarkers } from './stations.utils';

const MemoizedMap = memo(Map);

const StationsMap = () => {
  const { stations } = useContext(StationsStateContext);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const markers = useMemo(
    () => getStationsMarkers(stations.stations),
    [stations.stations]
  );

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
    <MemoizedMap
      id={'stations'}
      markers={markers}
      onMarkerHover={handleOnMouseEnter}
      onMarkerLeave={handleOnMouseLeave}
    />
  );
};

export default StationsMap;
