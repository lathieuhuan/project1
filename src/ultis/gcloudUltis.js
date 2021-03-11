import { storageRef } from "./firebaseRef";

export function uploadAvatar(file, userId) {
  return new Promise((res, rej) => {
    storageRef
      .child("avatars/" + userId)
      .put(file)
      .then((snapshot) => {
        res(snapshot.ref.getDownloadURL());
      })
      .catch((err) => rej(err));
  });
  // full example at https://firebase.google.com/docs/storage/web/upload-files?authuser=0
}
