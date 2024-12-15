'use client';

import { paginatedElements } from '@/lib/utils';
import { useContext } from 'react';
import { NETWORKS_PER_PAGE } from '../networks.utils';
import { NetworkStateContext } from '../NetworksContext';
import NetworksListItem from './NetworksListItem';
import NetworksListPagination from './NetworksListPagination';
import NetworksListSkeleton from './NetworksListSkeleton';

const NetworksList = () => {
  const { networks, currentPage, loading } = useContext(NetworkStateContext);

  if (loading) {
    return <NetworksListSkeleton />;
  }

  if (!networks || networks.length === 0) {
    return <p className="mt-8 text-primary-800">No networks available...</p>;
  }

  const paginatedData = paginatedElements(
    networks,
    currentPage,
    NETWORKS_PER_PAGE
  );

  return (
    <div className="my-4">
      <div className="min-h-[110vh]  lg:min-h-[80vh]">
        {paginatedData.length > 0 &&
          paginatedData.map(network => (
            <NetworksListItem
              key={network.id}
              id={network.id}
              name={network.name}
              company={network.company}
              location={network.location}
            />
          ))}
      </div>
      <NetworksListPagination />
    </div>
  );
};

export default NetworksList;
