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
      .catch((err) => rej(err));
  });
}

function signIn(accountInfo) {
  return new Promise((res, rej) => {
    db.collection("users")
      .where("username", "==", accountInfo.username)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          throw new Error("The username is not correct.");
        } else {
          return querySnapshot.docs[0];
        }
      })
      .then((doc) => {
        if (doc.data().password !== accountInfo.password) {
          throw new Error("The password is not correct.");
        } else {
          res(doc.id);
        }
      })
      .catch((err) => rej(err));
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
      .catch(() => rej("Cannot get tasks."));
  });
}

function addTask(taskInfo) {
  return new Promise((res, rej) => {
    db.collection("tasks")
      .add(taskInfo)
      .then((doc) => {
        res(doc.id);
      })
      .catch(() => {
        rej(new Error("Cannot add a task."));
      });
  });
}

function editTask(taskInfo) {
  return new Promise((res, rej) => {
    const { id, title, content } = taskInfo;
    db.collection("tasks")
      .doc(id)
      .update({ title, content })
      .then(() => res())
      .catch(() => rej("Cannot edit the task."));
  });
}

function deleteTask(taskId) {
  return new Promise((res, rej) => {
    db.collection("tasks")
      .doc(taskId)
      .delete()
      .then(() => res())
      .catch(() => rej("Cannot delete the task."));
  });
}

export { signUp, signIn, getTasks, addTask, editTask, deleteTask };
