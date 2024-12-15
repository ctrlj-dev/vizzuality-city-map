const paginatedElements = <T>(
  array: T[],
  pageNumber: number,
  itemsPerPage: number
): T[] => {
  // Ensure the page number is at least 1 and itemsPerPage is greater than 0
  if (pageNumber < 1 || itemsPerPage <= 0) {
    return [];
  }

  const totalPages = Math.ceil(array.length / itemsPerPage);

  // Return empty array if pageNumber exceeds totalPages
  if (pageNumber > totalPages) {
    return [];
  }

  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return array.slice(startIndex, endIndex);
};

export { paginatedElements };
