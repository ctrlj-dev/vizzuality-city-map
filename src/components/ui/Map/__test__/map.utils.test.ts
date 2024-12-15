import { Marker } from '../Map';
import { calculateBounds, getInitialPosition } from '../map.utils';

describe('Map Utility Functions', () => {
  describe('calculateBounds', () => {
    it('returns default bounds when no markers are provided', () => {
      const result = calculateBounds([]);
      expect(result).toEqual([
        [-180, -90],
        [180, 90],
      ]);
    });

    it('calculates bounds for a single marker', () => {
      const markers: Marker[] = [{ id: '1', latitude: 10, longitude: 20 }];
      const result = calculateBounds(markers);
      expect(result).toEqual([
        [20, 10],
        [20, 10],
      ]);
    });

    it('calculates bounds for multiple markers', () => {
      const markers: Marker[] = [
        { id: '1', latitude: 10, longitude: 20 },
        { id: '2', latitude: 15, longitude: 25 },
        { id: '3', latitude: 5, longitude: 15 },
      ];
      const result = calculateBounds(markers);
      expect(result).toEqual([
        [15, 5],
        [25, 15],
      ]);
    });
  });

  describe('getInitialPosition', () => {
    it('returns default position when no markers are provided', () => {
      const result = getInitialPosition([]);
      expect(result).toEqual([0, 0]);
    });

    it('calculates initial position for a single marker', () => {
      const markers: Marker[] = [{ id: '1', latitude: 10, longitude: 20 }];
      const result = getInitialPosition(markers);
      expect(result).toEqual([20, 10]);
    });

    it('calculates initial position for multiple markers', () => {
      const markers: Marker[] = [
        { id: '1', latitude: 10, longitude: 20 },
        { id: '2', latitude: 15, longitude: 25 },
        { id: '3', latitude: 5, longitude: 15 },
      ];
      const result = getInitialPosition(markers);
      expect(result).toEqual([20, 10]);
    });
  });
});
