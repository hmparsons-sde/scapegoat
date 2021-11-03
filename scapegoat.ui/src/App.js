import React, { useState, useEffect } from 'react';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './helpers/Routes';
import NavBar from './Components/Nav/Navbar';
import Footer from './Components/Nav/Footer';
import { getAllUsers } from './helpers/data/userData';


function App() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => getAllUsers().then(setUsers), []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        authed.getIdToken()
        .then((token) => sessionStorage.setItem('token', token));
        // get each thing
        setUser(user);
      } else {
        setUser(false);
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <NavBar setProducts={setProducts} setUsers={setUsers} setUser={setUser}/>
        <Routes
          products={products}
          setProducts={setProducts}
          users={users}
          setUsers={setUsers}
          user={user}
          setUser={setUser}
        />
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
