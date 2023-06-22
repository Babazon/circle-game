import React, { useEffect, useState } from 'react';
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

  const [hiscores, setHiscores] = useState<number[]>([])

  const startTime = useSharedValue(Date.now()); // store the game start time
  const elapsedTime = useSharedValue(0); // store the game end time


  const restartGame = () => {

    setHiscores(prev => [elapsedTime.value, ...prev].sort())

    isGameActive.value = true;
    setClickCount(0);
    speed.value = SPEED;
    size.value = INITIAL_SIZE;
    startTime.value = Date.now();
    elapsedTime.value = 0;

  }


  useEffect(() => {
    const interval = setInterval(() => {
      elapsedTime.value = Number(((Date.now() - startTime.value) / 1000).toFixed(2));
    }, 100);
    return () => clearInterval(interval);
  }, [elapsedTime, startTime]);

  return (<>
    <BouncingCircle
      setClickCount={setClickCount}
      clickCount={clickCount}
      isGameActive={isGameActive}
      speed={speed}
      size={size}
    />
    <Text style={{ position: 'absolute', top: 50, alignSelf: 'center' }}>clickcount: {clickCount}</Text>
    <Text style={{ position: 'absolute', top: 100, alignSelf: 'center' }}>Score: {elapsedTime.value}</Text>

    {
      !isGameActive.value &&
      <View style={{ position: 'absolute', top: 250, alignSelf: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 40, fontWeight: 'bold' }}>GAME OVER</Text>
        <Pressable onPress={restartGame}><Text style={{ color: 'green' }}>Restart?</Text></Pressable>
      </View>
    }

    <View style={{ position: 'absolute', bottom: 250, alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      {hiscores.reverse().map((score, index) => <Text style={{marginRight: 4}} key={score}>{index + 1}. {score}</Text>)}
    </View>
  </>
  );
}