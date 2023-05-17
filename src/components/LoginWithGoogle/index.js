import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, signInWithPopup, GoogleAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

const auth = getAuth();
const db = getFirestore();

const handleGoogleSignIn = () => {
  const provider = new GoogleAuthProvider();

  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      signInWithPopup(auth, provider)
        .then(async (result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          console.log('Usuário autenticado com sucesso!', user);

          // Armazene as informações do usuário no AsyncStorage
          try {
            await AsyncStorage.setItem('userId', user.uid);
            console.log('ID do usuário armazenado com sucesso!');

            // Salve o email e o nome do usuário no banco de dados
            const email = user.email;
            const nome = email.substring(0, email.indexOf('@'));
            const userRef = doc(db, 'users', user.uid);
            setDoc(userRef, { email, nome }, { merge: true })
              .then(() => {
                console.log('Email e nome do usuário salvos com sucesso!');
              })
              .catch((error) => {
                console.error('Erro ao salvar o email e o nome do usuário:', error);
              });
          } catch (error) {
            console.error('Erro ao armazenar o ID do usuário:', error);
          }

          // Continue com a lógica após o login
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(`Erro ao fazer login com o Google: ${errorCode} - ${errorMessage}`);
        });
    })
    .catch((error) => {
      console.error('Erro ao definir a persistência de autenticação:', error);
    });
};

function renderGoogleSignInButton() {
  return (
    <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn}>
      <Image
        source={{ uri: 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg' }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 20,
    height: 20,
  },
});

export default renderGoogleSignInButton;
