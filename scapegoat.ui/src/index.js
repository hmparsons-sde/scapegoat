// import { initializeApp } from "firebase/app";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebaseConfig from './helpers/apiKeys';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
