import React from 'react';
import { useState, useRef } from 'react';
import styled from 'styled-components/native'
import { Button } from 'react-native';
import { Image, Input } from '../components';
import { images } from '../utils/images';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
`;

const Login = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();

  return (
    <Container>
      <Image url={images.logo} imageStyle={{ borderRadius: 8 }}/>
      <Input
        label="Email"
        plcaeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        onSubmitEditing={() => passwordRef.current.focus()}
        returnKeyType="next"
      />
      <Input
        ref={passwordRef}
        label="Password"
        plcaeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        onSubmitEditing={() => {}}
        returnKeyType="done"
        isPassword={true}
      />
      <Button title="signup" onPress={() => navigation.navigate('Signup')} />
    </Container>
  )
};

export default Login;