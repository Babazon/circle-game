import React, { useEffect } from 'react';
import { Dimensions, Pressable } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import { INITIAL_SIZE, SIZE_REDUCTION, SPEED_INCREMENT } from './constants';

const { width, height } = Dimensions.get('window');
const sound = new Audio.Sound();


interface BouncingCircleProps {
  setClickCount: React.Dispatch<React.SetStateAction<number>>;
  isGameActive: SharedValue<boolean>;
  speed: SharedValue<number>;
  size: SharedValue<number>;
  stopGame: () => void;
}

const BouncingCircle: React.FC<BouncingCircleProps> = ({ setClickCount, isGameActive, speed, size, stopGame }) => {


  const positionX = useSharedValue(width / 2 - INITIAL_SIZE / 2);
  const positionY = useSharedValue(height / 2 - INITIAL_SIZE / 2);
  const directionX = useSharedValue(Math.random() > 0.5 ? 1 : -1);
  const directionY = useSharedValue(Math.random() > 0.5 ? 1 : -1);

  useEffect(() => {
    const loadSoundEffect = async () => {
      try {
        await sound.loadAsync(require('./assets/BounceSoundEffect.mp3'));
      } catch (error) {
        console.log(error);
      }
    }
  
    loadSoundEffect();
  
    return () => {
      sound.unloadAsync();
    };
  }, []);


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

    positionX.value += directionX.value * speed.value;
    positionY.value += directionY.value * speed.value;

    if (positionX.value > width - size.value - 1 || positionX.value < 1) {
      directionX.value *= -1;
    }
    if (positionY.value > height - size.value - 1 || positionY.value < 1) {
      directionY.value *= -1;
    }
  });

  const onPress = async () => {
    size.value *= SIZE_REDUCTION;
    speed.value *= SPEED_INCREMENT;
    setClickCount(prevClickCount => prevClickCount + 1)
    Haptics.selectionAsync();

    try {
      await sound.setPositionAsync(0);
      await sound.playAsync();
    } catch (error) {
      console.log(error);
    }
  };

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
