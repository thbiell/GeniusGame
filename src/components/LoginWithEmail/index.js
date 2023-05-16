<<<<<<< HEAD
import React, { useState } from "react";
import { View, TextInput, Pressable, Alert, StyleSheet, Text } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "../../../firebase-api";
import { LinearGradient } from "expo-linear-gradient";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginWithEmail = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
  .then(() => {
    // Login bem-sucedido
    Alert.alert("Login realizado com sucesso!");
  })
  .catch((error) => {
    // Tratar erros durante o login
    Alert.alert("Erro ao fazer login", error.message);
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
=======
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';



const LoginForm = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = () => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigation.navigate('HomeScreen');
        })
        .catch(error => {
          // Ocorreu um erro durante o login
          console.log(error);
        });
    };

  return (
    <View style = {styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
>>>>>>> 0e76042787cbb0dac24c751141d4f93c91b553d6
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
<<<<<<< HEAD
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
=======
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <Button title="Entrar" onPress={handleLogin} />
>>>>>>> 0e76042787cbb0dac24c751141d4f93c91b553d6
    </View>
  );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
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
});

export default LoginWithEmail;
=======
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default LoginForm;
>>>>>>> 0e76042787cbb0dac24c751141d4f93c91b553d6
