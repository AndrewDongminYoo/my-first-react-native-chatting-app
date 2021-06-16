import firebase from 'firebase';
import config from '../../firebase.json';

const app = firebase.initializeApp(config);

const Auth = app.auth();

const uploadImage = async uri => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const user = Auth.currentUser;
  const ref = app.storage().ref(`/profile/${user.uid}/photo.png`);
  const snapshot = await ref.put(blob, { contentType: 'image/png'});

  blob.close();
  return await snapshot.ref.getDownloadURL();
};

export const login = async ({ email, password }) => {
  const { user } = await Auth.signInWithEmailAndPassword(email, password)
  return user;
};

export const logout = async () => {
  return await Auth.signOut();
};

export const signup = async ({ name, email, password, photoUrl }) => {
  const { user } = await Auth.createUserWithEmailAndPassword(email, password);
  const storageUrl = photoUrl.startsWith('https')
    ? photoUrl
    : await uploadImage(photoUrl);
  await user.updateProfile({
    displayName: name,
    photoURL: storageUrl,
  });
  return user;
}