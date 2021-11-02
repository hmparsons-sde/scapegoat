import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInUser = () => {
  // const provider = new firebase.auth.GoogleAuthProvider();
  // firebase.auth().signInWithPopup(provider);
  signInWithPopup(auth, provider);
};
// const signOutUser = () => new Promise((resolve, reject) => {
//   firebase.auth().signOut().then(resolve).catch(reject);
// });
export { signInUser };
