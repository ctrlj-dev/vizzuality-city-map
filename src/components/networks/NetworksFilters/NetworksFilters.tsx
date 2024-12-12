'use client';

import { Combobox } from '@/components/ui/Combobox';
import { Search } from '@/components/ui/Search';
import { countries } from '@/lib/data';
import { useRouter, useSearchParams } from 'next/navigation';
import { useContext, useState } from 'react';
import { NetworkAPIContext, NetworkStateContext } from '../NetworksContext';
import { mapCountriesToOptions } from './networks-filters.utils';

const COUNTRIES = mapCountriesToOptions(countries);

const NetworksFilters = () => {
  const { filters } = useContext(NetworkStateContext);
  const { handleSetFilters } = useContext(NetworkAPIContext);
  const router = useRouter();
  const params = useSearchParams();
  const [search, setSearch] = useState('');

  const handleFilterSelect = (country: string) => {
    const updateQueryParams = new URLSearchParams(params.toString());
    if (country) {
      updateQueryParams.set('country', country);
    } else {
      updateQueryParams.delete('country');
    }

    router.push(`${window.location.pathname}?${updateQueryParams.toString()}`);
    handleSetFilters({ ...filters, country });
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updateQueryParams = new URLSearchParams(params.toString());
    if (search) {
      updateQueryParams.set('search', search);
    } else {
      updateQueryParams.delete('search');
    }

    router.push(`${window.location.pathname}?${updateQueryParams.toString()}`);
    handleSetFilters({ ...filters, search });
  };

  return (
    <form className="h-12 flex gap-2 mt-4" onSubmit={handleOnSubmit}>
      <Search
        placeholder="Search network"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <Combobox
        onSelect={handleFilterSelect}
        label="Country"
        options={COUNTRIES}
        align="end"
      />
    </form>
  );
};

export default NetworksFilters;
