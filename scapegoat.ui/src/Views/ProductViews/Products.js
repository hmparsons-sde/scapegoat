import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import ProductCard from '../../Components/Products/ProductCard';
import ProductForm from '../../Components/Products/ProductForm';
import { getAllProducts } from '../../helpers/data/productData';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [addProduct, setAddProduct] = useState(false);
  
    useEffect(() => { 
      getAllProducts().then((response) => {
        setProducts(response);
      });
    }, []);
  
    return (
      <div>
        <nav className='product-header'>
          <h1>Product Catgories</h1>
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
      
      : <div className='products-container p-2 d-flex flex-column justify-content-start'>
          <h2 className='product-title'>Single Goats</h2>
          <div className='product-category-container'>
            {
              products.length > 0 && addProduct === false
              ? products.filter(goat => goat.productType === 'Single').map((prod, i) => (
                <ProductCard
                  key={i}
                  productId={prod.productId}
                  productType={prod.productType}
                  description={prod.description}
                  merchantId={prod.merchantId}
                  price={prod.price}
                  size={prod.size}
                  createdAt={prod.createdAt.split('T')[0]}
                  setProducts={setProducts} />))
              : ''
            }
          </div>
          <h2 className='product-title'>Small Herds</h2>
          <div className='product-category-container'>
          {
             products > 0 && addProduct === false
             ? products.filter(goat => goat.productType === 'SmallHerd').map((prod, i) => (
               <ProductCard
                 key={i}
                 productId={prod.productId}
                 productType={prod.productType}
                 description={prod.description}
                 merchantId={prod.merchantId}
                 price={prod.price}
                 size={prod.size}
                 createdAt={prod.createdAt.split('T')[0]}
                 setProducts={setProducts} />))
             : ''
          }
          </div>
          <h2 className='product-title'>Large Herds</h2>
          <div className='product-category-container'>
          {
             products.length > 0 && addProduct === false
             ?  products.filter(goat => goat.productType === 'LargeHerd').map((prod, i) => (
               <ProductCard
                 key={i}
                 productId={prod.productId}
                 productType={prod.productType}
                 description={prod.description}
                 merchantId={prod.merchantId}
                 price={prod.price}
                 size={prod.size}
                 createdAt={prod.createdAt.split('T')[0]}
                 setProducts={setProducts} />))
             : ''
          }
          </div>
        </div>
        }
      </div>
    )
};

export default Products;