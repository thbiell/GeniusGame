import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import {
  addToSequence,
  addUserSequence,
  clearUserSequence,
  endGame,
  incrementScore,
  startGame,
} from "../../reducer/gameSlice";

const Game = () => {
  const dispatch = useDispatch();

  const [buttonSounds, setButtonSounds] = useState({});
  const [currentButtonIndex, setCurrentButtonIndex] = useState(0);
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const sequence = useSelector((state) => state.game.sequence);
  const userSequence = useSelector((state) => state.game.userSequence);
  const isPlaying = useSelector((state) => state.game.isPlaying);
  const isGameOver = useSelector((state) => state.game.isGameOver);
  const score = useSelector((state) => state.game.score);
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    // Carrega os sons dos botões
    async function loadButtonSounds() {
      const greenSound = new Audio.Sound();
      await greenSound.loadAsync(require("../../assets/sounds/green.mp3"));
      const redSound = new Audio.Sound();
      await redSound.loadAsync(require("../../assets/sounds/red.mp3"));
      const yellowSound = new Audio.Sound();
      await yellowSound.loadAsync(require("../../assets/sounds/yellow.mp3"));
      const blueSound = new Audio.Sound();
      await blueSound.loadAsync(require("../../assets/sounds/blue.mp3"));

      setButtonSounds({
        green: greenSound,
        red: redSound,
        yellow: yellowSound,
        blue: blueSound,
      });

    }

    loadButtonSounds();
  }, []);

  const startGameHandler = async () => {
    setIsGameStarted(true);
    dispatch(addToSequence(getRandomButton())); // adiciona a primeira cor na sequência
    await new Promise((resolve) => setTimeout(resolve, 500)); // aguarda 500ms antes de tocar a sequência
    await startSequence(); // inicia a sequência
    
  };
  
  
  // Função que toca o som do botão correspondente ao index atual
  const playButtonSound = async () => {
    if (!isPlayingSound) {
      setIsPlayingSound(true);

      try {
        const sound = buttonSounds[sequence[currentButtonIndex]];
        await sound.setPositionAsync(0);
        await sound.playAsync();
        await sound.setOnPlaybackStatusUpdate((status) => {
          if (!status.isPlaying) {
            setIsPlayingSound(false);
            setCurrentButtonIndex(currentButtonIndex + 1);
          }
        });
      } catch (error) {
        console.warn("Erro ao tocar o som:", error);
      }
    }
  };

  // Função que inicia a sequência de cores do jogo
  const startSequence = async () => {
    dispatch(clearUserSequence());
    dispatch(startGame());

    for (let i = 0; i < sequence.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await playButtonSound();
    }
  };

  // Função que verifica se a sequência do usuário está correta
  const checkUserSequence = async () => {
    for (let i = 0; i < userSequence.length; i++) {
      if (userSequence[i] !== sequence[i]) {
        dispatch(endGame());
        return;
      }
    }

    if (userSequence.length === sequence.length) {
      dispatch(clearUserSequence());
      dispatch(incrementScore());
      dispatch(addToSequence(getRandomButton()));
      await startSequence();
    }
  };

  // Função que adiciona a cor escolhida pelo usuário à sua sequência
  const addUserButton = async (button) => {
    if (isPlaying) {
      dispatch(addUserSequence(button));
      await buttonSounds[button].setPositionAsync(0);
      await buttonSounds[button].playAsync();
      if (userSequence.length === sequence.length - 1) {
        await checkUserSequence();
      }
    }
  };

  // Função que retorna uma cor aleatória
  const getRandomButton = () => {
    const buttons = ["green", "red", "yellow", "blue"];
    const randomIndex = Math.floor(Math.random() * buttons.length);
    return buttons[randomIndex];
  };

  // Função que reinicia o jogo
  const restartGame = async () => {
    dispatch(startGame());
    dispatch(addToSequence(getRandomButton()));
    await startSequence();
  };

  return (
    <LinearGradient colors={["#000428", "#004E92"]} style={styles.container}>
      <View style={styles.gameContainer}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <View style={styles.buttonsContainer}>
          <Pressable
            style={[styles.button, styles.greenButton]}
            onPress={() => addUserButton("green")}
          />
          <Pressable
            style={[styles.button, styles.redButton]}
            onPress={() => addUserButton("red")}
          />
          <Pressable
            style={[styles.button, styles.yellowButton]}
            onPress={() => addUserButton("yellow")}
          />
          <Pressable
            style={[styles.button, styles.blueButton]}
            onPress={() => addUserButton("blue")}
          />
        </View>
        {isGameOver && (
          <Pressable style={styles.restartButton} onPress={restartGame}>
            <Text style={styles.restartButtonText}>Recomeçar</Text>
          </Pressable>
        )}
        {!isGameStarted && (
          <Pressable style={styles.startButton} onPress={startGameHandler}>
            <Text style={styles.startButtonText}>Começar</Text>
          </Pressable>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gameContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  scoreText: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
  },
  startButtonText:{
    fontSize: 32,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 32,
    marginHorizontal: 20,
  },
  button: {
    width: 120,
    height: 120,
    borderRadius: 60,
    margin: 8,
  },
  greenButton: {
    backgroundColor: "green",
  },
  redButton: {
    backgroundColor: "red",
  },
  yellowButton: {
    backgroundColor: "yellow",
  },
  blueButton: {
    backgroundColor: "blue",
  },
  restartButton: {
    backgroundColor: "gray",
    padding: 16,
    borderRadius: 8,
  },
  restartButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  startButton: {
    alignItems: "center",
    borderRadius: 10,
    height: 70,
    justifyContent: "center",
    width: 200,
    opacity: 0.7,
    backgroundColor: "rgba(255, 255, 255, 0.2)", // cor do efeito glass
    backdropFilter: "blur(10px)",
  },
});

export default Game;
