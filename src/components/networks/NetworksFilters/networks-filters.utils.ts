import { Country } from '@/lib/types/networks';
import { Option } from '@/lib/utils';

const mapCountriesToOptions = (countries: Country[]): Option[] => {
  if (!countries || countries.length === 0) {
    return [];
  }

  return countries.map(country => ({
    value: country.code,
    label: country.name,
  }));
};

export { mapCountriesToOptions };
