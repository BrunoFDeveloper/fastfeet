import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';
import SignIn from '~/pages/SignIn/SignIn';
import Dashboard from '~/pages/Dashboard/Dashboard';
import Profile from '~/pages/Profile/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const iconNames = {
  Dashboard: 'menu',
  Profile: 'person-pin',
};

const Stacks = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Signin" component={SignIn} />
  </Stack.Navigator>
);

const Tabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        return <Icon name={iconNames[route.name]} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      keyboardHidesTabBar: true,
      activeTintColor: '#7159c1',
      inactiveTintColor: 'rgba(0,0,0,0.2)',
    }}
  >
    <Tab.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        title: 'Entregas',
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        title: 'Meu Perfil',
      }}
    />
  </Tab.Navigator>
);

export default function Routes() {
  const signed = useSelector(state => state.auth.signed);
  return (
    <NavigationContainer>{signed ? <Tabs /> : <Stacks />}</NavigationContainer>
  );
}
