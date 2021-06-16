import React from 'react';
import styled from 'styled-components/native';
import { Text, Button } from 'react-native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const ChannelList = () => {
  return (
    <Container>
      <Text style={{ fontSize: 24 }}>Channel List</Text>
      <Button
        title="Channel Creation"
        onPress={() => navigation.navigate('Channel Creation')}
      />
    </Container>
  );
};

export default ChannelList;