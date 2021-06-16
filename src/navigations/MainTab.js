import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Channel, ChannelCreation } from '../screens';

const Tab = createStackNavigator();

const MainTab = () => {
  const theme = useContext(ThemeContext);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Channel List"
        component={ChannelList}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default MainTab;