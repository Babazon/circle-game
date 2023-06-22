// GameOver.tsx
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface GameOverProps {
  elapsedTime: number;
  restartGame: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ elapsedTime, restartGame }) => (
  <View style={styles.container}>
    <Text style={styles.gameOverText}>GAME OVER</Text>
    <Text style={styles.scoreText}> It took you: {elapsedTime/100} seconds</Text>
    <Pressable onPress={restartGame}><Text style={styles.restartText}>Restart?</Text></Pressable>
  </View>
);

export default GameOver;

const styles = StyleSheet.create({
    container: { position: 'absolute', top: 250, alignSelf: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
    gameOverText: { fontSize: 40, fontWeight: 'bold' },
    scoreText: { position: 'absolute', top: 100, alignSelf: 'center' },
    restartText: { color: 'green' },
})