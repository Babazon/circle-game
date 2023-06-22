// GameStart.tsx
import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

interface GameStartProps {
  startGame: () => void;
}

const GameStart: React.FC<GameStartProps> = ({ startGame }) => (
  <View style={styles.container}>
    <Pressable onPress={startGame}><Text style={styles.text}>Start Game</Text></Pressable>
  </View>
);

export default GameStart;


const styles = StyleSheet.create({
    container: { position: 'absolute', top: 250, alignSelf: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
    text: { color: 'green' },
})