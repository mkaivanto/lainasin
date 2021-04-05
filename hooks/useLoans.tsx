import {useState, useEffect} from 'react';
import {Loan} from '../types/Loan';
import {useDatabase} from '../context/db';

// Hook for managing and accessing loans (CRUD)
const useLoans = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const database = useDatabase();

  useEffect(() => {
    refreshLoans();
  }, []);

  const refreshLoans = () => {
    // Query all lists from the DB, then store them as state
    return database.getAllLoans().then(v => setLoans(v));
  };

  const createLoan = (newLoan: Loan): Promise<void> => {
    return database.addLoan(newLoan).then(() => refreshLoans());
  };

  const deleteLoan = (loanToDelete: Loan): Promise<void> => {
    if (loanToDelete !== undefined) {
      return database.deleteLoan(loanToDelete).then(() => refreshLoans());
    }
    // otherwise:
    return Promise.reject(Error('Could not delete an undefined loan'));
  };

  const updateLoan = (loan: Loan): Promise<void> => {
    return database.updateLoan(loan).then(() => refreshLoans());
  };

  return {
    loans,
    createLoan,
    deleteLoan,
    updateLoan,
  };
};

export default useLoans;
