import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {ExpenseData} from '../../types/ExpenseData';
import Colors from '../../constants/colors';

interface ExpenseItemProps {
  item: ExpenseData;
  onPressEdit: (expenseData: ExpenseData) => void;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({item, onPressEdit}) => {
  return (
    <>
      <TouchableOpacity onPress={() => onPressEdit(item)} style={styles.row}>
        <Text style={styles.txt}>{item.name}</Text>
        <Text style={styles.txt}>{`$${item.amount?.toFixed(2)}`}</Text>
      </TouchableOpacity>
      <View style={styles.divider} />
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
    backgroundColor: Colors.containerBgr,
  },
  divider: {
    height: 2,
    backgroundColor: Colors.divider,
  },
  txt: {
    color: Colors.txt,
  },
});
export default ExpenseItem;
