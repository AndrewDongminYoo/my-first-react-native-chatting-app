import React from 'react';
import { useEffect, useState, useRef, useContext } from 'react';
import styled from 'styled-components/native'
import { Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input, Button } from '../components';
import { ProgressContext } from '../contexts';
import { createChannel } from '../utils/firebase';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 0px 20px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const ChannelCreation = ({ navigation }) => {
  const { spinner } = useContext(ProgressContext)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('');
  const descriptionRef = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(title && !errorMessage));
  }, [title, description, errorMessage]);

  const _handleTitleChange = title => {
    setTitle(title);
    setErrorMessage(title.trim() ? '' : 'Please enter the title.')
  };

  const _handleCreateButtonPress = async () => {
      try {
        spinner.start();
        const id = await createChannel({ title, description });
        navigation.replace('Channel', { id, title, description });
      } catch (err) {
        Alert.alert('Creation Failed', err.message);
      } finally {
        spinner.stop();
      }
    }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Container>
      <Input
          label="Title"
          plcaeholder="Title"
          value={title}
          onChangeText={_handleTitleChange}
          onSubmitEditing={() => {
            setTitle(title.trim())
            descriptionRef.current.focus()}}
          returnKeyType="next"
          onBlur={() => setTitle(title.trim())}
        />
        <Input
          ref={descriptionRef}
          label="Description"
          plcaeholder="Description"
          value={description}
          onChangeText={text => setDescription(text)}
          onSubmitEditing={() => {
            setDescription(description.trim());
            _handleCreateButtonPress();
          }}
          returnKeyType="done"
          maxLength={40}
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="Create"
          onPress={_handleCreateButtonPress}
          disabled={disabled}
        />
      </Container>
    </KeyboardAwareScrollView>
  )
}

export default ChannelCreation;