import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

import { Container, Item } from './styles';

const AnimatedLinear = Animated.createAnimatedComponent(LinearGradient);

const { width } = Dimensions.get('window')
const ItemSkeleton = () => {
  const x = useSharedValue(-width);

  const rStyle = useAnimatedStyle(() => ({
    flex: 1,
    transform: [
      {translateX: x.value}
    ]
  }))

  useEffect(() => {
    x.value = withRepeat(withTiming(width, {
      duration: 1000,
    }), -1);
  }, [])

  return (
    <Item>
      <AnimatedLinear
        colors={["#E1E9EE", "#F2F8FC"	, "#E1E9EE"]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={rStyle}
      />
    </Item>
  )
};


export const Skeleton = () => {
  return (
    <Container>
      {React.Children.toArray(Array(5).fill(true).map(() => (
        <ItemSkeleton />
      )))}
    </Container>
  );
}
