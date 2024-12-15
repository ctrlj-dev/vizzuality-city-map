// paginatedElements.test.ts

import { paginatedElements } from '../pagination';

describe('paginatedElements', () => {
  it('should return the correct elements for a given page', () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(paginatedElements(array, 1, 3)).toEqual([1, 2, 3]);
    expect(paginatedElements(array, 2, 3)).toEqual([4, 5, 6]);
    expect(paginatedElements(array, 3, 3)).toEqual([7, 8, 9]);
    expect(paginatedElements(array, 4, 3)).toEqual([10]);
  });

  it('should return an empty array for a page number that exceeds the total pages', () => {
    const array = [1, 2, 3];
    expect(paginatedElements(array, 2, 5)).toEqual([]);
    expect(paginatedElements(array, 4, 1)).toEqual([]);
  });

  it('should return an empty array for an empty input array', () => {
    const array: number[] = [];
    expect(paginatedElements(array, 1, 3)).toEqual([]);
  });

  it('should handle itemsPerPage less than or equal to zero', () => {
    const array = [1, 2, 3, 4, 5];
    expect(paginatedElements(array, 1, 0)).toEqual([]);
    expect(paginatedElements(array, 1, -1)).toEqual([]);
  });

  it('should handle invalid page numbers gracefully', () => {
    const array = [1, 2, 3, 4, 5];
    // Page number should be at least
    expect(paginatedElements(array, 0, 2)).toEqual([]);
    // Negative page number
    expect(paginatedElements(array, -1, 2)).toEqual([]);
  });
});
