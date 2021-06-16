import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Channel, ChannelCreation } from '../screens';
import MainTab from './MainTab';

const Stack = createStackNavigator();

const MainStack = () => {
  const theme = useContext(ThemeContext);

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        cardStyle: { backgroundColor: theme.backgroundColor },
        headerTintColor: theme.headerTintColor,
      }}
    >
      <StackScreen
        name="Main"
        component={MainTab}
      />
      <Stack.Screen
        name="ChannelCreation"
        component={ChannelCreation}
      />
      <Stack.Screen
        name="Channel"
        component={Channel}
      />
    </Stack.Navigator>
  );
};

export default MainStack;