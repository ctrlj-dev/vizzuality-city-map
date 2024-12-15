import { Station } from '@/lib/types';
import { Marker } from '../ui/Map/Map';

const STATIONS_PER_PAGE = 10;

const getStationsMarkers = (stations: Station[]): Marker[] => {
  return stations.map(station => {
    return {
      id: station.id,
      longitude: station.longitude,
      latitude: station.latitude,
      properties: {
        name: station.name,
        freeBikes: station.freeBikes,
        emptySlots: station.emptySlots,
      },
    };
  });
};

export { getStationsMarkers, STATIONS_PER_PAGE };
