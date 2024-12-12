import { Network } from '@/lib/types/networks';

const ITEMS_PER_PAGE = 10;

const paginatedNetworks = (
  networks: Network[],
  pageNumber: number,
  itemsPerPage: number
): Network[] => {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return networks.slice(startIndex, endIndex);
};

export { paginatedNetworks, ITEMS_PER_PAGE };
