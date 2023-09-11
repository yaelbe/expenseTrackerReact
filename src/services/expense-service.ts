import {Alert} from 'react-native';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {ExpenseData} from '../types/ExpenseData';
import {openDatabase} from '../database';
import {useSelector} from 'react-redux';
import {RootState} from '../store';

// Fetch expenses from the database
const fetchExpensesFromDatabase = async (userName: string) => {
  return new Promise<ExpenseData[]>(async (resolve, reject) => {
    const db = await openDatabase();
    try {
      db.transaction(
        tx => {
          tx.executeSql(
            'SELECT * FROM expenses WHERE user = ? ORDER BY date DESC',
            [userName],
            (_, results) => {
              const expenses: ExpenseData[] = [];
              for (let i = 0; i < results.rows.length; i++) {
                const row = results.rows.item(i);
                expenses.push(row);
              }
              resolve(expenses); // Resolve with the fetched expenses
            },
            (_, error) => {
              console.error('Error fetching expenses:', error);
              reject(error); // Reject with the error if there's a problem
            },
          );
        },
        error => {
          console.error('Error opening database transaction:', error);
          reject(error); // Reject with the error if there's a problem
        },
      );
    } catch (error) {
      console.error('Error fetching expenses:', error);
      reject(error); // Reject with the error if there's a problem
    }
  });
};

// Add an expense to the database
const addExpenseToDatabase = async (expense: ExpenseData) => {
  return new Promise<ExpenseData>(async (resolve, reject) => {
    const {name, amount, date, user} = expense;
    const db = await openDatabase();

    db.transaction(
      tx => {
        tx.executeSql(
          'INSERT INTO expenses (name, amount, date, user) VALUES (?, ?, ?, ?)',
          [name, amount, date, user],
          (_, results) => {
            const insertedId = results.insertId;
            const savedExpense: ExpenseData = {
              id: insertedId,
              name,
              amount,
              date,
              user,
            };
            resolve(savedExpense);
            //return savedExpense; // Resolve with the saved expense
          },
          (_, error) => {
            console.error('Error adding expense:', error);
            return error; // Reject with the error if there's a problem
          },
        );
      },
      error => {
        console.error('Error opening database transaction:', error);
        reject(error); // Reject with the error if there's a problem
      },
    );
  });
};

// Update an expense in the database

const updateExpenseInDatabase = async (expense: ExpenseData) => {
  return new Promise<ExpenseData>(async (resolve, reject) => {
    const {id, name, amount, date, user} = expense;
    const db = await openDatabase();

    db.transaction(
      tx => {
        tx.executeSql(
          'UPDATE expenses SET name = ?, amount = ?, date = ? WHERE id = ? user = ?',
          [name, amount, date, id, user],
          (_, results) => {
            const rowsAffected = results.rowsAffected;
            if (rowsAffected > 0) {
              // The update was successful, so resolve with the updated expense
              resolve(expense);
            } else {
              // No rows were affected, so reject with an error message
              reject(new Error('Expense not found'));
            }
          },
          (_, error) => {
            console.error('Error updating expense:', error);
            reject(error);
          },
        );
      },
      error => {
        console.error('Error opening database transaction:', error);
        reject(error);
      },
    );
  });
};

// Remove an expense from the database
const removeExpenseFromDatabase = async (expenseId: number) => {
  return new Promise<void>(async (resolve, reject) => {
    const db = await openDatabase();
    db.transaction(
      tx => {
        tx.executeSql(
          'DELETE FROM expenses WHERE id = ?',
          [expenseId],
          (_, results) => {
            const rowsAffected = results.rowsAffected;
            if (rowsAffected > 0) {
              resolve(); // Resolve when the transaction is successful
            } else {
              Alert.alert('Error', 'Expense not found');
              reject('Expense not found'); // Reject with an error message
            }
          },
          (_, error) => {
            console.error('Error deleting expense:', error);
            reject(error); // Reject with the error if there's a problem
          },
        );
      },
      error => {
        console.error('Error opening database transaction:', error);
        reject(error); // Reject with the error if there's a problem
      },
    );
  });
};

const filterExpenseFromDatabase = async (expense: ExpenseData) => {
  return new Promise<ExpenseData[]>(async (resolve, reject) => {
    try {
      const db = await openDatabase();

      const {name, amount, date, user} = expense;
      const nameFilter = name.trim() === '' ? null : name + '%';
      const amountFilter = isNaN(amount) || amount === 0 ? null : amount;
      const dateFilter = date.trim() === '' ? null : date;
      const userFilter = user;

      db.transaction(
        tx => {
          tx.executeSql(
            'SELECT * FROM expenses WHERE (name LIKE ? OR amount = ? OR date = ?) AND user = ? ORDER BY date DESC',
            [nameFilter, amountFilter, dateFilter, userFilter],
            (_, results) => {
              const expenses: ExpenseData[] = [];
              for (let i = 0; i < results.rows.length; i++) {
                const row = results.rows.item(i);
                expenses.push(row);
              }
              resolve(expenses); // Resolve with the filtered expenses
            },
            (_, error) => {
              console.error('Error fetching expenses:', error);
              reject(error); // Reject with the error if there's a problem
            },
          );
        },
        error => {
          console.error('Error opening database transaction:', error);
          reject(error); // Reject with the error if there's a problem
        },
      );
    } catch (error) {
      console.error('Error fetching expenses:', error);
      reject(error); // Reject with the error if there's a problem
    }
  });
};

export const expenseService = {
  fetchExpensesFromDatabase,
  filterExpenseFromDatabase,
  removeExpenseFromDatabase,
  updateExpenseInDatabase,
  addExpenseToDatabase,
};
