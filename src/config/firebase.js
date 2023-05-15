import { initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyAVIrkrD030oG2nstZytOXGlNVYb_SCAPY",
  authDomain: "geniusgamev2.firebaseapp.com",
  projectId: "geniusgamev2",
  storageBucket: "geniusgamev2.appspot.com",
  messagingSenderId: "458689954562",
  appId: "1:458689954562:web:6020ab30607df82077b81b",
  measurementId: "G-3TN7RRVPTS",
  databaseURL: "https://geniusgamev2-default-rtdb.firebaseio.com/"
};

firebase.initializeApp(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export default {firebase, app, analytics, database};
