import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import ExpenseBottomSheet from '../components/bottom-sheet/ExpenseBottomSheet';
import FloatingButton from '../components/FloatingButton';
import UseNameAwareView from '../components/UseNameAwareView';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {expenseActions} from '../store';
import {ExpenseData} from '../types/ExpenseData';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import Sizes from '../constants/sizes';
import Colors from '../constants/colors';

const Tab = createBottomTabNavigator();
const HomeTabNavigator = () => {
  const dispatch = useDispatch();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);

  const handleSaveExpense = (expenseData: ExpenseData) => {
    dispatch(expenseActions.addExpense(expenseData));
    setIsBottomSheetOpen(false);
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: Sizes.tabBarH,
            borderTopWidth: 1,
            borderTopColor: Colors.cta,
          },
          headerShown: true,
          header: ({route}) => {
            if (route.name === 'Home') {
              return (
                <UseNameAwareView>
                  {userName => (
                    <Text style={{textAlign: 'center'}}>
                      {userName || 'Guest'}
                    </Text>
                  )}
                </UseNameAwareView>
              );
            }
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                source={require('../assets/home.png')}
                style={styles.imgTab}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({color}) => (
              <Image
                source={require('../assets/person.png')}
                style={styles.imgTab}
              />
            ),
          }}
        />
      </Tab.Navigator>
      <FloatingButton
        onPress={() => {
          setIsBottomSheetOpen(true);
        }}
      />
      <ExpenseBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        onSave={newExpenseData => handleSaveExpense(newExpenseData)}
        onDelete={() => {}}
        isFilterMode={false}
        expenseData={null}
      />
    </>
  );
};

const styles = StyleSheet.create({
  imgTab: {width: Sizes.tabImg, height: Sizes.tabImg, resizeMode: 'cover'},
});

export default HomeTabNavigator;
