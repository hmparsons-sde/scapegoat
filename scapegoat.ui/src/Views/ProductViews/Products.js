import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import ProductCard from '../../Components/Products/ProductCard';
import ProductForm from '../../Components/Products/ProductForm';
import { getAllProducts } from '../../helpers/data/productData';

const Products = () => { 
    const [products, setProducts] = useState([]);
    const [addProduct, setAddProduct] = useState(false);
  
    useEffect(() => getAllProducts().then(data => setProducts(data)), [setProducts]);
  
    return (
      <div>
        <Button onClick={() => setAddProduct(!addProduct)}>Add</Button>
        {
          addProduct
          ? <ProductForm
              addProduct={addProduct}
              setAddProduct={setAddProduct} 
              setProducts={setProducts}
            />
          : ''
        }
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