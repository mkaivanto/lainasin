import {configureStore, PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

import {Loan} from '../types/loan';

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

export const {setLoan} = loanSlice.actions;
const store = configureStore({
  reducer: {
    loans: loanSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
