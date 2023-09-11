import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import UseNameAwareView from '../components/UseNameAwareView';
import {RootState, userActions} from '../store';
import Colors from '../constants/colors';

const ProfileScreen = () => {
  const avatarImage = require('../assets/avatar.png');

  var navigation = useNavigation();

  const dispatch = useDispatch();

  let itemCount: number = useSelector(
    (state: RootState) => state.expenses.expenses?.length,
  );

  const logout = async () => {
    await AsyncStorage.removeItem('userName');
    dispatch(userActions.userLogout());
    navigation.navigate('Welcome' as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={avatarImage} // Replace with the actual image URL
          style={styles.avatarImage}
        />
        <UseNameAwareView>
          {userName => (
            <Text style={[styles.totalExpensesText, {textAlign: 'center'}]}>
              {userName || 'Guest'}
            </Text>
          )}
        </UseNameAwareView>
      </View>
      <View style={styles.centeredContent}>
        <View style={styles.rowContainer}>
          <Text style={styles.totalExpensesText}>Total Expenses Items: </Text>
          <Text style={styles.totalExpensesNumber}>{itemCount}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContent: {
    alignItems: 'center',
    width: '100%',
  },
  avatarContainer: {
    marginTop: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarImage: {
    marginBottom: 20,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '100%',
    marginTop: '20%',
  },
  totalExpensesText: {
    fontSize: 24,
  },
  totalExpensesNumber: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: '25%',
    backgroundColor: Colors.cta,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: Colors.ctaText,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
