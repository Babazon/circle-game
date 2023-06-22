// App.tsx
import React, { useEffect, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import BouncingCircle from './src/BouncingCircle';
import GameOver from './src/components/GameOver';
import {
  CLICK_COUNT,
  INITIAL_SIZE,
  SPEED
} from './src/constants';

export default function App() {
  const [clickCount, setClickCount] = useState(0);
  const isGameActive = useSharedValue(true);
  const speed = useSharedValue(SPEED);
  const size = useSharedValue(INITIAL_SIZE);

  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  const stopGame = () => {
    isGameActive.value = false;
    setElapsedTime(Date.now() - startTime);
  }

  const restartGame = () => {
    isGameActive.value = true;
    setClickCount(0);
    speed.value = SPEED;
    size.value = INITIAL_SIZE;
    setStartTime(Date.now());
    setElapsedTime(0);
  }

  useEffect(() => {
    if (clickCount === CLICK_COUNT) {
      stopGame();
    }
  }, [clickCount]);
  
  return (
    <>
      <BouncingCircle
        setClickCount={setClickCount}
        clickCount={clickCount}
        isGameActive={isGameActive}
        speed={speed}
        size={size}
        stopGame={stopGame}
      />
      {
        !isGameActive.value && clickCount >= CLICK_COUNT &&
        <GameOver elapsedTime={elapsedTime} restartGame={restartGame} />
      }
    </>
  );
}
