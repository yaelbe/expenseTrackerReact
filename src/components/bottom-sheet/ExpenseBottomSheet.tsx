import {isNestedFrozen} from '@reduxjs/toolkit/dist/serializableStateInvariantMiddleware';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import useDateFormat from '../../hooks/useDateFormat';
import useExpenseValidation from '../../hooks/useExpenseValidation';
import {ExpenseData} from '../../types/ExpenseData';
import CancelBtn from './CancelBtn';
import BottomSheetTitle from './HeaderTitle';
import Colors from '../../constants/colors';

interface ExpenseBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newExpenseData: ExpenseData) => void;
  onDelete: (newExpenseData: ExpenseData) => void;
  isFilterMode: boolean;
  expenseData?: ExpenseData | null;
}

const ExpenseBottomSheet: React.FC<ExpenseBottomSheetProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  isFilterMode,
  expenseData,
}) => {
  const [title, setTitle] = useState<string>(expenseData?.name || '');
  const [amount, setAmount] = useState<number>(expenseData?.amount || 0.0);
  const [date, setDate] = useState<string>(expenseData?.date || '');
  const [dateObject, setDateObject] = useState<Date>(
    expenseData?.date ? new Date(Date.parse(expenseData.date)) : new Date(),
  );
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

  const {validateExpense} = useExpenseValidation();
  const {formatDate} = useDateFormat();

  const setFormatDate = (date: Date) => {
    const formatted = formatDate(date);
    setDate(formatted);
    setDateObject(dateObject);
  };

  const handleSubmit = () => {
    const newExpenseData: ExpenseData = {
      id: expenseData?.id || 0,
      name: title,
      amount,
      date,
      user: expenseData?.user || '',
    };

    if (!isFilterMode && !validateExpense(newExpenseData)) {
      Alert.alert(
        'Invalid Expense',
        'Please fill in all fields and ensure amount is greater than zero.',
      );
      return;
    }
    onSave(newExpenseData);
    clearForm();
  };

  const handelDelete = () => {
    const newExpenseData: ExpenseData = {
      id: expenseData?.id || 0,
      name: title,
      amount,
      date,
      user: expenseData?.user || '',
    };
    onDelete(newExpenseData);
    clearForm();
  };

  const clearForm = () => {
    // Clear the form and close the modal
    onClose();
    setTitle('');
    setAmount(0.0);
    setDate('');
    setDateObject(new Date());
    setIsDatePickerOpen(false);
  };
  useEffect(() => {
    // Check if expenseData exists and update the state accordingly
    if (expenseData) {
      setTitle(expenseData.name || '');
      setAmount(expenseData.amount || 0.0);
      setDate(expenseData.date || '');
      setDateObject(
        expenseData.date ? new Date(Date.parse(expenseData.date)) : new Date(),
      );
    }
  }, [expenseData]); // Add expenseData as a dependency

  return (
    <Modal
      isVisible={isOpen}
      onBackdropPress={clearForm}
      backdropOpacity={0.7}
      style={styles.modal}>
      <View style={styles.modalContent}>
        <BottomSheetTitle
          isFilterMode={isFilterMode}
          isEditMode={expenseData !== null}
        />
        <CancelBtn
          isFilterMode={isFilterMode}
          isEditMode={expenseData !== null}
          onDelete={handelDelete}
        />

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title || ''}
            onChangeText={text => setTitle(text)}
          />

          <Text style={styles.label}>Amount</Text>
          <TextInput
            style={styles.input}
            value={amount.toString()}
            keyboardType="numeric"
            onChangeText={text => {
              const parsedAmount = parseFloat(text);
              if (!isNaN(parsedAmount)) {
                // Only set the state if the parsed value is a valid number
                setAmount(parsedAmount);
              }
            }}
          />

          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            onPress={() => setIsDatePickerOpen(!isDatePickerOpen)}>
            <Text>{date ? date : 'Select a date'}</Text>
          </TouchableOpacity>

          {isDatePickerOpen && (
            <DatePicker
              modal
              open={isDatePickerOpen}
              date={dateObject}
              onDateChange={newDate => {
                setFormatDate(newDate);
              }}
              onConfirm={newDate => {
                setIsDatePickerOpen(false);
                setFormatDate(newDate);
              }}
              onCancel={() => {
                setIsDatePickerOpen(false);
              }}
            />
          )}
        </View>

        <View style={{alignSelf: 'center'}}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {isFilterMode ? 'Apply Filter' : expenseData ? 'Save' : 'Create'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    height: '50%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  label: {
    fontSize: 16,
    color: Colors.textSec,
  },
  inputContainer: {
    flexGrow: 1,
    paddingTop: 30,
  },
  input: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
    paddingTop: 6,
    color: Colors.txt,
  },
  button: {
    marginTop: 32,
    backgroundColor: Colors.cta,
    padding: 12,
    borderRadius: 8,
    marginBottom: '8%',
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.ctaText,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ExpenseBottomSheet;
