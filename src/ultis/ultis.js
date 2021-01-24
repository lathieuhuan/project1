import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "../config/config.firebase";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export function getGames() {
  return new Promise((res, rej) => {
    db.collection("games")
      .get()
      .then((querySnapshot) => {
        let result = [];
        querySnapshot.forEach((doc) => {
          result.push({
            ...doc.data(),
          });
        });
        res(result);
      })
      .catch(() => {
        rej(new Error("Cannot get the games."));
      });
  });
}
