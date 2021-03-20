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
        skills.push(doc.data());
      });
      return skills;
    });
  const masteries = await masteriesRef
    .where("owner", "==", heroName)
    .get()
    .then((querySnapshot) => {
      let masteries = [];
      querySnapshot.forEach((doc) => {
        masteries.push(doc.data());
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
          result.push(doc.data());
        });
        res(result);
      });
  });
}

function updateKit(kit, type) {
  return new Promise((res) => {
    const ref = type === "skill" ? skillsRef : masteriesRef;
    ref
      .where("name", "==", kit.name)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs[0].id;
      })
      .then((id) => {
        ref.doc(id).update(kit);
        res();
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
          throw new Error("The skill name has already existed.");
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
