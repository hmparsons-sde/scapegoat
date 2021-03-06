import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import axios from 'axios';
import { createNewUser } from './data/userData';

const getFirebaseKey = () => firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    return user.uid;
  }
  return console.warn('no user logged in.');
});

axios.interceptors.request.use((request) => {
    const token = sessionStorage.getItem('token');

    if (token != null) {
        request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
  }, (err) => {
    return Promise.reject(err);
  });

const signInUser = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then((user) => {
    if (user.additionalUserInfo?.isNewUser){
      const userInfo = {
        FirebaseKey: user.user?.uid,
       }
      createNewUser(userInfo);
      window.location.href = '/';
    }
  });
};

const signOutUser = () => new Promise((resolve, reject) => {
  firebase.auth().signOut().then(resolve).catch(reject);
  window.location.href = '/';
});

export { getFirebaseKey, signInUser, signOutUser };
