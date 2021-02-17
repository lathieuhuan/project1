import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "../config/config.firebase";

try {
  firebase.initializeApp(firebaseConfig);
} catch (e) {
  console.log("Firebase has already been installed.");
}
const db = firebase.firestore();

function signIn(accInfo) {
  return new Promise((res, rej) => {
    db.collection("users")
      .where("username", "==", accInfo.username)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          throw new Error("The username is not correct.");
        } else {
          const doc = querySnapshot.docs[0];
          if (doc.data().password !== accInfo.password) {
            throw new Error("The password is not correct.");
          } else {
            res({
              id: doc.id,
              username: doc.data().username,
              avatar: doc.data().avatar,
            });
          }
        }
      })
      .catch((err) => {
        rej(err);
      });
  });
}

function getUserInfo(userId) {
  return new Promise((res) => {
    db.collection("users")
      .doc(userId)
      .get()
      .then((querySnapshot) => {
        // const result = { ...querySnapshot.data() };
        // delete result.password;
        // res(result);
        const data = querySnapshot.data();
        res({
          username: data.username,
          avatar: data.avatar,
        });
      });
  });
}

// function getConvers(userId) {
//   return db
//     .collection("conversations")
//     .where("userIds", "array-contains", userId)
//     .get()
//     .then((querySnapshot) => {
//       let convers = [];
//       querySnapshot.forEach((doc) => {
//         convers.push({
//           id: doc.id,
//           ...doc.data(),
//         });
//       });
//       // console.log(convers);
//       return convers;
//     })
//     .catch((error) => {
//       console.log(error);
//       throw error;
//     });
// }

// function test(userId) {
//   return getConvers(userId)
//     .then((convers) => {
//       let foo = convers.map((conver) => {
//         return {
//           converId: conver.id,
//           chatFr: conver.userIds.filter((val) => val !== userId),
//         };
//       });
//       // console.log(foo);
//       return foo;
//     })
//     .then((convers) => {
//       const refinedConvers = convers.map((conver) => {
//         return new Promise((res, rej) => {
//           getUserInfo(conver.chatFr[0])
//             .then((userInfo) => {
//               res({
//                 converId: conver.converId,
//                 chatFrInfo: userInfo,
//               });
//             })
//             .catch((error) => {
//               console.log(error);
//               rej(error);
//             });
//         }).catch((error) => {
//           console.log(error);
//           throw error;
//         });
//       });
//       return Promise.all(refinedConvers);
//     });
// }

function getConversOf(userId) {
  return new Promise((res) => {
    db.collection("conversations")
      .where("userIds", "array-contains", userId)
      .get()
      .then((querySnapshot) => {
        let convers = [];
        querySnapshot.forEach((doc) => {
          const chatFrs = doc
            .data()
            .userIds.filter((participants) => participants !== userId);
          convers.push(
            new Promise((res) => {
              getUserInfo(chatFrs[0]).then((userInfo) => {
                res({
                  id: doc.id,
                  frInfo: userInfo,
                });
              });
            })
          );
        });
        res(Promise.all(convers));
      });
  });
}

function subscribeConver(converId, listener) {
  db.collection("messages")
    .where("converId", "==", converId)
    .onSnapshot((observer) => {
      observer.docChanges().forEach((change) => {
        if (change.type === "added") {
          listener(change.doc.data());
        }
      });
    });
}

async function sendMessage(message) {
  const doc = await db.collection("messages").add(message);
  return doc.id;
}

export { signIn, getConversOf, subscribeConver, sendMessage };
