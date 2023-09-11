import {ExpenseData} from '../../types/ExpenseData';
import {StoreAction, StoreFunctions} from './base.actions';

export type ExpenseActionType =
  | 'EXPENSE_ADD_EXPENSE'
  | 'EXPENSE_ADDED'
  | 'EXPENSE_FETCH'
  | 'EXPENSE_FILTER'
  | 'EXPENSE_DELETE_EXPENSE'
  | 'EXPENSE_DELETED'
  | 'EXPENSE_UPDATE_EXPENSE'
  | 'EXPENSE_UPDATED'
  | 'EXPENSE_SET_EXPENSES'
  | 'EXPENSE_RESET_UPSERT_SUCCESS'
  | 'EXPENSE_SET_UPSERT_ERROR'
  | 'EXPENSE_RESET_UPSERT_ERROR';

export interface ExpenseAction extends StoreAction<ExpenseActionType> {}

function addExpense(expense: ExpenseData): ExpenseAction {
  return {
    type: 'EXPENSE_ADD_EXPENSE',
    payload: {
      expense,
    },
  };
}

function expenseAdded(expense: ExpenseData): ExpenseAction {
  return {
    type: 'EXPENSE_ADDED',
    payload: {
      expense,
    },
  };
}

function filterExpense(expense?: ExpenseData): ExpenseAction {
  return {
    type: 'EXPENSE_FILTER',
    payload: {
      expense,
    },
  };
}

function fetchExpenses(): ExpenseAction {
  return {
    type: 'EXPENSE_FETCH',
  };
}

function deleteExpense(expenseId: number): ExpenseAction {
  return {
    type: 'EXPENSE_DELETE_EXPENSE',
    payload: {
      expenseId,
    },
  };
}

function expenseDeleted(expenseId: number): ExpenseAction {
  return {
    type: 'EXPENSE_DELETED',
    payload: {
      expenseId,
    },
  };
}

function updateExpense(expense: ExpenseData): ExpenseAction {
  return {
    type: 'EXPENSE_UPDATE_EXPENSE',
    payload: {
      expense,
    },
  };
}

function expenseUpdated(expense: ExpenseData): ExpenseAction {
  return {
    type: 'EXPENSE_UPDATED',
    payload: {
      expense,
    },
  };
}

function setExpenses(expenses: ExpenseData[]): ExpenseAction {
  return {
    type: 'EXPENSE_SET_EXPENSES',
    payload: {
      expenses,
    },
  };
}

function resetUpsertSuccess(): ExpenseAction {
  return {
    type: 'EXPENSE_RESET_UPSERT_SUCCESS',
  };
}

function setUpsertError(error: string): ExpenseAction {
  return {
    type: 'EXPENSE_SET_UPSERT_ERROR',
    payload: {
      error,
    },
  };
}

function resetUpsertError(): ExpenseAction {
  return {
    type: 'EXPENSE_RESET_UPSERT_ERROR',
  };
}

interface IExpenseActions {
  addExpense: (expense: ExpenseData) => ExpenseAction;
  expenseAdded: (expense: ExpenseData) => ExpenseAction;
  filterExpense: (expense?: ExpenseData) => ExpenseAction;
  fetchExpenses: () => ExpenseAction;
  deleteExpense: (expenseId: number) => ExpenseAction;
  expenseDeleted: (expenseId: number) => ExpenseAction;
  updateExpense: (expense: ExpenseData) => ExpenseAction;
  expenseUpdated: (expense: ExpenseData) => ExpenseAction;
  setExpenses: (expenses: ExpenseData[]) => ExpenseAction;
  resetUpsertSuccess: () => ExpenseAction;
  setUpsertError: (error: string) => ExpenseAction;
  resetUpsertError: () => ExpenseAction;
}

export const expenseActions: StoreFunctions<ExpenseActionType> &
  IExpenseActions = {
  addExpense,
  fetchExpenses,
  filterExpense,
  expenseAdded,
  deleteExpense,
  expenseDeleted,
  updateExpense,
  expenseUpdated,
  setExpenses,
  resetUpsertSuccess,
  setUpsertError,
  resetUpsertError,
};
