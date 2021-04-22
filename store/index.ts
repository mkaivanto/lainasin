import {configureStore, PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

import {Loan} from '../types/loan';
import {Sort} from '../types/sort';

export const loanSlice = createSlice({
  name: 'loan',
  initialState: {
    loans: [] as Loan[],
  },
  reducers: {
    setLoan: (state, action: PayloadAction<Loan[]>) => {
      state.loans = action.payload;
    },
  },
});

export const sortSlice = createSlice({
  name: 'sort',
  initialState: {
    sort: {
      sortBy: 'id',
      direction: 'asc',
    } as Sort,
  },
  reducers: {
    setSort: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
    },
  },
});

export const {setLoan} = loanSlice.actions;
export const {setSort} = sortSlice.actions;
const store = configureStore({
  reducer: {
    loans: loanSlice.reducer,
    sort: sortSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
