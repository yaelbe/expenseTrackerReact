import type {PropsWithChildren} from 'react';
import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

import AppNavigator from './src/navigation/AppNavigator';

import {SafeAreaView} from 'react-native';

import {RootStore} from './src/store';
import {initDatabase} from './src/database';
import Colors from './src/constants/colors';
import {Card} from 'react-native-paper';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.containerBgr,
    text: Colors.txt,
    card: Colors.containerBgr,
  },
};

function App(): JSX.Element {
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <RootStore>
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.containerBgr}}>
        <NavigationContainer theme={MyTheme}>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </RootStore>
  );
}

export default App;
