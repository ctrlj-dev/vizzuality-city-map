'use client';

import { Search } from '@/components/ui/Search';
import { useRouter, useSearchParams } from 'next/navigation';
import { memo, useContext, useState } from 'react';
import { NetworkAPIContext, NetworkStateContext } from '../NetworksContext';
import NetworksFiltersCountry from './NetworksFiltersCountry';

const MemoizedNetworksFiltersCountry = memo(NetworksFiltersCountry);

const NetworksFilters = () => {
  const { filters } = useContext(NetworkStateContext);
  const { handleSetFilters } = useContext(NetworkAPIContext);
  const router = useRouter();
  const params = useSearchParams();
  const initialSearch = params.get('search') || '';
  const [search, setSearch] = useState(initialSearch);

  const handleClearSearch = () => {
    setSearch('');
    const updateQueryParams = new URLSearchParams(params.toString());
    updateQueryParams.delete('search');

    router.push(`${window.location.pathname}?${updateQueryParams.toString()}`);
    handleSetFilters({ ...filters, search: '' });
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
        onClear={handleClearSearch}
      />
      <MemoizedNetworksFiltersCountry />
    </form>
  );
};

export default NetworksFilters;
