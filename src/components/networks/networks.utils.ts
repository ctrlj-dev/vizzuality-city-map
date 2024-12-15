import { Country, Network } from '@/lib/types/networks';
import { Option } from '@/lib/utils';
import { Marker } from '../ui/Map/Map';

const NETWORKS_PER_PAGE = 5;

const getVisibleCompanies = (companies: string[], maxChars: number) => {
  let visibleCompanies = companies[0];
  let hiddenCount = 0;

  companies.slice(1).forEach(company => {
    if (visibleCompanies.length + 2 + company.length <= maxChars) {
      visibleCompanies += `, ${company}`;
    } else {
      hiddenCount++;
    }
  });

  return { visibleCompanies, hiddenCount };
};

const getNetworksMarkers = (nerworks: Network[]): Marker[] => {
  return nerworks.map(network => {
    return {
      id: network.id,
      longitude: network.location.longitude,
      latitude: network.location.latitude,
    };
  });
};

const mapCountriesToOptions = (countries: Country[]): Option[] => {
  if (!countries || countries.length === 0) {
    return [];
  }

  return countries.map(country => ({
    value: country.code,
    label: country.name,
  }));
};

export {
  getNetworksMarkers,
  getVisibleCompanies,
  mapCountriesToOptions,
  NETWORKS_PER_PAGE,
};
