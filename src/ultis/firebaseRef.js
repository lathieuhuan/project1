import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { firebaseConfig } from "../config/config.firebase";

try {
  firebase.initializeApp(firebaseConfig);
} catch {
  console.log("Firebase has already been installed.");
}

export const db = firebase.firestore(),
  usersRef = db.collection("users"),
  gamesRef = db.collection("games"),
  highscoresRef = db.collection("highscores"),
  storageRef = firebase.storage().ref();
