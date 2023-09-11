import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import Colors from '../constants/colors';
import Sizes from '../constants/sizes';

const {width: screenWidth} = Dimensions.get('screen');

const FloatingButton = ({onPress}: {onPress: () => void}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Sizes.roundBtn,
    height: Sizes.roundBtn,
    position: 'absolute',
    bottom: Sizes.roundBtn / 2,
    left: screenWidth / 2 - Sizes.roundBtn / 2,
  },
  button: {
    width: Sizes.roundBtn,
    height: Sizes.roundBtn,
    borderRadius: Sizes.roundBtn / 2,
    backgroundColor: Colors.cta,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 24,
    color: Colors.ctaText,
  },
});

export default FloatingButton;
