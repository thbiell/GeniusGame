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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  google: {
    marginTop: -80,
    alignItems: "center",
  },
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
});

export default LoginScreen;
