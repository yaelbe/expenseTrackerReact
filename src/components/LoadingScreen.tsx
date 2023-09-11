import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import Colors from '../constants/colors';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.listSubHead} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.listSubHead,
  },
});

export default LoadingScreen;
