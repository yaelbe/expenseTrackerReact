import React from 'react';
import {StyleSheet, Button, View} from 'react-native';
import {ExpenseData} from '../../types/ExpenseData';

interface CancelBtnProps {
  isFilterMode: boolean;
  isEditMode: boolean;
  onDelete: () => void;
}

const CancelBtn: React.FC<CancelBtnProps> = ({
  isFilterMode,
  isEditMode,
  onDelete,
}) => {
  return (
    <View style={styles.container}>
      {isFilterMode ? (
        <Button title="Clear" onPress={onDelete} color="red" />
      ) : isEditMode ? (
        <Button title="Delete" onPress={onDelete} color="red" />
      ) : (
        <View></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});
export default CancelBtn;
