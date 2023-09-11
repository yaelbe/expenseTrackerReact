import React from 'react';
import {Text, View} from 'react-native';
import Colors from '../../constants/colors';
const EmptyExpenseScreen: React.FC<{}> = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 24, color: Colors.cta}}>No Expenses</Text>
    </View>
  );
};
export default EmptyExpenseScreen;
