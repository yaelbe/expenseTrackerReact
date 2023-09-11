import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface HeaderTitleProps {
  isFilterMode: boolean;
  isEditMode: boolean;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({
  isFilterMode,
  isEditMode,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title]}>
        {isFilterMode
          ? 'Filter Expenses'
          : isEditMode
          ? 'Edit Expense'
          : 'Create Expense'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '400',
    alignSelf: 'center',
  },
  container: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: -1,
  },
});
export default HeaderTitle;
