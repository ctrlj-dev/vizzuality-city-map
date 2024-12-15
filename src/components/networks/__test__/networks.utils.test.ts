import { Marker } from '@/components/ui/Map/Map';
import { Country, Network } from '@/lib/types/networks';
import {
  getNetworksMarkers,
  getVisibleCompanies,
  mapCountriesToOptions,
} from '../networks.utils';

describe('Utility Functions', () => {
  describe('getVisibleCompanies', () => {
    it('should return all companies if within maxChars limit', () => {
      const companies = ['Company A', 'Company B', 'Company C'];
      const maxChars = 50;
      const result = getVisibleCompanies(companies, maxChars);
      expect(result.visibleCompanies).toBe('Company A, Company B, Company C');
      expect(result.hiddenCount).toBe(0);
    });

    it('should truncate companies when exceeding maxChars', () => {
      const companies = ['Company A', 'Company B', 'Company C'];
      const maxChars = 20;
      const result = getVisibleCompanies(companies, maxChars);
      expect(result.visibleCompanies).toBe('Company A, Company B');
      expect(result.hiddenCount).toBe(1);
    });

    it('should return an empty string and zero hidden count for empty array', () => {
      const companies: string[] = [];
      const maxChars = 20;
      const result = getVisibleCompanies(companies, maxChars);
      expect(result.visibleCompanies).toBe(undefined);
      expect(result.hiddenCount).toBe(0);
    });
  });

  describe('getNetworksMarkers', () => {
    it('should convert networks to markers', () => {
      const networks: Network[] = [
        {
          id: '1',
          company: ['Test'],
          name: 'Test',
          location: {
            city: 'Madrid',
            country: 'Spain',
            longitude: 10,
            latitude: 20,
          },
        },
        {
          id: '2',
          company: ['Test'],
          name: 'Test',
          location: {
            city: 'Madrid',
            country: 'Spain',
            longitude: 30,
            latitude: 40,
          },
        },
      ];
      const result: Marker[] = getNetworksMarkers(networks);
      expect(result).toEqual([
        { id: '1', longitude: 10, latitude: 20 },
        { id: '2', longitude: 30, latitude: 40 },
      ]);
    });

    it('should return an empty array for empty networks array', () => {
      const networks: Network[] = [];
      const result = getNetworksMarkers(networks);
      expect(result).toEqual([]);
    });
  });

  describe('mapCountriesToOptions', () => {
    it('should map countries to options correctly', () => {
      const countries: Country[] = [
        { code: 'US', name: 'United States' },
        { code: 'CA', name: 'Canada' },
      ];
      const result = mapCountriesToOptions(countries);
      expect(result).toEqual([
        { value: 'US', label: 'United States' },
        { value: 'CA', label: 'Canada' },
      ]);
    });

    it('should return an empty array for empty countries array', () => {
      const countries: Country[] = [];
      const result = mapCountriesToOptions(countries);
      expect(result).toEqual([]);
    });

    it('should return an empty array for undefined countries', () => {
      const result = mapCountriesToOptions([]);
      expect(result).toEqual([]);
    });
  });
});
