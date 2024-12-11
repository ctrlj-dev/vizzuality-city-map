import { Combobox } from '@/components/ui/Combobox';
import { countries } from '@/lib/data';
import { mapCountriesToOptions } from './networks.utils';

const COUNTRIES = mapCountriesToOptions(countries);

const NetworksCountrySelector = () => {
  return <Combobox label="Country" options={COUNTRIES} align="end" />;
};

export default NetworksCountrySelector;
