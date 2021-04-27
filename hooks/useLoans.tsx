import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setLoan} from '../store';
import {Loan} from '../types/Loan';
import {useDatabase} from '../context/db';

// Hook for managing and accessing loans (CRUD)
const useLoans = () => {
  const dispatch = useDispatch();
  const database = useDatabase();

  useEffect(() => {
    refreshLoans();
  }, []);

  const refreshLoans = (): Promise<void> => {
    // Query all loans from the DB, then store them to state
    return database.getAllLoans().then(v => {
      dispatch(setLoan(v));
    });
  };

  const createLoan = (newLoan: Loan): Promise<number> => {
    return database.addLoan(newLoan).then((loanId: number) => {
      refreshLoans();
      return loanId;
    });
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
    createLoan,
    deleteLoan,
    updateLoan,
  };
};

export default useLoans;
