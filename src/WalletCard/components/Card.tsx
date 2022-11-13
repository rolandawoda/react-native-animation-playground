import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  useDerivedValue,
  useAnimatedStyle,
  Extrapolate,
  interpolate,
} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

const ratio = 228 / 362;
export const CARD_WIDTH = width * 0.8;
export const DEFAULT_CARD_HEIGHT = CARD_WIDTH * ratio;
export const MARGIN = 16;
export const CARD_HEIGHT = DEFAULT_CARD_HEIGHT;
export const HEIGHT = CARD_HEIGHT + MARGIN * 2;

interface CardProps {
  index: number;
  color: string;
  scrollY: Animated.SharedValue<number>;
  visibleCards: number;
}

const Card: React.FC<CardProps> = ({
  color,
  scrollY: y,
  index: i,
  visibleCards,
}) => {
  const positionY = useDerivedValue(() => y.value + i * HEIGHT);
  const isDisappearing = -HEIGHT;
  const isTop = 0;
  const isBottom = HEIGHT * (visibleCards - 1);
  const isAppearing = HEIGHT * visibleCards;

  const animatedStyle = useAnimatedStyle(() => {
    const translateYWithScale = interpolate(
      positionY.value,
      [isBottom, isAppearing],
      [0, HEIGHT / 4],
      Extrapolate.CLAMP,
    );
    const translateY =
      interpolate(
        y.value,
        [-HEIGHT * i, 0],
        [-HEIGHT * i, 0],
        Extrapolate.CLAMP,
      ) + translateYWithScale;

    const scale = interpolate(
      positionY.value,
      [isDisappearing, isTop, isBottom, isAppearing],
      [0.5, 1, 1, 0.5],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      positionY.value,
      [isDisappearing, isTop, isBottom, isAppearing],
      [0, 1, 1, 0],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{translateY: translateY}, {scale}],
      opacity,
    };
  });

  return (
    <Animated.View key={i} style={[styles.cardContainer, animatedStyle]}>
      <View style={[styles.card, {backgroundColor: color}]} />
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: MARGIN,
    alignSelf: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 10,
  },
});
