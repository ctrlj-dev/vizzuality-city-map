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

const getVisibleCompanies = (companies: string[], maxChars: number) => {
  let visibleCompanies = companies[0];
  let hiddenCount = 0;

  companies.slice(1).forEach(company => {
    if (visibleCompanies.length + 2 + company.length <= maxChars) {
      visibleCompanies += `, ${company}`;
    } else {
      hiddenCount++;
    }
  });

  return { visibleCompanies, hiddenCount };
};

export { getVisibleCompanies, ITEMS_PER_PAGE, paginatedNetworks };
