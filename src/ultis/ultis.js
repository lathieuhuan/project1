import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "../config/config.firebase";

try {
  firebase.initializeApp(firebaseConfig);
} catch (e) {
  console.log("Firebase has already been installed.");
}
const db = firebase.firestore();

function signUp(userInfo) {
  return new Promise((res, rej) => {
    const { username, password } = userInfo;
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
          .add({ username: username, password: password })
          .then((data) => {
            res(data.id);
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
      .where("password", "==", password)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          throw new Error("No account found.");
        } else {
          res(querySnapshot.docs[0].id);
        }
      })
      .catch((err) => {
        rej(err);
      });
  });
}

function addTask(taskInfo) {
  return new Promise((res, rej) => {
    const { owner, title, content } = taskInfo;
    db.collection("tasks")
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

function editTask(taskInfo) {
  return new Promise((res, rej) => {
    const { taskId, title, content } = taskInfo;
    db.collection("tasks")
      .doc(taskId)
      .update({
        title: title,
        content: content,
      })
      .catch(() => {
        rej(new Error("Error"));
      });
  });
}

function getTasks(userId) {
  return new Promise((res, rej) => {
    db.collection("tasks")
      .where("owner", "==", userId)
      .get()
      .then((querySnapshot) => {
        const tasks = [];
        querySnapshot.forEach((doc) => {
          tasks.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        res(tasks);
      })
      .catch(() => {
        rej(new Error("Error"));
      });
  });
}

export { signUp, signIn, addTask, editTask, getTasks };
