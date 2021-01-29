import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "../config/config.firebase";

try {
  firebase.initializeApp(firebaseConfig);
} catch (e) {
  console.log("Firebase has already been installed.");
}
const db = firebase.firestore();

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
          console.log(data.avatar);
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

export { signIn };
