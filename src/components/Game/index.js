import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { initializeApp } from '../../../firebase-api';
=======
>>>>>>> 0e76042787cbb0dac24c751141d4f93c91b553d6
import { StyleSheet, View, Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
=======
>>>>>>> 0e76042787cbb0dac24c751141d4f93c91b553d6
import {
  setGameSequence,
} from "../../reducer/gameSlice";

<<<<<<< HEAD
const auth = getAuth();
const db = getFirestore();
const user = auth.currentUser
if (user) {
  // O usuário está autenticado, então podemos salvar os dados no Firestore
  const userRef = doc(db, 'users', user.uid);
  const data = {
    // Dados que deseja salvar
  };

  setDoc(userRef, data)
    .then(() => {
      console.log('Dados salvos com sucesso!');
    })
    .catch((error) => {
      console.error('Erro ao salvar dados:', error);
    });
} else {
  console.log('Usuário não está autenticado');
}

function saveTopScore(topscore) {
  const userRef = doc(db, "users", user.uid);
  setDoc(userRef, { topscore: topscore }, { merge: true });
}

=======
>>>>>>> 0e76042787cbb0dac24c751141d4f93c91b553d6
const Game = () => {
  const colors = ['green', 'red', 'yellow', 'blue'];
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [isWaiting, setisWaiting] = useState(false);
  const [isPlaying, setisPlaying] = useState(false);
  const [buttonSounds, setButtonSounds] = useState({});
  const dispatch = useDispatch();
  const [sequence, setSequence] = useState([]);
  const [buttonsPressedOnRound, setButtonsPressedOnRound] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [message, setMessage] = useState('Iniciar');
  const Gamesequence = useSelector((state) => state.game.gameSequence);
  const [activeButton, setActiveButton] = useState({
    green: false,
    red: false,
    yellow: false,
    blue: false,
  });

<<<<<<< HEAD

=======
>>>>>>> 0e76042787cbb0dac24c751141d4f93c91b553d6
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


  function handleGameOver() {
    if (sequence.length - 1 > topScore) setTopScore(sequence.length - 1);
    setHasGameStarted(false);
    setSequence([]);
    setButtonsPressedOnRound(0);
  }
<<<<<<< HEAD

  function handleButtonPress(color) {
    if (!hasGameStarted || isWaiting) return;

    buttonSounds[color].replayAsync();

=======
  
  function handleButtonPress(color) {
    if (!hasGameStarted || isWaiting) return;
  
    buttonSounds[color].replayAsync();
  
>>>>>>> 0e76042787cbb0dac24c751141d4f93c91b553d6
    if (color === sequence[buttonsPressedOnRound]) {
      if (buttonsPressedOnRound === sequence.length - 1) {
        setTimeout(() => {
          setButtonsPressedOnRound(0);
          generateSequence();
        }, 500);
      } else {
        setButtonsPressedOnRound(buttonsPressedOnRound + 1);
      }
    } else {
      setMessage('Reiniciar');
      handleGameOver();
    }
  }
<<<<<<< HEAD

=======
  
>>>>>>> 0e76042787cbb0dac24c751141d4f93c91b553d6


  function generateSequence(s) {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const newSequence = [...sequence, colors[randomIndex]];
    dispatch(setGameSequence(newSequence));
    setSequence(newSequence);
    return newSequence;
  }
<<<<<<< HEAD

=======
  
>>>>>>> 0e76042787cbb0dac24c751141d4f93c91b553d6

  function handleStartGame() {
    setHasGameStarted(true);
    generateSequence();
  }

  useEffect(() => {
    console.log('sequence: ', sequence);
    if (sequence.length) {
      async function playSequence(index) {
        setMessage('Atenção');
        setisWaiting(true);
        setisPlaying(false);
        setTimeout(async () => {
          setActiveButton({ ...activeButton, [sequence[index]]: true });
<<<<<<< HEAD
  
=======

>>>>>>> 0e76042787cbb0dac24c751141d4f93c91b553d6
          await buttonSounds[sequence[index]].replayAsync();
          setTimeout(() => {
            setActiveButton({ ...activeButton, [sequence[index]]: false });
            if (index < sequence.length - 1) playSequence(index + 1);
<<<<<<< HEAD
  
            setTimeout(() => {
              setisWaiting(false);
              setisPlaying(true);
  
              // Verifica se é um novo topscore e salva no banco de dados
              if (index === sequence.length - 1 && sequence.length - 1 > topScore) {
                setTopScore(sequence.length - 1);
                saveTopScore(sequence.length - 1);
              }
=======

            setTimeout(() => {
              setisWaiting(false);
              setisPlaying(true);
>>>>>>> 0e76042787cbb0dac24c751141d4f93c91b553d6
            }, 600 * sequence.length);
          }, 300);
        }, 300);
      }
<<<<<<< HEAD
  
      playSequence(0);
    }
  }, [sequence]);
  
=======

      playSequence(0);
    }
  }, [sequence]);
>>>>>>> 0e76042787cbb0dac24c751141d4f93c91b553d6

  useEffect(() => {
    if (isWaiting && !isPlaying) {
      setMessage("Atenção!");
    } else if (!isWaiting && isPlaying) {
      setMessage("Jogue");
    }
  }, [isWaiting, isPlaying]);

  return (
    <LinearGradient colors={["#000428", "#004E92"]} style={styles.container}>
      <View style={styles.gameContainer}>
<<<<<<< HEAD
        <Text style={styles.scoreText}>
          Top Score: {topScore || (sequence.length - 1 === -1 ? "Nenhum" : String(sequence.length - 1))}
          {topScore && !hasGameStarted ? "\nClique no botão para reiniciar" : ""}
        </Text>
=======
      <Text style={styles.scoreText}>
  Top Score: {topScore || (sequence.length - 1 === -1 ? "Nenhum" : String(sequence.length - 1))}
  {topScore && !hasGameStarted ? "\nClique no botão para reiniciar" : ""}
</Text>
>>>>>>> 0e76042787cbb0dac24c751141d4f93c91b553d6
        <View style={styles.buttonsContainer}>
          <Pressable
            disabled={!hasGameStarted || isWaiting}
            style={[styles.button, styles.greenButton, activeButton.green && styles.activeButton]}
            onPress={() => handleButtonPress("green")}
          />
          <Pressable
            disabled={!hasGameStarted || isWaiting}
            style={[styles.button, styles.redButton, activeButton.red && styles.activeButton]}
            onPress={() => handleButtonPress("red")}
          />
          <Pressable
            style={[styles.button, styles.yellowButton, activeButton.yellow && styles.activeButton]}
            disabled={!hasGameStarted || isWaiting}
            onPress={() => handleButtonPress("yellow")}
          />
          <Pressable
            style={[styles.button, styles.blueButton, activeButton.blue && styles.activeButton]}
            disabled={!hasGameStarted || isWaiting}
            onPress={() => handleButtonPress("blue")}
          />

        </View>
        <Pressable style={styles.startButton} onPress={() => handleStartGame()} disabled={hasGameStarted}>
          <Text style={styles.startButtonText}>{message}</Text>
        </Pressable>

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
  startButtonText: {
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
<<<<<<< HEAD
  activeButton: {
=======
  activeButton:{
>>>>>>> 0e76042787cbb0dac24c751141d4f93c91b553d6
    backgroundColor: "white",
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFFFFF',
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
