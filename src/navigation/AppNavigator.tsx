import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LoadingScreen from '../components/LoadingScreen';
import HomeTabNavigator from '../screens/HomeTabNavigator';
import WelcomeScreen from '../screens/WelcomeScreen';
import {RootState, userActions} from '../store';

const Stack = createStackNavigator();

function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState('Welcome');
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const userName = useSelector<RootState>(state => state.user.userName);
  const initialized = useSelector<RootState>(state => state.user.initialized);

  useEffect(() => {
    dispatch(userActions.userInit());
  }, []);

  useEffect(() => {
    if (userName) {
      setInitialRoute('HomeTab');
    }

    if (initialized) {
      setIsLoading(false);
    }
  }, [userName, initialized]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
        header: () => null,
      }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="HomeTab" component={HomeTabNavigator} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
