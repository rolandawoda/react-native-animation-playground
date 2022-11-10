import React from 'react';
import {View, StyleSheet, ViewProps} from 'react-native';

export const cardHeight = 250;

const Card: React.FC<ViewProps> = ({style}) => {
  return <View style={[styles.card, style]} />;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    height: cardHeight,
    borderRadius: 3,
  },
});
