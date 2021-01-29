import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "../config/config.firebase";

try {
  firebase.initializeApp(firebaseConfig);
} catch {
  console.log("Firebase has already been installed.");
}
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

function signUp(accountInfo) {
  return new Promise((res, rej) => {
    const { userId, password, email } = accountInfo;
    db.collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          throw new Error("Username existed.");
        }
      })
      .then(() => {
        db.collection("users").doc(userId).set({
          username: userId,
          password: password,
          gender: "",
          dob: "",
          townOcity: "",
          email: email,
          about: "",
        });
        res();
      })
      .catch((err) => {
        rej(err);
      });
  });
}

function signIn(accountInfo) {
  return new Promise((res, rej) => {
    const { userId, password } = accountInfo;
    db.collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          throw new Error("The username is not correct.");
        } else {
          return doc.data();
        }
      })
      .then((data) => {
        if (data.password !== password) {
          throw new Error("The password is not correct.");
        } else {
          res(data);
        }
      })
      .catch((err) => {
        rej(err);
      });
  });
}

function getUserInfo(user) {
  return new Promise((res, rej) => {
    db.collection("users")
      .doc(user)
      .get()
      .then((doc) => {
        res(doc.data());
      })
      .catch(() => {
        rej(new Error("Cannot get the info."));
      });
  });
}

function editUserInfo(userId, info) {
  return new Promise((res) => {
    db.collection("users")
      .doc(userId)
      .update({ ...info })
      .then(() => {
        res();
      });
  });
}

export { getGames, signUp, signIn, getUserInfo, editUserInfo };
