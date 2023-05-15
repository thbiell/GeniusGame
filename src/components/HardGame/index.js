import React, { useEffect, useState } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { setGameSequence } from "../../reducer/gameSlice";

const HardGame = () => {
  const colors = [1, 2, 3, 4, 5, 6];
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [isWaiting, setisWaiting] = useState(false);
  const [isPlaying, setisPlaying] = useState(false);
  const dispatch = useDispatch();
  const [sequence, setSequence] = useState([]);
  const [buttonsPressedOnRound, setButtonsPressedOnRound] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [message, setMessage] = useState("Iniciar");
  const Gamesequence = useSelector((state) => state.game.gameSequence);
  const [activeButton, setActiveButton] = useState(null);
  
  function handleGameOver() {
    if (sequence.length - 1 > topScore) setTopScore(sequence.length - 1);
    setHasGameStarted(false);
    setSequence([]);
    setButtonsPressedOnRound(0);
  }

  function handleButtonPress(color) {
    if (!hasGameStarted || isWaiting) return;
  
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
      setMessage("Reiniciar");
      handleGameOver();
    }
  
    // Atualizar o objeto activeButton com o índice correto
    setActiveButton(color);
  }
  

  function generateSequence() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const newSequence = [...sequence, colors[randomIndex]];
    dispatch(setGameSequence(newSequence));
    setSequence(newSequence);
    return newSequence;
  }

  function handleStartGame() {
    setHasGameStarted(true);
    generateSequence();
  }

  useEffect(() => {
    if (sequence.length) {
      async function playSequence() {
        setMessage("Atenção");
        setisWaiting(true);
        setisPlaying(false);
  
        for (let i = 0; i < sequence.length; i++) {
          setActiveButton(sequence[i]);
          await new Promise((resolve) => setTimeout(resolve, 300));
          setActiveButton(null);
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
  
        setisWaiting(false);
        setisPlaying(true);
        setMessage(String(sequence.length - 1));
      }
  
      playSequence();
    }
  }, [sequence, setActiveButton]);
  


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
      <Text style={styles.scoreText}>
  Top Score: {topScore || (sequence.length - 1 === -1 ? "Nenhum" : String(sequence.length - 1))}
  {topScore && !hasGameStarted ? "\nClique no botão para reiniciar" : ""}
</Text>

        <View style={styles.buttonsContainer}>
          {colors.map((color, index) => (
            <Pressable
            key={index}
            disabled={!hasGameStarted || isWaiting}
            style={[
              styles.button,
              activeButton === color && styles.activeButton
            ]}
            onPress={() => handleButtonPress(color)}
          />
          
          ))}
        </View>
        <Pressable style={styles.startButton} onPress={handleStartGame} disabled={hasGameStarted}>
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
    width: 100,
    height: 100,
    borderRadius: 60,
    margin: 8,
    backgroundColor: "gray"
  },
  activeButton:{
    backgroundColor: "white",
    width: 90,
    height: 90,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFFFFF',
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

export default HardGame;
