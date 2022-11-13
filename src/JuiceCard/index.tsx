/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useRef} from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';

import Card, {
  cardHeight,
  cardTitleHeight,
  cardPadding,
} from './components/Card';

const {height} = Dimensions.get('window');

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
  const scrollY = useRef<Animated.Value>(new Animated.Value(0)).current;

  const _onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: scrollY,
          },
        },
      },
    ],
    {useNativeDriver: true},
  );

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill}>
        {cards.map((item, i) => {
          const inputRange = [-cardHeight, 0];
          const outputRange = [
            cardHeight * i,
            (cardHeight - cardTitleHeight) * -i,
          ];
          if (i > 0) {
            inputRange.push(cardPadding * i);
            outputRange.push((cardHeight - cardPadding) * -i);
          }
          const translateY = scrollY.interpolate({
            inputRange,
            outputRange,
            extrapolateRight: 'clamp',
          });
          return (
            <Animated.View
              key={i}
              style={{transform: [{translateY}, {perspective: 1000}]}}>
              <Card style={{backgroundColor: item.color}} />
            </Animated.View>
          );
        })}
      </View>
      <Animated.ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={_onScroll}
      />
    </View>
  );
};
export default JuiceCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    height: height * 2,
  },
});
