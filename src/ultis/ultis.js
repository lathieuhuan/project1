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

function signUp(userInfo) {
  return new Promise((res, rej) => {
    const { username, password, email } = userInfo;
    db.collection("users")
      .where("username", "==", username)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          throw new Error("Username existed.");
        }
      })
      .then(() => {
        db.collection("users")
          .add({
            username: username,
            nickname: username,
            password: password,
            email: email,
          })
          .then((doc) => {
            res(doc.id);
          });
      })
      .catch((err) => {
        rej(err);
      });
  });
}

function signIn(userInfo) {
  return new Promise((res, rej) => {
    const { username, password } = userInfo;
    db.collection("users")
      .where("username", "==", username)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          throw new Error("The username is not correct.");
        }
        return querySnapshot;
      })
      .then((querySnapshot) => {
        const data = querySnapshot.docs[0].data();
        if (data.password === password) {
          res(data);
        } else {
          throw new Error("The password is not correct.");
        }
      })
      .catch((err) => {
        rej(err);
      });
  });
}

function getUserInfo(username) {
  return new Promise((res, rej) => {
    db.collection("users")
      .where("username", "==", username)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        res(querySnapshot.docs[0].data());
      })
      .catch(() => {
        rej(new Error("Cannot get the info."));
      });
  });
}

function editUserInfo(username, info) {
  return new Promise((res) => {
    db.collection("users")
      .where("username", "==", username)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs[0].id;
      })
      .then((id) => {
        db.collection("users")
          .doc(id)
          .update({ ...info });
        res();
      });
  });
}

export { getGames, signUp, signIn, getUserInfo, editUserInfo };
