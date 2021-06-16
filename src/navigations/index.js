import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { Spinner } from '../components';
import { ProgressContext, UserContext } from '../context';

const Navigation = () => {

  const { inProgress } = useContext(ProgressContext)

  return (
    <NavigationContainer>
      {user?.uid && user?.email ? <MainStack /> : <AuthStack />}
      {inProgress && <Spinner />}
    </NavigationContainer>
  );
};

export default Navigation;