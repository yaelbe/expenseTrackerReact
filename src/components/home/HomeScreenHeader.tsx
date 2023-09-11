import React from 'react';
import {TouchableOpacity, Text, View, Image, StyleSheet} from 'react-native';
import {ExpenseData} from '../../types/ExpenseData';
import {RootState} from '../../store';
import {useSelector} from 'react-redux';
import Colors from '../../constants/colors';

interface HeaderProps {
  handleOpenFilter: () => void;
}

const HomeScreenHeader: React.FC<HeaderProps> = ({handleOpenFilter}) => {
  let expenses: ExpenseData[] = useSelector(
    (state: RootState) => state.expenses.expenses,
  );
  const sum = () => {
    return expenses
      ? expenses
          .reduce((total, expense) => total + (expense ? expense.amount : 0), 0)
          .toFixed(2) + ''
      : '0';
  };
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.titleText}>Total Expense:</Text>
        <Text style={styles.total}>$ {sum()}</Text>
      </View>
      <TouchableOpacity style={styles.filterBtn} onPress={handleOpenFilter}>
        <Image
          source={require('../../assets/sliders.png')}
          style={styles.filterBtnImg}
        />
        <Text style={styles.filterBtnTxt}>Filters</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {borderBottomColor: Colors.cta, borderBottomWidth: 1},
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 12,
  },
  filterBtn: {
    backgroundColor: Colors.ctaSec,
    padding: 6,
    borderRadius: 50,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
    paddingHorizontal: 10,
    margin: 12,
  },
  titleText: {
    alignSelf: 'center',
    fontSize: 20,
    color: Colors.txt,
    fontWeight: 'bold',
  },
  total: {
    fontSize: 24,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    color: Colors.txt,
  },
  filterBtnImg: {width: 20, height: 20, resizeMode: 'cover'},
  filterBtnTxt: {fontSize: 10, fontWeight: 'bold'},
});

export default HomeScreenHeader;
