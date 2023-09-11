import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import Colors from '../constants/colors';

const FloatingLabelInput = ({label, ...rest}: {label: string}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, isFocused && styles.labelFocused]}>
        {label}
      </Text>
      <TextInput
        {...rest}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: Colors.textSec,
  },
  labelFocused: {
    color: 'black',
  },
  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: Colors.textSec,
  },
});

export default FloatingLabelInput;
