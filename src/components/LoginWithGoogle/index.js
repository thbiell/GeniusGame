import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";


function renderGoogleSignInButton() {

    const handleGoogleSignIn = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                console.log("Usuário autenticado com sucesso!", user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(`Erro ao fazer login com o Google: ${errorCode} - ${errorMessage}`);
            });
    };

    return (
        <LinearGradient
            colors={['#000428', '#004E92']}
            style={styles.container}
        >
            <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn}>
                <Image
                    source={{ uri: 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg' }}
                    style={styles.image}
                />
            </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
