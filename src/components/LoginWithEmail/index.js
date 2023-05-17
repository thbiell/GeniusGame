import React, { useState } from "react";
import { View, TextInput, Pressable, StyleSheet, Text } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebaseConfig from "../../../firebase-api";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginWithEmail = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login bem-sucedido
        const user = userCredential.user;
        const displayName = email.substring(0, 5);
        setMessage(`Bem-vindo, ${displayName}!`);
        console.log("sucesso");
  
        // Salvar informações de autenticação no AsyncStorage
        const authData = { email, password };
        AsyncStorage.setItem("authData", JSON.stringify(authData));
  
        // Salvar o ID do usuário no AsyncStorage
        AsyncStorage.setItem("userId", user.uid);
      })
      .catch((error) => {
        // Tratar erros durante o login
        setMessage(`Erro ao fazer login: ${error.message}`);
        console.log(error);
      });
  };
  

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 220,
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginWithEmail;