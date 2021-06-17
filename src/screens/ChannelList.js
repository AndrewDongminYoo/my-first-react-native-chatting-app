import React from 'react';
import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { ThemeContext } from 'styled-components/native';
import { FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { DB } from '../utils/firebase';
import moment from 'moment';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  padding: 15px 20px;
`;

const ItemTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

const ItemTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;

const ItemDescription = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: ${({ theme }) => theme.listTime};
`;

const ItemTime = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.listTime};
`;

const getDateorTime = timestamp => {
  const now = moment().startOf('day');
  const target = moment(timestamp).startOf('day');
  return moment(timestamp).format(now.diff(target, 'days') > 0 ? 'MM/DD' : 'HH:mm');
}

const Item = React.memo(
  ({ item: { id, title, description, createdAt }, onPress}) => {
    const theme = useContext(ThemeContext);
    console.log(`Item: ${id}`);

    return (
    <ItemContainer onPress={() => onPress({ id, title })}>
      <ItemTextContainer>
        <ItemTitle>{ title }</ItemTitle>
        <ItemDescription>{ description }</ItemDescription>
      </ItemTextContainer>
      <ItemTime>{ getDateorTime(createdAt) }</ItemTime>
      <AntDesign name="right" size={24} color={theme.listIcon} />
    </ItemContainer>
    );
  }
);

const ChannelList = ({ navigation }) => {

  const [channels, setChannels] = useState([]);

  useEffect(()=>{
    const unsubscribe = DB.collection('channels')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const list = [];
        snapshot.forEach(doc => {
          list.push(doc.data());
        });
        setChannels(list);
      });
    return () => unsubscribe();
  }, []);

  const _handleItemPress = params => {
    navigation.navigate('Channel', params)
  };

  return (
    <Container>
      <FlatList
        keyExtractor={item => item['id']}
        data={channels}
        windowSize={3}
        renderItem={({ item }) => (
          <Item item={item} onPress={_handleItemPress} />
        )}
      />
    </Container>
  );
};

export default ChannelList;