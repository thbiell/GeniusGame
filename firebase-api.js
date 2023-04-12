import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCgdrcu09sC1okyW4GNnEHnnsorQwXPkcY",
  authDomain: "my-first-project-f8081.firebaseapp.com",
  projectId: "my-first-project-f8081",
  storageBucket: "my-first-project-f8081.appspot.com",
  messagingSenderId: "393505855606",
  appId: "1:393505855606:web:fd2eb3f15b2ff931b92757",
  measurementId: "G-5M1E9QD3QT",
  databaseURL: "https://my-first-project-f8081-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase();
