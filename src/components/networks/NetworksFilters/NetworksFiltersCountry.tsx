import { Combobox } from '@/components/ui/Combobox';
import { countries } from '@/lib/data';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useContext } from 'react';
import { NetworkAPIContext, NetworkStateContext } from '../NetworksContext';
import { mapCountriesToOptions } from '../networks.utils';

const COUNTRIES = mapCountriesToOptions(countries);

const NetworksFiltersCountry = () => {
  const { filters } = useContext(NetworkStateContext);
  const { handleSetFilters } = useContext(NetworkAPIContext);
  const router = useRouter();
  const params = useSearchParams();
  const initialCountry = params.get('country') || undefined;

  const handleFilterSelect = useCallback((country: string) => {
    const updateQueryParams = new URLSearchParams(params.toString());
    if (country) {
      updateQueryParams.set('country', country);
    } else {
      updateQueryParams.delete('country');
    }

    router.push(`${window.location.pathname}?${updateQueryParams.toString()}`);
    handleSetFilters({ ...filters, country });
  }, []);

  return (
    <Combobox
      defaultValue={initialCountry}
      onSelect={handleFilterSelect}
      label="Country"
      options={COUNTRIES}
      align="end"
    />
  );
};

export default NetworksFiltersCountry;
