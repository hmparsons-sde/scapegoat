import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './helpers/Routes';
import NavBar from './Components/Nav/Navbar';
import Footer from './Components/Nav/Footer';
// import { getAllProducts } from './helpers/data/productData';

function App() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  return (
    <div className="App">
      <Router>
        <NavBar setProducts={setProducts} setUsers={setUsers}/>
        <Routes
          products={products}
          setProducts={setProducts}
          users={users}
          setUsers={setUsers}
        />
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
