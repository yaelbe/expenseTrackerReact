import {combineReducers} from 'redux';
import {ExpenseState, expenseReducer} from './expense.reducer';
import {UserState, userReducer} from './user.reducer';

export interface RootState {
  expenses: ExpenseState;
  user: UserState;
}

// export const rootReducer = combineReducers<RootState>({
//   expenses: expenseReducer,
//   user: userReducer,
// });

export const rootReducer = {expenses: expenseReducer, user: userReducer};
