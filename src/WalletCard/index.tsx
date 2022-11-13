/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  withDecay,
} from 'react-native-reanimated';
import {clamp} from 'react-native-redash';

import Card, {HEIGHT} from './components/Card';
const {height: wHeight} = Dimensions.get('window');

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

type Ctx = {
  y: number;
};

const WalletCard = () => {
  const [containerHeight, setContainerHeight] = useState(wHeight);
  const visibleCards = Math.floor(containerHeight / HEIGHT);
  const y = useSharedValue(0);

  const _getstureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    Ctx
  >({
    onStart: (event, ctx) => {
      ctx.y = y.value;
    },
    onActive: (event, ctx) => {
      const min = -HEIGHT * cards.length + visibleCards * HEIGHT;
      const max = 0;
      const currentDistance = event.translationY + ctx.y;
      const value = clamp(currentDistance, min, max);
      y.value = value;
    },
    onEnd: event => {
      y.value = withDecay({velocity: event.velocityY});
    },
  });

  return (
    <PanGestureHandler onGestureEvent={_getstureHandler}>
      <Animated.View
        style={styles.container}
        onLayout={({
          nativeEvent: {
            layout: {height},
          },
        }) => setContainerHeight(height)}>
        {cards.map((item, i) => {
          return (
            <Card
              key={i}
              color={item.color}
              scrollY={y}
              index={i}
              visibleCards={visibleCards}
            />
          );
        })}
      </Animated.View>
    </PanGestureHandler>
  );
};
export default WalletCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
