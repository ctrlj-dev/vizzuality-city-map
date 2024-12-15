const paginatedElements = <T>(
  array: T[],
  pageNumber: number,
  itemsPerPage: number
): T[] => {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return array.slice(startIndex, endIndex);
};

export { paginatedElements };
