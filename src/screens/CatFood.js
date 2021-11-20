import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeContext } from 'styled-components/native';
import acana from "../../assets/images/acana.png";
import QuickInfo from '../components/QuickInfo';

const Container = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`;

const FormulaImage = styled.Image`
  width: 220px;
  height: 220px;
  margin: 20px;
  margin-top: 40px;
  align-self: center;
  border-radius: 20px;
`;

const Brand = styled.Text`
  font-size: 12px;
  font-weight: 900;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const Name = styled.Text`
  font-size: 22px;
  text-align: center;
  letter-spacing: 0.3px;
`;

const Age = styled.View`
  width: 100px;
  height: 20px;
  border-radius: 7px;
  border-width: 1px;
  align-self: center;
  margin: 5px;
  background-color: white;
`;

const AgeText = styled.Text`
  font-size: 12px;
  text-align: center;
  text-transform: uppercase;
  text-align: center;
`;

const Quick = styled.View`
  flex: 1;
  width: 380px;
  height: 250px;
  margin: 20px;
  border-top-width: 10px;
  border-bottom-width: 10px;
  border-color: #eee;
  align-self: center;
`;

const sampleData = {
  brand: 'acana (아카나)',
  name: 'Acana Bountiful Catch (아카나 피쉬)',
  carlorie: 369,
  quality: ['salmon',
    'salmon meal',
    'catfish meal',
    'whole herring',
    'catfish',],
  question: [],
  allergen: ['salmon',
    'salmon meal',
    'catfish meal',
    'catfish oil',
    'whole herring',
    'catfish',
    'natural salmon flavor',
    'rainbow trout',
    'salmon oil',],
  PFCratio: {
    Protein: 31.3,
    Fat: 36.8,
    Carbo: 31.9,
  },
  ingredients: ['Salmon', 'salmon meal', 'catfish meal', 'oatmeal', 'whole peas', 'catfish oil', 'whole green lentils', 'whole herring', 'whole chickpeas', 'catfish',
  'natural salmon flavor', 'lentil fiber', 'sunflower oil', 'rainbow trout', 'salmon oil', 'whole cranberries', 'dried kelp', 'choline chloride', 'zinc proteinate',
  'mixed tocopherols (preservative)', 'vitamin E supplement', 'taurine', 'vitamin D3 supplement', 'vitamin A acetate', 'L-carnitine', 'DL-methionine', 'copper proteinate',
  'niacin', 'thiamine mononitrate', 'riboflavin', 'calcium pantothenate', 'pyridoxine hydrochloride', 'folic acid', 'vitamin B12 supplement', 'biotin', 'ascorbic acid (vitamin C)',
  'citric acid (preservative)', 'rosemary extract', 'dried Lactobacillus acidophilus fermentation product', 'dried Bifidobacterium animalis fermentation product',
  'dried Lactobacillus casei fermentation product'],
  nutrient: {
    'Crude protein (min.)': 33,
    'Crude fat (min.)': 16,
    'Crude fiber (max.)': 4,
    'Moisture (max.)': 10,
    'EPA (eicosapentaenoic acid) (min.)':0.2,
    'DHA (docosahexaenoic acid) (min.)': 0.28,
    'Calcium (min.)': 2,
    'Phosphorus (min.)': 1.4,
    'Magnesium (min.)': 0.1,
    'Taurine (min.)': 0.1,
    'Omega-3 fatty acids* (min.)': 0.8,
    'Omega-6 fatty acids* (min.)': 2.5
  }
}

const CatFood = () => {

  const theme = useContext(ThemeContext);

  return (
    <Container>
      <StatusBar barStyle="dark-content"/>
      <FormulaImage source={acana} resizeMode="contain"/>
      <Brand>{sampleData.brand}</Brand>
      <Name>{sampleData.name}</Name>
      <Age><AgeText>all life</AgeText></Age>
      <Quick>
        <QuickInfo content={sampleData} />
      </Quick>
    </Container>
  )
}

export default CatFood;