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
        } else {
          const doc = querySnapshot.docs[0];
          if (doc.data().password !== password) {
            throw new Error("The password is not correct.");
          } else {
            return {
              id: doc.id,
              ...doc.data(),
            };
          }
        }
      })
      .then((info) => {
        delete info.password;
        // console.log(info);
        res(info);
      })
      .catch((err) => {
        rej(err);
      });
  });
}

function getConvers(userId) {
  return db
    .collection("conversations")
    .where("userIds", "array-contains", userId)
    .get()
    .then((querySnapshot) => {
      let convers = [];
      querySnapshot.forEach((doc) => {
        convers.push({
          ...doc.data(),
        });
      });
      // console.log(convers);
      return convers;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

function test(userId) {
  getConvers(userId).then((convers) => {
    let chatFrs = convers.map((conver) => {
      return conver.userIds.filter((val) => val !== userId);
    });
    console.log(chatFrs);
    return chatFrs;
  });
}

// signIn({ username: "userA", password: "A123" });
// getConvers("nNgjPz58plLZNnI9pVim");
test("nNgjPz58plLZNnI9pVim");

export { signIn };
