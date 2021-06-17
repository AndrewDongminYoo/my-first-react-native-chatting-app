import React from 'react';
import { useEffect, useLayoutEffect, useState, useContext } from 'react';
import styled from 'styled-components/native';
import { ThemeContext } from 'styled-components/native';
import { Alert } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { DB, createMessage, getCurrentUser } from '../utils/firebase';
import { Input } from '../components';
import { FontAwesome } from '@expo/vector-icons';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const SendButton = props => {
  const theme = useContext(ThemeContext);

  return (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
      }}
    >
      <FontAwesome
        name="send"
        size={24}
        color={
          props.text ? theme.sendButtonActivate : theme.senButtonInactivate
        }
      />
    </Send>
  )
}

const Channel = ({ navigation, route: { params } }) => {

  const theme = useContext(ThemeContext);
  const { uid, name, photoUrl } = getCurrentUser();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState([]);

  useEffect(()=>{
    const unsubscribe = DB.collection('channels')
      .doc(params.id)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const list = [];
        snapshot.forEach(doc => {
          list.push(doc.data());
        });
        setMessages(list);
      });
    return () => unsubscribe();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: params.title || 'Channel' });
  }, []);

  const _handleMessageSend = () => {};

  return (
    <Container>
      <FlatList
        keyExtractor={item => item['id']}
        data={messages}
        windowSize={3}
        inverted
        renderItem={({ item }) => (
          <Text style={{ fontSize: 24 }}>{ item.text }</Text>
        )}
      />
      <Input
        value={text}
        onChangeText={text => setText(text)}
        onSubmitEditing={() =>
          createMessage({
            channelId: params.id,
            text,
          })
        }
      />
    </Container>
  );
};

export default Channel;