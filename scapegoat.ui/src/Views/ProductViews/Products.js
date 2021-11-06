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
        <nav className='product-header'>
          <h1>Products</h1>
          <div className='product-header-filter'>
            <div className='filter-buttons'>
              {
                addProduct
                ? <Button outline onClick={() => setAddProduct(!addProduct)}>Cancel</Button>
                : <Button outline onClick={() => setAddProduct(!addProduct)}>Add Product</Button>
              }
            </div>
          </div>
        </nav>
          {
            addProduct
            ? <ProductForm
                setAddProduct={setAddProduct}
                setProducts={setProducts}
             />
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