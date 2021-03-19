import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "../config/config.firebase";

try {
  firebase.initializeApp(firebaseConfig);
} catch {
  console.log("Firebase has already been installed.");
}

const db = firebase.firestore();

function heroKit(heroName) {
  return new Promise((res) => {
    db.collection("skills")
      .where("owner", "==", heroName)
      .get()
      .then((querySnapshot) => {
        let result = [];
        querySnapshot.forEach((doc) => {
          result.push(doc.data());
        });
        res(result);
      });
  });
}

// function skillEffects() {
//   return new Promise((res) => {
//     db.collection("skills")
//       .where("effects", "array-contains-any", keywords )
//       .get()
//       .then((querySnapshot) => {
//         querySnapshot.forEach();
//       })
//   });
// }

export { heroKit };
