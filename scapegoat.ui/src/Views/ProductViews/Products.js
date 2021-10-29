import React, { useEffect, useState } from 'react';
import ProductCard from '../../Components/Products/ProductCard';
import { getAllProducts } from '../../helpers/data/productData';

const Products = () => { 
    const [products, setProducts] = useState([]);
  
    useEffect(() => getAllProducts().then(data => setProducts(data)), [setProducts]);
  
    return (
      <div>
        {
          products.length > 0
          ? products.map((prod, i) => (
            <ProductCard 
              key={i} 
              productId={prod.productId}
              productType={prod.productType}
              description={prod.description}
              merchantId={prod.merchantId}
              price={prod.price}
              size={prod.size}
              createdAt={prod.createdAt}
              setProducts={setProducts} 
            />))
          : <h1>No Products</h1>
        }
      </div>
    )
};

export default Products;