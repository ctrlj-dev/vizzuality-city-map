import { Station } from '@/lib/types';
import { getStationsMarkers } from '../stations.utils';

describe('getStationsMarkers', () => {
  it('should convert stations to markers correctly', () => {
    const mockStations: Station[] = [
      {
        id: '1',
        name: 'Station A',
        freeBikes: 10,
        emptySlots: 5,
        latitude: 12.34,
        longitude: 56.78,
      },
      {
        id: '2',
        name: 'Station B',
        freeBikes: 3,
        emptySlots: 8,
        latitude: 23.45,
        longitude: 67.89,
      },
    ];

    const markers = getStationsMarkers(mockStations);

    expect(markers).toHaveLength(mockStations.length);
    expect(markers).toEqual([
      {
        id: '1',
        longitude: 56.78,
        latitude: 12.34,
        properties: {
          name: 'Station A',
          freeBikes: 10,
          emptySlots: 5,
        },
      },
      {
        id: '2',
        longitude: 67.89,
        latitude: 23.45,
        properties: {
          name: 'Station B',
          freeBikes: 3,
          emptySlots: 8,
        },
      },
    ]);
  });

  it('should return an empty array when no stations are provided', () => {
    const markers = getStationsMarkers([]);

    expect(markers).toHaveLength(0);
  });
});
