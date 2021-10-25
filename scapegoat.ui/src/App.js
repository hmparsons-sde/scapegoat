import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './helpers/Routes';
// import { getAllProducts } from './helpers/data/productData';

function App() {
  const [products, setProducts] = useState([]);

  return (
    <div className="App">
      <Router>
      <Routes
      products={products}
      setProducts={setProducts}
      />
      </Router>
    </div>
  );
}

export default App;
