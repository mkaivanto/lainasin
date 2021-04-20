import {Loan} from '../types/loan';

export const sort = (loans: Loan[], direction: 'asc' | 'desc') =>
  [...loans].sort((a, b) => {
    return direction === 'asc' ? a.expires - b.expires : b.expires - a.expires;
  });
