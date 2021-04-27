import {Loan} from './loan';

export interface Database {
  // Create
  addLoan(loan: Loan): Promise<number>;
  // Read
  getAllLoans(): Promise<Loan[]>;
  getExpiringLoans(): Promise<Loan[]>;
  // Update
  updateLoan(loan: Loan): Promise<void>;
  // Delete
  deleteLoan(loan: Loan): Promise<void>;
}
