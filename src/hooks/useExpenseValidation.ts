import {ExpenseData} from '../types/ExpenseData';

const useExpenseValidation = () => {
  const validateExpense = (expense: ExpenseData) => {
    const {name, amount, date} = expense;

    // Check if name is empty or null
    if (!name || name.trim() === '') {
      console.log('name is empty or null');

      return false;
    }

    // Check if amount is 0 or not a number
    if (isNaN(amount) || amount === 0) {
      console.log('amount is 0 or not a number');
      return false;
    }

    // Check if date is empty or null
    if (!date || date.trim() === '') {
      console.log('date is empty or null');
      return false;
    }
    console.log('valid Expense');
    return true;
  };

  return {validateExpense};
};

export default useExpenseValidation;
