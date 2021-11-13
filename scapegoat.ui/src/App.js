
import './styles/App.css';
import React, { useState, useEffect } from 'react';
import '../src/styles/App.css';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './helpers/Routes';
import NavBar from './Components/Nav/Navbar';
import Footer from './Components/Nav/Footer';
import { getUserByFBKey } from './helpers/data/userData';


function App() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    getUserByFBKey(user.uid).then(resp => setIsAdmin(resp.isAdmin))
  }, [user.uid])

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        authed.getIdToken()
        .then((token) => sessionStorage.setItem('token', token));
        setUser(authed);
      } else {
        setUser(false);
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <NavBar user={user} setProducts={setProducts} setUsers={setUsers} setUser={setUser} isAdmin={isAdmin}/>
        <Routes
          products={products}
          setProducts={setProducts}
          users={users}
          setUsers={setUsers}
          user={user}
          setUser={setUser}
          isAdmin={isAdmin}
        />
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
