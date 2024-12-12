import { Pagination } from '@/components/ui/Pagination';
import { useContext } from 'react';
import { NetworkAPIContext, NetworkStateContext } from './NetworksContext';
import { ITEMS_PER_PAGE } from './networks.utils';

const NetworksPagination = () => {
  const { networks, currentPage } = useContext(NetworkStateContext);
  const { handleSetPage } = useContext(NetworkAPIContext);

  const totalPages = Math.ceil(networks.length / ITEMS_PER_PAGE);

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
      className="mt-6"
      totalPages={totalPages}
      currentPage={currentPage}
      onPreviousPage={handlePreviousPage}
      onNextPage={handleNextPage}
      onNavigateToPage={handleNavigateToPage}
    />
  );
};

export default NetworksPagination;
