import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import Game from "../../components/Game";
import HardGame from "../../components/HardGame";
import { LinearGradient } from "expo-linear-gradient";

const GameScreen = () => {
  const [difficulty, setDifficulty] = useState("");

  const handleDifficultySelection = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
  };

  return (
    <LinearGradient colors={["#000428", "#004E92"]} style={styles.container}>
      {difficulty === "" ? (
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Em qual dificuldade deseja jogar?</Text>
          <Pressable
            style={styles.button}
            onPress={() => handleDifficultySelection("normal")}
          >
            <Text style={styles.buttonText}>Normal</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => handleDifficultySelection("hard")}
          >
            <Text style={styles.buttonText}>Difícil</Text>
          </Pressable>
        </View>
      ) : (
        // Renderiza o componente de jogo de acordo com a dificuldade selecionada
        <>
          {difficulty === "normal" && <Game />}
          {difficulty === "hard" && <HardGame />}
        </>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    borderRadius: 10,
    height: 70,
    justifyContent: "center",
    width: 200,
    marginTop: 30,
    opacity: 0.7,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GameScreen;
