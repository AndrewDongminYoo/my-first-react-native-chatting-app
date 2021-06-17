import React from 'react';
import { useEffect, useState, useRef, useContext } from 'react';
import styled from 'styled-components/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Image, Input, Button } from '../components';
import { validateEmail, removeWhitespace } from '../utils/common';
import { images } from '../utils/images';
import { Alert } from 'react-native';
import { signup } from '../utils/firebase';
import { ProgressContext } from '../contexts';

const Container = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 40px 20px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;


const Signup = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [photoUrl, setPhotoUrl] = useState(images.logo)

  const didMountRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const { spinner } = useContext(ProgressContext);

  useEffect(() => {
    if (didMountRef.current) {
      let _errorMessage = '';
      if (!name) {
        _errorMessage = 'Please Enter your name.';
      } else if (!validateEmail(email)) {
        _errorMessage = 'Please verify your email.';
      } else if (!name) {
        _errorMessage = 'Please Enter your name.';
      } else if (password.length < 6) {
        _errorMessage = 'The Password must contain 6 characters at least.';
      } else if (!name) {
        _errorMessage = 'Password need to match.';
      } else {
        _errorMessage = '';
      }
      setErrorMessage(_errorMessage);
    } else {
      didMountRef.current = true;
    }
   }, [name, email, password, passwordConfirm, errorMessage])

  useEffect(() => {
    setDisabled(
      !(name && email && password && passwordConfirm && !errorMessage)
    );
   }, [name, email, password, passwordConfirm, errorMessage])

   const _handleSignupButtonPress = async () => {
    try {
      spinner.start()
      const user = await signup({ name, email, password, photoUrl });
      console.log(user);
      Alert.alert('Login Success', user.email);
    } catch (err) {
      Alert.alert('Login Failed', err.message);
    } finally {
      spinner.stop()
    }
  };

  return (
    <KeyboardAwareScrollView
      extraScrollHeight={20}
    >
      <Container>
      <Image
        url={photoUrl}
        rounded
        showButton
        onChangeImage={url => setPhotoUrl(url)}
      />
      <Input
          label="Name"
          plcaeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
          onSubmitEditing={() => {
            setName(name.trim())
            emailRef.current.focus()}}
          returnKeyType="next"
          onBlur={() => setName(name.trim())}
        />
        <Input
          ref={emailRef}
          label="Email"
          plcaeholder="Email"
          value={email}
          onChangeText={text => setEmail(removeWhitespace(text))}
          onSubmitEditing={() => passwordRef.current.focus()}
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          label="Password"
          plcaeholder="Password"
          value={password}
          onChangeText={text => setPassword(removeWhitespace(text))}
          onSubmitEditing={() => passwordConfirmRef.current.focus()}
          returnKeyType="next"
          isPassword={true}
        />
        <Input
          ref={passwordConfirmRef}
          label="Password Confirm"
          plcaeholder="Password Confirm"
          value={passwordConfirm}
          onChangeText={text => setPasswordConfirm(removeWhitespace(text))}
          onSubmitEditing={_handleSignupButtonPress}
          returnKeyType="done"
          isPassword={true}
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="Signup"
          onPress={_handleSignupButtonPress}
          disabled={disabled}
          isFilled={true}
        />
      </Container>
    </KeyboardAwareScrollView>
  )
}

export default Signup;