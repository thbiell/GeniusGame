<<<<<<< HEAD
import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LoginWithEmail from "../../components/LoginWithEmail";
import LoginWithGoogle from "../../components/LoginWithGoogle";

const LoginScreen = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userName) => {
    setUser(userName);
  };

  return (
    <LinearGradient colors={["#000428", "#004E92"]} style={styles.container}>
      <View style={styles.google}>
        {user === null ? (
          <>
            <LoginWithEmail onLoginSuccess={handleLoginSuccess} />
            <View style={styles.googleButton}>
              <LoginWithGoogle onLoginSuccess={handleLoginSuccess} />
            </View>
          </>
        ) : (
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>
              Bem-vindo, {user.substring(0, 6)}
            </Text>
          </View>
        )}
      </View>
=======
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
>>>>>>> 0e76042787cbb0dac24c751141d4f93c91b553d6
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
    alignItems: "center",
    justifyContent: "center",
=======

>>>>>>> 0e76042787cbb0dac24c751141d4f93c91b553d6
  },
  google: {
    marginTop: -80,
    alignItems: "center",
  },
<<<<<<< HEAD
  googleButton: {
    marginTop: 10,
  },
  welcomeContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: "white",
  },
=======
>>>>>>> 0e76042787cbb0dac24c751141d4f93c91b553d6
});

export default LoginScreen;
