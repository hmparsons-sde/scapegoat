import React, { useEffect, useState } from 'react';
import ProductCard from '../../Components/Products/ProductCard';
import { getAllProducts } from '../../helpers/data/productData';

const Products = () => { 
    const [products, setProducts] = useState([]);
  
    useEffect(() => getAllProducts().then(data => setProducts(data)), []);
  
    return (
      <div>
        {
          products 
          ? products.map((product, i) => (<ProductCard key={i} product={product} products={products} setProducts={setProducts} />))
          : ''
        }
      </div>
    )
};

export default Products;