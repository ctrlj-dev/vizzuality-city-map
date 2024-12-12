import { Country, Network } from '@/lib/types/networks';
import { Option } from '@/lib/utils';

const filterNetworksBySearchQuery = (
  networks: Network[],
  query: string
): Network[] => {
  if (!query) {
    return networks;
  }

  const normalizedQuery = query.toLowerCase();
  return networks.filter(network => {
    return (
      network.name.toLowerCase().includes(normalizedQuery) ||
      network.company.some(comp => comp.toLowerCase().includes(normalizedQuery))
    );
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

export { filterNetworksBySearchQuery, mapCountriesToOptions };
