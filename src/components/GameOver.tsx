// GameOver.tsx
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GAME_OVER_TEXT, IT_TOOK_YOU_TEXT, RESTART_TEXT, SECONDS_TEXT } from '../constants';

interface GameOverProps {
    elapsedTime: number;
    restartGame: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ elapsedTime, restartGame }) => (
    <View style={styles.container}>
        <Text style={styles.gameOverText}>{GAME_OVER_TEXT}</Text>
        <Text style={styles.scoreText}> {IT_TOOK_YOU_TEXT} {elapsedTime / 100} {SECONDS_TEXT}</Text>
        <Pressable onPress={restartGame}><Text style={styles.restartText}>{RESTART_TEXT}</Text></Pressable>
    </View>
);

export default GameOver;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        alignSelf: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    gameOverText: {
        fontSize: 50,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#FF0000',
        textShadowColor: '#000000',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
    },
    scoreText: {
        fontSize: 25,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#00FF00',
        textShadowColor: '#000000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
        alignSelf: 'center'
    },
    restartText: {
        marginTop: 16,
        fontSize: 50,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#0000FF',
        textShadowColor: '#000000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 10,
    },
});
