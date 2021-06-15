import React from 'react';
import styled from 'styled-components/native'
import { Text, Button } from 'react-native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const Login = ({ navigation }) => {
  return (
    <Container>
      <Text style={{ fontSize: 30 }}>Login Screen</Text>
      <Button title="signup" onPress={() => navigation.navigate('Signup')} />
    </Container>
  )
};

export default Login;