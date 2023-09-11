import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {ExpenseData} from '../../types/ExpenseData';
import {RootState} from '../../store';
import {SectionList} from 'react-native';
import moment from 'moment';
import ExpenseItem from './ExpenseItem';
import ExpenseHeader from './ExpenseHeader';

interface ExpensesSectionListProps {
  onItemPress: (expenseData: ExpenseData) => void;
}

const ExpenseSectionList: React.FC<ExpensesSectionListProps> = ({
  onItemPress,
}) => {
  interface Section {
    title: string;
    data: ExpenseData[];
  }
  interface GroupedExpenses {
    [key: string]: ExpenseData[];
  }

  let expenses: ExpenseData[] = useSelector(
    (state: RootState) => state.expenses.expenses,
  );

  const parseDate = (dateStr: string): Date => {
    const splitted = dateStr.split('/');
    const day = parseInt(splitted[0]);
    const month = parseInt(splitted[1]);
    const year = parseInt(splitted[2]);
    return new Date(year, month - 1, day);
  };

  const getGroupedExpensesSections = (): Section[] => {
    const groupedExpenses: GroupedExpenses = expenses
      ? expenses.reduce((acc: {[key: string]: ExpenseData[]}, expense) => {
          if (!expense) return acc;

          const date = new Date(expense.date);
          const dateKey = moment(date).format('DD/MM/YYYY');

          if (!acc[dateKey]) {
            acc[dateKey] = [];
          }

          acc[dateKey].push(expense);

          return acc;
        }, {})
      : {};

    // convert groupedExpenses object to array
    const groupedExpensesArray: Section[] = Object.keys(groupedExpenses).map(
      date => ({
        title: date,
        data: groupedExpenses[date]?.sort((a: ExpenseData, b: ExpenseData) => {
          const dateA = parseDate(a.date);
          const dateB = parseDate(b.date);
          return dateB.getTime() - dateA.getTime();
        }),
      }),
    );

    const sorted = groupedExpensesArray.sort((s1, s2) =>
      parseDate(s1.title) > parseDate(s2.title) ? -1 : 1,
    );

    return sorted;
  };

  const renderItem = (item: ExpenseData) => (
    <ExpenseItem item={item} onPressEdit={() => onItemPress(item)} />
  );
  const renderSectionHeader = (section: Section) => (
    <ExpenseHeader item={section.title} />
  );

  return (
    <SectionList
      contentContainerStyle={{paddingBottom: 24}}
      sections={getGroupedExpensesSections()}
      renderItem={({item}) => renderItem(item)}
      keyExtractor={item => item.id.toString()}
      renderSectionHeader={({section}) => renderSectionHeader(section)}
    />
  );
};
export default ExpenseSectionList;
