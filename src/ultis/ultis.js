import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "../config/config.firebase";

try {
  firebase.initializeApp(firebaseConfig);
} catch {
  console.log("Firebase has already been installed.");
}
const db = firebase.firestore(),
  usersRef = db.collection("users"),
  gamesRef = db.collection("games");

function getGames(key) {
  return new Promise((res, rej) => {
    if (key === undefined || key === null) {
      gamesRef
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
    } else {
      gamesRef
        .where("gameName", ">=", key)
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
    }
  });
}

function getUsers(keyword) {
  return new Promise((res, rej) => {
    if (keyword === undefined) {
      usersRef
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
          rej(new Error("Cannot get the users."));
        });
    } else {
      usersRef
        .where("username", "in", keyword)
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
          rej(new Error("Cannot get the users."));
        });
    }
  });
}

function signUp(accountInfo) {
  return new Promise((res, rej) => {
    const { userId, password, email } = accountInfo;
    usersRef
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
    usersRef
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

function getUserInfo(userId) {
  return new Promise((res, rej) => {
    usersRef
      .doc(userId)
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
  return new Promise((res, rej) => {
    usersRef
      .doc(userId)
      .update({ ...info })
      .then(() => {
        res();
      })
      .catch(() => {
        rej(new Error("Cannot update the info."));
      });
  });
}

export { getGames, getUsers, signUp, signIn, getUserInfo, editUserInfo };
