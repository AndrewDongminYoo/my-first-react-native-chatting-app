import React from 'react';
import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { ThemeContext } from 'styled-components/native';
import { FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { DB } from '../utils/firebase';

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

const ItemFormula = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;

const ItemBrand = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: ${({ theme }) => theme.listTime};
`;

const ItemDescription = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: ${({ theme }) => theme.listTime};
`;

const Item = React.memo(
  ({ item: { id, brand, formula, description }, onPress}) => {
    const theme = useContext(ThemeContext);
    console.log(`Item: ${id}`);

    return (
    <ItemContainer onPress={() => onPress({ id, brand })}>
      <ItemTextContainer>
        <ItemBrand>{ brand }</ItemBrand>
        <ItemFormula>{ formula }</ItemFormula>
        <ItemDescription>{ description }</ItemDescription>
      </ItemTextContainer>
      <AntDesign name="right" size={24} color={theme.listIcon} />
    </ItemContainer>
    );
  }
);

const CatFoodList = ({ navigation }) => {

  const [formulas, setFormulas] = useState([]);

  useEffect(()=>{
    const unsubscribe = DB.collection('catfoods')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const list = [];
        snapshot.forEach(doc => {
          list.push(doc.data());
        });
        setFormulas(list);
      });
    return () => unsubscribe();
  }, []);

  const _handleItemPress = params => {
    navigation.navigate('FoodInfo', params)
  };

  return (
    <Container>
      <FlatList
        keyExtractor={item => item['id']}
        data={formulas}
        windowSize={3}
        renderItem={({ item }) => (
          <Item item={item} onPress={_handleItemPress} />
        )}
      />
    </Container>
  );
};

export default CatFoodList;