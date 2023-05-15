import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LoginWithEmail from "../../components/LoginWithEmail";
import LoginWithGoogle from "../../components/LoginWithGoogle"

const LoginScreen = () => {
  return (
    <LinearGradient colors={["#000428", "#004E92"]} style={styles.container}>
      <View style={styles.google}>
        <LoginWithEmail />
        <LoginWithGoogle /></View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  google: {
    marginTop: -80,
    alignItems: "center",
  },
});

export default LoginScreen;
