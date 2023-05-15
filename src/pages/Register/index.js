import React from "react";
import { View, StyleSheet } from "react-native";
import Register from "../../components/Register";
import LoginWithGoogle from "../../components/LoginWithGoogle"

const RegisterScreen= () => {
  return (
    <View style={styles.container}>
      <Register />
      <LoginWithGoogle/> 
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

export default RegisterScreen