import {Loan} from '../types/loan';

const sortFn = (a: number | string, b: number | string) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

export const sort = (
  loans: Loan[],
  sortBy: 'id' | 'expires' | 'item' | 'borrower',
  direction: 'asc' | 'desc',
) => {
  switch (sortBy) {
    case 'id':
      return [...loans].sort((a, b) => {
        return direction === 'asc'
          ? sortFn(a.id || -1, b.id || -1)
          : -sortFn(a.id || -1, b.id || -1);
      });
    case 'expires':
      return [...loans].sort((a, b) => {
        return direction === 'asc'
          ? sortFn(a.expires, b.expires)
          : -sortFn(a.expires, b.expires);
      });
    case 'item':
      return [...loans].sort((a, b) => {
        return direction === 'asc'
          ? sortFn(a.item, b.item)
          : -sortFn(a.item, b.item);
      });
    case 'borrower':
      return [...loans].sort((a, b) => {
        return direction === 'asc'
          ? sortFn(a.borrower, b.borrower)
          : -sortFn(a.borrower, b.borrower);
      });
  }
};
