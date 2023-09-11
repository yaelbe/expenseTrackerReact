import {call, put, takeLatest} from 'redux-saga/effects';
import {ExpenseAction, ExpenseActionType, expenseActions} from '../actions';
import {expenseService} from '../../services/expense-service';
import {ExpenseData} from '../../types/ExpenseData';
import {useSelector} from 'react-redux';
import {RootState} from '../reducers/root.reducer';
import {store} from '../../store';

type ExpenseSagaHandler = (action: ExpenseAction) => void;

function* handleAddExpense(action: ExpenseAction) {
  try {
    const expense: ExpenseData = action.payload.expense;

    const userName: string | null = store.getState().user.userName;
    expense.user = userName!;

    const savedExpense: ExpenseData = yield call(
      expenseService.addExpenseToDatabase,
      expense,
    );

    yield put(expenseActions.expenseAdded(savedExpense));
  } catch (error: any) {
    yield put(expenseActions.setUpsertError(error));
  }
}

function* handleFetchExpenses(action: ExpenseAction) {
  try {
    const userName: string | null = store.getState().user.userName;
    const expenses: ExpenseData[] = yield call(
      expenseService.fetchExpensesFromDatabase,
      userName!,
    );
    yield put(expenseActions.setExpenses(expenses));
  } catch (error) {
    console.error('Error fetching expenses:', error);
  }
}

function* handleUpdateExpense(action: ExpenseAction) {
  try {
    const expense: ExpenseData = action.payload.expense;
    const savedExpense: ExpenseData = yield call(
      expenseService.updateExpenseInDatabase,
      expense,
    );
    yield put(expenseActions.expenseUpdated(savedExpense));
  } catch (error: any) {
    yield put(expenseActions.setUpsertError(error));
    console.error('Error updating expense to server:', error);
  }
}

function* handleFilterExpense(action: ExpenseAction) {
  try {
    const expense: ExpenseData = action.payload.expense;

    const userName: string | null = store.getState().user.userName;
    expense.user = userName!;

    const expenses: ExpenseData[] = yield call(
      expenseService.filterExpenseFromDatabase,
      expense,
    );
    yield put(expenseActions.setExpenses(expenses));
  } catch (error) {
    console.error('Error deleting expense from server:', error);
  }
}

function* handleDeleteExpense(action: ExpenseAction) {
  try {
    const expenseId: number = action.payload.expenseId;
    yield call(expenseService.removeExpenseFromDatabase, expenseId);
    yield put(expenseActions.expenseDeleted(expenseId));
  } catch (error) {
    console.error('Error deleting expense from server:', error);
  }
}

export function* rootExpenseSaga() {
  yield takeLatest<ExpenseActionType, ExpenseSagaHandler>(
    'EXPENSE_ADD_EXPENSE',
    handleAddExpense,
  );

  yield takeLatest<ExpenseActionType, ExpenseSagaHandler>(
    'EXPENSE_FETCH',
    handleFetchExpenses,
  );

  yield takeLatest<ExpenseActionType, ExpenseSagaHandler>(
    'EXPENSE_UPDATE_EXPENSE',
    handleUpdateExpense,
  );

  yield takeLatest<ExpenseActionType, ExpenseSagaHandler>(
    'EXPENSE_FILTER',
    handleFilterExpense,
  );

  yield takeLatest<ExpenseActionType, ExpenseSagaHandler>(
    'EXPENSE_DELETE_EXPENSE',
    handleDeleteExpense,
  );
}
