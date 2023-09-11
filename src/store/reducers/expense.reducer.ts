import {ExpenseData} from '../../types/ExpenseData';
import {ExpenseAction} from '../actions/expense.actions';

export interface ExpenseState {
  expenses: ExpenseData[];
  upsertSuccess: boolean | null;
  upsertError: string | null;
}

const initialState: ExpenseState = {
  expenses: [],
  upsertSuccess: null,
  upsertError: null,
};

export function expenseReducer(
  state = initialState,
  action: ExpenseAction,
): ExpenseState {
  switch (action.type) {
    case 'EXPENSE_SET_EXPENSES':
      return {
        ...state,
        expenses: action.payload.expenses,
      };

    case 'EXPENSE_ADDED':
      const addExpenses = [...state.expenses];
      addExpenses.push(action.payload.expense);

      return {
        ...state,
        expenses: addExpenses,
      };

    case 'EXPENSE_DELETED':
      const deleteExpenses = state.expenses.filter(
        expense => expense.id !== action.payload.expenseId,
      );
      return {
        ...state,
        expenses: [...deleteExpenses],
      };

    case 'EXPENSE_UPDATED':
      const updateExpenses = [...state.expenses];

      const index = state.expenses.findIndex(
        expense => expense.id === action.payload.expense.id,
      );

      if (index !== -1) {
        updateExpenses[index] = action.payload.expense;
      }

      return {
        ...state,
        expenses: updateExpenses,
      };

    case 'EXPENSE_RESET_UPSERT_SUCCESS':
      return {
        ...state,
        upsertSuccess: null,
      };

    case 'EXPENSE_SET_UPSERT_ERROR':
      return {
        ...state,
        upsertError: action.payload.error,
      };

    case 'EXPENSE_RESET_UPSERT_ERROR':
      return {
        ...state,
        upsertError: null,
      };

    default:
      return state;
  }
}
