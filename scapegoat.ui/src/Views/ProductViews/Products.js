import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import ProductCard from '../../Components/Products/ProductCard';
import ProductForm from '../../Components/Products/ProductForm';
import { getAllProducts, getProductsByType } from '../../helpers/data/productData';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [addProduct, setAddProduct] = useState(false);
  
    useEffect(() => { 
      getAllProducts().then(data => setProducts(data));
      getProductsByType('SmallHerd');
    }, [setProducts]);
  
    return (
      <div>
        <nav className='product-header'>
          <h1>All Products</h1>
          <div className='product-header-filter'>
            <div className='filter-buttons'>
              {
                addProduct
                ? <Button onClick={() => setAddProduct(!addProduct)}>Cancel</Button>
                : <Button outline onClick={() => setAddProduct(!addProduct)}>Add Product</Button>
              }
            </div>
          </div>
        </nav>
          {
            addProduct
            ? <div className='p-4'>
                <ProductForm
                  setAddProduct={setAddProduct}
                  setProducts={setProducts}
                />
             </div>
            : ''
          }
        <div className='products-container p-2'>
          {
            products.length > 0 && addProduct === false
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
                setProducts={setProducts} />))
            : ''
          }
        </div>
      </div>
    )
};

export default Products;