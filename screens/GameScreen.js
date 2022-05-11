import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Alert} from 'react-native';
import NumberContainer from '../components/games/NumberContainer';
import Title from '../components/ui/Title';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import Colors from '../constants/colors';
import InstructionText from '../components/ui/InstructionsText';

const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({userNumber, onGameOver}) => {
  const initialGuess = generateRandomBetween(
    1,
    100,
    userNumber,
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

    useEffect(() => {
      if (currentGuess === userNumber) {
        onGameOver();
      }
    }, [currentGuess, userNumber, onGameOver]);

  const nextGuessHandler = (direction) => {
    // direction => 'lower', 'greater'

    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...',
      [{ text: 'Sorry!', style: 'cancel'}, 
    ]);
      return;
    }
    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess,
    );
    setCurrentGuess(newRndNumber);
  };

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>Higher or lower? </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
            -
          </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
            +
          </PrimaryButton>
          </View>
        </View>
        </Card>
      {/*<View>
                    LOG ROUNDS 
                     </View>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  instructionText: {
      marginBottom:12,
  },
buttonsContainer: {
  flexDirection:'row'
},
buttonContainer: {
  flex:1,
}
});

export default GameScreen;