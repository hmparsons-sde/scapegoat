import React from 'react';
import ReactDOM from 'react-dom';
import '../src/styles/index.css';
import App from './App';
import firebaseConfig from './helpers/apiKeys';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
