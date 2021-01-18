import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "../config/config.firebase";

try {
  firebase.initializeApp(firebaseConfig);
} catch (e) {
  console.log("Firebase has already been installed.");
}
const db = firebase.firestore();

export function signUp(userInfo) {
  return new Promise((res, rej) => {
    const { username, password } = userInfo;
    db.collection("users")
      .where("username", "==", username)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          throw new Error("Existed");
        }
      })
      .then(() => {
        db.collection("users")
          .add({ username: username, password: password })
          .then((data) => {
            console.log("Success");
            res(data.id);
          });
      })
      .catch((err) => {
        rej(err);
      });
  });
}

export function addTodo(todoInfo) {
  return new Promise((res, rej) => {
    const { owner, title, content } = todoInfo;
    db.collection("todo")
      .add({
        owner: owner,
        title: title,
        content: content,
      })
      .then((data) => {
        res(data.id);
      })
      .catch(() => {
        rej(new Error("Error"));
      });
  });
}
