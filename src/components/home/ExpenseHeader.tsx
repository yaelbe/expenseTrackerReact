import moment from 'moment';
import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import Colors from '../../constants/colors';

interface ExpenseHeaderProps {
  item: string;
}

const ExpenseHeader: React.FC<ExpenseHeaderProps> = ({item}) => {
  const rawDateMoment = moment(item, 'DD/MM/YYYY');
  let dateDisplay = item;

  // if date is today, display 'Today' instead of date
  if (rawDateMoment.isSame(moment(), 'day')) {
    dateDisplay = 'Today';
  } else if (rawDateMoment.isSame(moment().subtract(1, 'day'), 'day')) {
    // if date is yesterday, display 'Yesterday' instead of date
    dateDisplay = 'Yesterday';
  }

  return (
    <List.Subheader style={styles.listSubheader}>
      <Text style={styles.title}>{dateDisplay}</Text>
    </List.Subheader>
  );
};

const styles = StyleSheet.create({
  listSubheader: {
    backgroundColor: Colors.listSubHead,
    paddingVertical: 8,
    borderTopColor: Colors.txt,
    borderTopWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default ExpenseHeader;
