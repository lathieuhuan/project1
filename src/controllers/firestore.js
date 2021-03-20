import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "../config/config.firebase";

try {
  firebase.initializeApp(firebaseConfig);
} catch {
  console.log("Firebase has already been installed.");
}

const db = firebase.firestore(),
  skillsRef = db.collection("skills"),
  masteriesRef = db.collection("masteries");

async function heroKit(heroName) {
  const skills = await skillsRef
    .where("owner", "==", heroName)
    .get()
    .then((querySnapshot) => {
      let skills = [];
      querySnapshot.forEach((doc) => {
        skills.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      return skills;
    });
  const masteries = await masteriesRef
    .where("owner", "==", heroName)
    .get()
    .then((querySnapshot) => {
      let masteries = [];
      querySnapshot.forEach((doc) => {
        masteries.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      return masteries;
    });
  return { skills, masteries };
}

function kitCate(keywords, type) {
  return new Promise((res) => {
    const ref = type === "skill" ? skillsRef : masteriesRef;
    ref
      .where("categories", "array-contains-any", keywords)
      .get()
      .then((querySnapshot) => {
        let result = [];
        querySnapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        res(result);
      });
  });
}

function updateKit(oriKit, type) {
  let kit = { ...oriKit },
    { id } = kit;
  delete kit.id;
  return new Promise((res, rej) => {
    const ref = type === "skill" ? skillsRef : masteriesRef;
    ref
      .doc(id)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.data().name === kit.name) {
          ref.doc(id).update(kit);
          res();
        }
      })
      .then(() => {
        ref
          .where("name", "==", kit.name)
          .limit(1)
          .get()
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              throw new Error("Name existed.");
            }
          })
          .then(() => {
            ref.doc(id).update(kit);
            res();
          })
          .catch((err) => rej(err));
      });
  });
}

function addKit(kit, type) {
  return new Promise((res, rej) => {
    const ref = type === "skill" ? skillsRef : masteriesRef;
    ref
      .where("name", "==", kit.name)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          throw new Error("Name existed.");
        }
      })
      .then(() => {
        ref.add(kit);
        res();
      })
      .catch((err) => rej(err));
  });
}

function deleteKit(name, type) {
  return new Promise((res) => {
    const ref = type === "skill" ? skillsRef : masteriesRef;
    ref
      .where("name", "==", name)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs[0].id;
      })
      .then((id) => {
        ref.doc(id).delete();
        res();
      });
  });
}

export { heroKit, kitCate, updateKit, addKit, deleteKit };
