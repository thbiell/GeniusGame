import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
<<<<<<< HEAD
import { getAuth } from "firebase/auth";
=======
>>>>>>> 0e76042787cbb0dac24c751141d4f93c91b553d6

const firebaseConfig = {
  apiKey: "AIzaSyCgdrcu09sC1okyW4GNnEHnnsorQwXPkcY",
  authDomain: "my-first-project-f8081.firebaseapp.com",
<<<<<<< HEAD
  databaseURL: "https://my-first-project-f8081-default-rtdb.firebaseio.com",
=======
>>>>>>> 0e76042787cbb0dac24c751141d4f93c91b553d6
  projectId: "my-first-project-f8081",
  storageBucket: "my-first-project-f8081.appspot.com",
  messagingSenderId: "393505855606",
  appId: "1:393505855606:web:fd2eb3f15b2ff931b92757",
<<<<<<< HEAD
  measurementId: "G-5M1E9QD3QT"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const auth = getAuth(app);

export default firebaseConfig;
=======
  measurementId: "G-5M1E9QD3QT",
  databaseURL: "https://my-first-project-f8081-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase();
>>>>>>> 0e76042787cbb0dac24c751141d4f93c91b553d6
