import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile, ChannelList } from '../screens';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from 'styled-components/native';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, name }) => {
  const theme = useContext(ThemeContext);
  return (
    <MaterialCommunityIcons
      name={name}
      size={26}
      color={focused ? theme.tabActiveColor : theme.tabInactiveColor}
    />
  );
};

const MainTab = ({ navigation, route }) => {

  const theme = useContext(ThemeContext);

  useEffect(() => {
    const titles = route.state?.routeNames || ['Channels'];
    const index = route.state?.index || 0;
    navigation.setOptions({
      headerTitle: titles[index],
      headerRight: () =>
        index === 0 && (
          <MaterialCommunityIcons
            name="account-group"
            size={26}
            style={{ margin: 10 }}
            onPress={() => navigation.navigate('Channel Creation')}
          />
        ),
    });
  }, [route])

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.tabActiveColor,
        inactiveTintColor: theme.tabInactiveColor,
      }}
    >
      <Tab.Screen
        name="Channels"
        component={ChannelList}
        options={{
          tabBarIcon: ({ focused }) =>
          TabBarIcon({
            focused,
            name: focused ? 'message-text' : 'message-text-outline',
          }),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
          TabBarIcon({
            focused,
            name: focused ? 'account-circle' : 'account-circle-outline',
          }),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTab;