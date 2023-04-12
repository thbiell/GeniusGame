import React from "react";
import { View, StyleSheet } from "react-native";
import Game from "../../components/Game";


const GameScreen = () => {
  return (
    <View style={styles.container}>
      <Game />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GameScreen;
