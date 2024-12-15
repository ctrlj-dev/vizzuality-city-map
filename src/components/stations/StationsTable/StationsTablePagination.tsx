import { Pagination } from '@/components/ui/Pagination';
import { useContext } from 'react';
import { StationsAPIContext, StationsStateContext } from '../StationsContext';
import { STATIONS_PER_PAGE } from '../stations.utils';

const StationsTablePagination = () => {
  const { stations, currentPage } = useContext(StationsStateContext);
  const { handleSetPage } = useContext(StationsAPIContext);

  const totalPages = Math.ceil(stations.length / STATIONS_PER_PAGE);

  const handlePreviousPage = () => {
    handleSetPage(Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    handleSetPage(Math.min(currentPage + 1, totalPages));
  };

  const handleNavigateToPage = (page: number) => {
    handleSetPage(Math.min(Math.max(page, 1), totalPages));
  };

  return (
    <Pagination
      theme="dark"
      className="mt-6 mb-16 md:mb-0"
      totalPages={totalPages}
      currentPage={currentPage}
      onPreviousPage={handlePreviousPage}
      onNextPage={handleNextPage}
      onNavigateToPage={handleNavigateToPage}
    />
  );
};

export default StationsTablePagination;
