import React from 'react';
import {Text, View} from 'react-native';
import Colors from '../../constants/colors';

interface EmptyExpenseProps {
  isFilterMode: boolean;
}
const EmptyExpenseScreen: React.FC<EmptyExpenseProps> = isFilterMode => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 24, color: Colors.cta}}>
        {' '}
        {isFilterMode ? 'No data matches the filter' : 'No Expenses'}
      </Text>
    </View>
  );
};
export default EmptyExpenseScreen;
