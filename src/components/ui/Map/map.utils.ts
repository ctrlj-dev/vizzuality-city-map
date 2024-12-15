import { LngLatBoundsLike } from 'mapbox-gl';
import { Marker } from './Map';

const calculateBounds = (markers: Marker[]): LngLatBoundsLike => {
  // Default global range
  if (markers.length === 0) {
    return [
      [-180, -90],
      [180, 90],
    ];
  }
  let minLng = markers[0].longitude;
  let maxLng = markers[0].longitude;
  let minLat = markers[0].latitude;
  let maxLat = markers[0].latitude;

  markers.forEach(marker => {
    minLng = Math.min(minLng, marker.longitude);
    maxLng = Math.max(maxLng, marker.longitude);
    minLat = Math.min(minLat, marker.latitude);
    maxLat = Math.max(maxLat, marker.latitude);
  });

  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ];
};

const getInitialPosition = (markers: Marker[]): [number, number] => {
  // Default global range
  if (markers.length === 0) {
    return [0, 0];
  }
  const latitudes = markers.map(marker => marker.latitude);
  const longitudes = markers.map(marker => marker.longitude);

  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLng = Math.min(...longitudes);
  const maxLng = Math.max(...longitudes);

  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;

  return [centerLng, centerLat];
};

export { calculateBounds, getInitialPosition };
