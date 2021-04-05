import {ResultSet} from 'react-native-sqlite-storage';
import {Loan} from '../types/loan';
import {getDatabase} from './db';

const getResults = (results: ResultSet) => {
  if (results === undefined) {
    return [];
  }
  const count = results.rows.length;
  const loans: Loan[] = [];
  for (let i = 0; i < count; i++) {
    const row = results.rows.item(i);
    const {id, borrower} = row;
    console.log(`[db] Loan to: ${borrower}, id: ${id}`);
    loans.push({...row, expires: new Date(row.expires * 1000)} as Loan);
  }
  return loans;
};

export const getAllLoans = async (): Promise<Loan[]> => {
  console.log('[db] Fetching loans from the db...');
  return getDatabase()
    .then(db =>
      // Get all the loans, ordered by newest lists first
      db.executeSql('SELECT * FROM Loan ORDER BY id DESC;'),
    )
    .then(([results]) => getResults(results));
};

export const getExpiringLoans = async (): Promise<Loan[]> => {
  console.log('[db] Fetching expiring loans from the db... ');
  return getDatabase()
    .then(db =>
      db.executeSql('SELECT * FROM Loan WHERE NOT returned ORDER BY id'),
    )
    .then(([results]) => getResults(results));
};

export const addLoan = async (loan: Loan): Promise<void> => {
  const {borrower, expires, item, returned} = loan;
  return getDatabase()
    .then(db =>
      db.executeSql(
        'INSERT INTO Loan (borrower, item, expires, returned) VALUES (?, ?, ?, ?);',
        [borrower, item, expires.getTime() / 1000, returned],
      ),
    )
    .then(([results]) => {
      console.log(
        `[db] Loan "${borrower}" created successfully with id: ${results.insertId}`,
      );
    });
};

export const updateLoan = async (loan: Loan): Promise<void> => {
  return getDatabase()
    .then(db =>
      db.executeSql(
        'UPDATE Loan SET borrower = ?, item = ?, expires = ?, returned = ? WHERE id = ?;',
        [
          loan.borrower,
          loan.item,
          loan.expires.getTime() / 1000,
          loan.returned,
          loan.id,
        ],
      ),
    )
    .then(([results]) => {
      console.log(`[db] List item with id: ${loan.id} updated.`);
    });
};

export const deleteLoan = async (loan: Loan): Promise<void> => {
  const {id, borrower} = loan;
  console.log(`[db] Deleting Loan titled: "${borrower}" with id: ${id}`);
  return getDatabase()
    .then(db => db.executeSql('DELETE FROM Loan WHERE id = ?;', [id]))
    .then(() => {
      console.log(`[db] Deleted Loan: "${borrower}"!`);
    });
};
