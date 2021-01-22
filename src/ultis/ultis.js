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
              res(querySnapshot.docs[0].id);
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
      .then(() => {
        res();
      })
      .catch(() => {
        rej(new Error("Error"));
      });
  });
}

function deleteTask(taskId) {
  return new Promise((res) => {
    db.collection("tasks")
      .doc(taskId)
      .update({
        owner: firebase.firestore.FieldValue.delete(),
      })
      .then(() => {
        res();
      });
  });
}

export { signUp, signIn, getTasks, addTask, editTask, deleteTask };
