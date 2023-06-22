import React, { useEffect, useState } from 'react';
import { View, Dimensions, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  log,
  SharedValue,
} from 'react-native-reanimated';
import { INITIAL_SIZE, SIZE_REDUCTION, SPEED_INCREMENT } from '../App';

const { width, height } = Dimensions.get('window');



interface BouncingCircleProps {
  clickCount: number;
  setClickCount: React.Dispatch<React.SetStateAction<number>>;
  isGameActive: SharedValue<boolean>;
  speed:SharedValue<number>
  size: SharedValue<number>
}

const BouncingCircle:React.FC<BouncingCircleProps> = ({clickCount, setClickCount, isGameActive, speed, size}) => {


  const positionX = useSharedValue(width / 2 - INITIAL_SIZE / 2);
  const positionY = useSharedValue(height / 2 - INITIAL_SIZE / 2);
  const directionX = useSharedValue(Math.random() > 0.5 ? 1 : -1);
  const directionY = useSharedValue(Math.random() > 0.5 ? 1 : -1);


  const animatedStyle = useAnimatedStyle(() => ({
    width: size.value,
    height: size.value,
    borderRadius: size.value / 2,
    transform: [
      {
        translateX: positionX.value,
      },
      {
        translateY: positionY.value,
      },
    ],
  }));

  useDerivedValue(() => {
    'worklet';

    if (!isGameActive.value) return;

    // Move the circle
    positionX.value += directionX.value * speed.value;
    positionY.value += directionY.value * speed.value;

    // If the circle reaches an edge, reverse the appropriate direction
    if (positionX.value > width - size.value - 1 || positionX.value < 1) {
      directionX.value *= -1;
    }
    if (positionY.value > height - size.value - 1 || positionY.value < 1) {
      directionY.value *= -1;
    }
  });

  const onPress = () => {
    // Reduce size and increase speed
    size.value *= SIZE_REDUCTION;
    speed.value *= SPEED_INCREMENT;
    setClickCount(prev=>prev+1)

      // If the circle has been clicked 5 times, stop the game
      if (clickCount >= 3) {
        isGameActive.value = false;
      }
  };

  console.log(clickCount)

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        style={[
          {
            backgroundColor: 'blue',
            position: 'absolute',
          },
          animatedStyle,
        ]}
      />
    </Pressable>
  );
};

export default BouncingCircle;