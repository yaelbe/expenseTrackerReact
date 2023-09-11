import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import ExpenseBottomSheet from '../components/bottom-sheet/ExpenseBottomSheet';
import {ExpenseData} from '../types/ExpenseData';

import EmptyExpenseScreen from '../components/home/EmptyExpenseScreen';
import ExpenseSectionList from '../components/home/ExpenseSectionList';
import HomeScreenHeader from '../components/home/HomeScreenHeader';
import {expenseActions, RootState} from '../store';

const HomeScreen: React.FC = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [selectedExpenseData, setSelectedExpenseData] =
    useState<ExpenseData | null>(null);
  const [isFilter, setIsFilter] = useState<boolean>(false);

  const userName = useSelector<RootState>(s => s.user.userName);

  const dispatch = useDispatch();

  const handleOpenExpenseBottomSheet = (expenseData: ExpenseData | null) => {
    setSelectedExpenseData(expenseData);
    setIsBottomSheetOpen(true);
  };

  const handleSaveExpense = (expenseData: ExpenseData) => {
    if (!isFilter) {
      dispatch(expenseActions.updateExpense(expenseData));
    } else {
      dispatch(expenseActions.filterExpense(expenseData));
    }
    setSelectedExpenseData(expenseData);
    setIsBottomSheetOpen(false);
    setIsFilter(false);
  };

  const handleDeleteExpense = (expenseData: ExpenseData) => {
    if (!isFilter) {
      dispatch(expenseActions.deleteExpense(expenseData.id));
    } else {
      dispatch(expenseActions.fetchExpenses());
    }
    setSelectedExpenseData(expenseData);
    setIsBottomSheetOpen(false);
    setIsFilter(false);
  };

  const handleCloseExpense = () => {
    setSelectedExpenseData(null);
    setIsBottomSheetOpen(false);
    setIsFilter(false);
  };

  const handleOpenFilter = () => {
    setIsFilter(true);
    setIsBottomSheetOpen(true);
  };

  let expenses: ExpenseData[] = useSelector(
    (state: RootState) => state.expenses.expenses,
  );

  useEffect(() => {
    // Fetch the expense data when the component mounts
    dispatch(expenseActions.fetchExpenses());
  }, [userName]);

  return (
    <>
      <HomeScreenHeader handleOpenFilter={handleOpenFilter} />
      {expenses.length === 0 ? (
        <EmptyExpenseScreen isFilterMode={isFilter} />
      ) : (
        <ExpenseSectionList onItemPress={handleOpenExpenseBottomSheet} />
      )}
      <ExpenseBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => handleCloseExpense()}
        onSave={(newExpenseData: ExpenseData) =>
          handleSaveExpense(newExpenseData)
        }
        onDelete={(newExpenseData: ExpenseData) =>
          handleDeleteExpense(newExpenseData)
        }
        isFilterMode={isFilter}
        expenseData={selectedExpenseData}
      />
    </>
  );
};

export default HomeScreen;
