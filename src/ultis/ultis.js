import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "../config/config.firebase";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function getGames() {
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

function signIn(userInfo) {
  return new Promise((res, rej) => {
    const { username, password } = userInfo,
      usernameRef = db.collection("users").where("username", "==", username);
    usernameRef
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          throw new Error("The username is not correct.");
        }
      })
      .then(() => {
        usernameRef
          .where("password", "==", password)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.empty) {
              throw new Error("The password is not correct.");
            } else {
              res(querySnapshot.docs[0].data());
            }
          })
          .catch((err) => {
            rej(err);
          });
      })
      .catch((err) => {
        rej(err);
      });
  });
}

export { getGames, signIn };
