/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {ScrollView} from 'react-native';

import Card from './components/Card';

const cards = [
  {
    color: 'violet',
  },
  {
    color: 'teal',
  },
  {
    color: 'orange',
  },
  {
    color: 'purple',
  },
  {
    color: 'pink',
  },
];

const JuiceCard = () => {
  return (
    <ScrollView>
      {cards.map((item, i) => {
        return <Card style={{backgroundColor: item.color}} />;
      })}
    </ScrollView>
  );
};
export default JuiceCard;
