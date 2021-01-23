import firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "../config/config.firebase";

firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();

export function test() {
  console.log("test.");
}
