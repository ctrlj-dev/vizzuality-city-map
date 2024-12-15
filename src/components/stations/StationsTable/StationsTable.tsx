'use client';

import { paginatedElements } from '@/lib/utils';
import { useContext } from 'react';
import { STATIONS_PER_PAGE } from '../stations.utils';
import { StationsStateContext } from '../StationsContext';
import StationsTableHeader from './StationsTableHeader';
import StationsTablePagination from './StationsTablePagination';

export const StationsTable = () => {
  const { stations, currentPage, sortBy, isAscending } =
    useContext(StationsStateContext);

  const paginatedData = paginatedElements(
    stations,
    currentPage,
    STATIONS_PER_PAGE
  );

  const sortedStations = [...paginatedData].sort((a, b) => {
    if (!sortBy) return 0;
    const comparison = a[sortBy] - b[sortBy];
    return isAscending ? comparison : -comparison;
  });

  return (
    <div className="bg-primary-800 text-white px-4 md:px-10 pb-5">
      <p tabIndex={0} className="mt-2 mb-4">
        All
        <span className="mx-2 border px-3 py-0 border-secondary-400 text-secondary-400">
          {stations.length}
        </span>
        stations
      </p>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <StationsTableHeader />
          <tbody>
            {sortedStations.map(station => (
              <tr key={station.id}>
                <td
                  tabIndex={0}
                  className="px-4 py-6 border-b border-dotted border-opacity-50 border-white"
                >
                  {station.name}
                </td>
                <td
                  tabIndex={0}
                  className="px-4 py-6 border-b border-dotted border-opacity-50 border-white text-center font-bold"
                >
                  {station.freeBikes}
                </td>
                <td
                  tabIndex={0}
                  className="px-4 py-6 border-b border-dotted border-opacity-50 border-white text-center font-bold"
                >
                  {station.emptySlots}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <StationsTablePagination />
    </div>
  );
};

export default StationsTable;
