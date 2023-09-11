import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, userActions} from '../store';
import Colors from '../constants/colors';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState<string>('');
  const dispatch = useDispatch();

  const storeUserName = useSelector<RootState>(state => state.user.userName);

  useEffect(() => {
    if (storeUserName) {
      navigation.dispatch(StackActions.replace('HomeTab'));
    }
  }, [storeUserName]);

  const handleLogin = async () => {
    if (!userName || userName.trim() === '') {
      Alert.alert('Hello', 'Please enter your Name');
      return;
    }
    dispatch(userActions.userLogin(userName));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses Tracking</Text>
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.image} />
        <Text style={styles.title2nd}>Welcome</Text>
        <Text style={styles.subtitle}>Get started with tracking expenses</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          onChangeText={text => setUserName(text)}
          value={userName}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: '10%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 100,
  },
  title2nd: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.textSec,
    marginTop: 8,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  button: {
    marginTop: 32,
    backgroundColor: Colors.cta,
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.ctaText,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
