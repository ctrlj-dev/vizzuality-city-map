import { Station } from '@/lib/types';
import { Marker } from '../ui/Map/Map';

const STATIONS_PER_PAGE = 12;

const getStationsMarkers = (stations: Station[]): Marker[] => {
  return stations.map(station => {
    return {
      id: station.id,
      name: station.name,
      freeBikes: station.freeBikes,
      emptySlots: station.emptySlots,
      longitude: station.longitude,
      latitude: station.latitude,
    };
  });
};

export { getStationsMarkers, STATIONS_PER_PAGE };
