import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import styled from 'styled-components';
import ProductCard from '../../Components/Products/ProductCard';
import ProductForm from '../../Components/Products/ProductForm';
import { getAllProducts } from '../../helpers/data/productData';

const ProductViewStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`

const Products = () => { 
    const [products, setProducts] = useState([]);
    const [addProduct, setAddProduct] = useState(false);
  
    useEffect(() => getAllProducts().then(data => setProducts(data)), [setProducts]);
  
    return (
      <>
        {addProduct
          ? ''
          : <Button onClick={() => setAddProduct(!addProduct)}>Add Product</Button>
        }
        <ProductViewStyle>
          {addProduct
            ? <ProductForm
              addProduct={addProduct}
              setAddProduct={setAddProduct}
              setProducts={setProducts} />
            : ''}
          {products.length > 0 || addProduct === true
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
            : <h1>No Products</h1>}
        </ProductViewStyle>
      </>
    )
};

export default Products;