import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import BouncingCircle from './src/BouncingCircle';

export const INITIAL_SIZE = 100;
export const SPEED = 5;
export const SIZE_REDUCTION = 0.8;
export const SPEED_INCREMENT = 1.2;

export default function App() {
  const [clickCount, setClickCount] = useState(0);
  const isGameActive = useSharedValue(true); 
  const speed = useSharedValue(SPEED);
  const size = useSharedValue(INITIAL_SIZE);

  const restartGame = () => {
    isGameActive.value = true;
    setClickCount(0);
    speed.value = SPEED;
    size.value = INITIAL_SIZE

  }


  return (<>
      <BouncingCircle 
      setClickCount={setClickCount} 
      clickCount={clickCount} 
      isGameActive={isGameActive}
      speed={speed}
      size={size}
      />
      <Text style={{position: 'absolute', top: 50, alignSelf: 'center'}}>clickcount: {clickCount}</Text>
      {
      !isGameActive.value && 
          <View style={{position: 'absolute', top: 250, alignSelf: 'center', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 40, fontWeight: 'bold'}}>GAME OVER</Text>
              <Pressable onPress={restartGame}><Text style={{color: 'green'}}>Restart?</Text></Pressable>
          </View>
      }
      </>
  );
}