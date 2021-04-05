import React, {useContext} from 'react';
import sqliteDatabase from '../utils/db';
import {Database} from '../types/db';

const DatabaseContext = React.createContext<Database | undefined>(undefined);

export const DatabaseProvider: React.FunctionComponent = function (props) {
  return <DatabaseContext.Provider value={sqliteDatabase} {...props} />;
};

// Hook to pull our database object from the context and return it.
// Inspired by the Kent C. Dodds approach to using context: https://kentcdodds.com/blog/how-to-use-react-context-effectively
export function useDatabase(): Database {
  const database = useContext(DatabaseContext);
  if (database === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return database;
}
