import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeContext } from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  width: 380px;
  height: 250px;
  margin: 20px;
  align-self: center;
  flex-direction: row;
`;

const Index = styled.View`
  height: 100%;
  flex: 1;
`;

const Value = styled.View`
  height: 100%;
  flex: 2;
`;

export default QuickInfo = content => {
  return (
    <Container>
      <Index>
      </Index>
      <Value>
      </Value>
    </Container>
  )
}