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
  gamesRef = db.collection("games"),
  highscoresRef = db.collection("highscores");

function getGames(keywords) {
  return new Promise((res, rej) => {
    if (keywords === "all") {
      gamesRef
        .get()
        .then((querySnapshot) => {
          let result = [];
          querySnapshot.forEach((doc) => {
            result.push({
              gameTitle: doc.id,
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
        .where("searchTerms", "array-contains-any", keywords)
        .get()
        .then((querySnapshot) => {
          let result = [];
          querySnapshot.forEach((doc) => {
            result.push({
              gameTitle: doc.id,
              ...doc.data(),
            });
          });
          if (result.length > 0) {
            res(result);
          } else {
            throw new Error("Cannot get the games.");
          }
        })
        .catch((err) => {
          rej(err);
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
    const { username, password, email } = accountInfo;
    usersRef
      .doc(username)
      .get()
      .then((doc) => {
        if (doc.exists) {
          throw new Error("Username existed.");
        }
      })
      .then(() => {
        usersRef.doc(username).set({
          username,
          password,
          gender: "",
          dob: "",
          townOcity: "",
          email,
          about: "",
        });
        res();
      })
      .catch((err) => rej(err));
  });
}

function signIn(accountInfo) {
  return new Promise((res, rej) => {
    const { username, password } = accountInfo;
    usersRef
      .doc(username)
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
      .catch((err) => rej(err));
  });
}

function getUserInfo(userId) {
  return new Promise((res, rej) => {
    usersRef
      .doc(userId)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          throw new Error("There is no such user.");
        } else {
          res(doc.data());
        }
      })
      .catch((err) => rej(err));
  });
}

function editUserInfo(userId, info) {
  return new Promise((res, rej) => {
    usersRef
      .doc(userId)
      .update(info)
      .then(() => res())
      .catch(() => rej(new Error("Cannot update the info.")));
  });
}

function getUsername(userId) {
  return new Promise((res, rej) => {
    usersRef
      .doc(userId)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          throw new Error("There is no such user.");
        } else {
          res(doc.data().username);
        }
      })
      .catch((err) => rej(err));
  });
}

function subscribeHighscores(gameTitle, listener) {
  highscoresRef
    .where("gameTitle", "==", gameTitle)
    .onSnapshot(async (querySnapshot) => {
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push(
          new Promise((res) => {
            getUsername(doc.data().userId).then((username) => {
              res({
                id: doc.id,
                username,
                ...doc.data(),
              });
            });
          })
        );
      });
      listener(await Promise.all(result));
    });
}

function addHighscore(score) {
  highscoresRef.add(score);
}

function updateHighscore(highscoreId, score) {
  highscoresRef.doc(highscoreId).update(score);
}

export {
  getGames,
  getUsers,
  signUp,
  signIn,
  getUserInfo,
  editUserInfo,
  subscribeHighscores,
  addHighscore,
  updateHighscore,
};
