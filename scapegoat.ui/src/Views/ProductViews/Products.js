import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import ProductCard from '../../Components/Products/ProductCard';
import ProductForm from '../../Components/Products/ProductForm';
import { getAllProducts, getProductsByType } from '../../helpers/data/productData';

const Products = () => {
    const [singles, setSingles] = useState([]);
    const [products, setProducts] = useState([]);
    const [smallHerds, setSmallHerds] = useState([]);
    const [largeHerds, setLargeHerds] = useState([]);
    const [addProduct, setAddProduct] = useState(false);
  
    useEffect(() => { 
      getAllProducts().then(setProducts);
      getProductsByType('Single').then(setSingles);
      getProductsByType('SmallHerd').then(setSmallHerds);
      getProductsByType('LargeHerd').then(setLargeHerds);
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
            : ''
          }
        <div className='products-container p-2 d-flex flex-column'>
          <h1>Single Goats</h1>
          {
            singles.length > 0 && addProduct === false
            ? singles.map((prod, i) => (
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
          <h1>Small Herds</h1>
          {
             smallHerds.length > 0 && addProduct === false
             ? smallHerds.map((prod, i) => (
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
          <h1>Large Herds</h1>
          {
             largeHerds.length > 0 && addProduct === false
             ? largeHerds.map((prod, i) => (
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