import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Register from "../../components/Register";
import LoginWithGoogle from "../../components/LoginWithGoogle"
import { LinearGradient } from 'expo-linear-gradient';

const RegisterScreen = () => {
  return (
    <LinearGradient
      colors={['#eeaeca', '#94bbe9']}
      style={styles.container}
    >
      <Text style={styles.title}>Cadastre-se!</Text>
      <View style={styles.content}>
        <Register />
        <View style={styles.Secondcontent}>
          <LoginWithGoogle />
        </View>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: -100
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50
  },
  Secondcontent:{
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50
  }
});

export default RegisterScreen;
