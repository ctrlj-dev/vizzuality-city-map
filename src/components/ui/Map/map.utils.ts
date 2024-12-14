import { LngLatBoundsLike } from 'mapbox-gl';
import { Marker } from './Map';

const calculateBounds = (markers: Marker[]): LngLatBoundsLike => {
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

export { calculateBounds };
