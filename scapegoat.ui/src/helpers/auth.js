import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import axios from 'axios';

// modifies outgoing request - adds header
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
        display_name: user.user?.displayName,
        image_Url: user.user?.photoURL,
        firebase_Uid: user.user?.uid,
        email: user.user?.email,
      }

      //POST Method to add to api & db
      // axios.post(`${firebaseConfig.databaseUrl}`, userObj);
      window.location.href = '/';
    }
  });
};

const signOutUser = () => new Promise((resolve, reject) => {
  firebase.auth().signOut().then(resolve).catch(reject);
});

export { signInUser, signOutUser };
