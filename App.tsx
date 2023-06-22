// App.tsx
import React, { useEffect, useRef, useState } from 'react';
import Confetti from 'react-native-confetti';
import { log, useSharedValue } from 'react-native-reanimated';
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

  const confettiRef = useRef(null);


  const stopGame = () => {
    isGameActive.value = false;
    setElapsedTime(Date.now() - startTime);
    if (confettiRef.current) {
      // current is typed as never, so we have to mute typescript here
      // @ts-ignore
      confettiRef.current.startConfetti();
    }
  }

  const restartGame = () => {
    isGameActive.value = true;
    setClickCount(0);
    speed.value = SPEED;
    size.value = INITIAL_SIZE;
    setStartTime(Date.now());
    setElapsedTime(0);
    if (confettiRef.current) {
      // current is typed as never, so we have to mute typescript here
      // @ts-ignore
      confettiRef.current.stopConfetti();
    }
  }

  useEffect(() => {
    if (clickCount >= CLICK_COUNT) {
      stopGame();
    }
  }, [clickCount]);

  console.log(elapsedTime);
  

  return (
    <>
      <BouncingCircle
        setClickCount={setClickCount}
        isGameActive={isGameActive}
        speed={speed}
        size={size}
        stopGame={stopGame}
      />
      {
        !isGameActive.value && clickCount >= CLICK_COUNT &&
        <GameOver elapsedTime={elapsedTime} restartGame={restartGame} />
      }
      <Confetti ref={confettiRef} />
    </>
  );
}
