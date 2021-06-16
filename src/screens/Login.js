import React from 'react';
import { useEffect, useState, useRef, useContext } from 'react';
import styled from 'styled-components/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image, Input, Button } from '../components';
import { images } from '../utils/images';
import { validateEmail, removeWhitespace } from '../utils/common';
import { Alert } from 'react-native';
import { login } from '../utils/firebase';
import { ProgressContext } from '../context';


const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0 20px;
  padding-top: ${({ insets: { top} }) => top}px;
  padding-bottom: ${({ insets: { bottom} }) => bottom}px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const Login = ({ navigation }) => {

  const { spinner } = useContext(ProgressContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  const passwordRef = useRef();
  const insets = useSafeAreaInsets();

  useEffect(() => {
   setDisabled(!(email && password && !errorMessage));
  }, [email, password, errorMessage])


  const _handleEmagilChange = email => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? '' : 'Please verify your email.'
    );
  };
  const _handlePasswordChange = password => {
    const changedPassword = removeWhitespace(password);
    setPassword(changedPassword);
  };

  const _handleLoginButtonPress = async () => {
    try {
      spinner.start();
      const user = await login({ email, password });
      Alert.alert('Login Success', user.email);
    } catch (err) {
      Alert.alert('Login Failed', err.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Container insets={insets}>
        <Image url={images.logo} imageStyle={{ borderRadius: 8 }}/>
        <Input
          label="Email"
          plcaeholder="Email"
          value={email}
          onChangeText={_handleEmagilChange}
          onSubmitEditing={() => passwordRef.current.focus()}
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          label="Password"
          plcaeholder="Password"
          value={password}
          onChangeText={_handlePasswordChange}
          onSubmitEditing={_handleLoginButtonPress}
          returnKeyType="done"
          isPassword={true}
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="Login"
          onPress={_handleLoginButtonPress}
          isFilled={true}
          disabled={disabled}
        />
        <Button
          title="Sign Up with email"
          onPress={() => navigation.navigate('Signup')}
          isFilled={false}
        />
      </Container>
    </KeyboardAwareScrollView>
  )
};

export default Login;