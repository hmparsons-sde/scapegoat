import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import styled from 'styled-components';
import scapegoatbanner2 from '../assets/scapegoatbanner2.png'
import ProductCard from '../Components/Products/ProductCard';
import { getAllProducts } from '../helpers/data/productData';

const LandingPage = styled.div`
  background-color: #FDF1E9;
  color: #4B4F3F;
`;

export default function Home() {
  const [homeProducts, setHomeProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then(setHomeProducts);
  }, []);

  return (
    <>
    <LandingPage>
      <img alt='scapegoat logo' src={scapegoatbanner2} className='home-image'></img>
    </LandingPage>
    <div className='d-flex justify-content-center mb-4'>
      <h2>Latest Products</h2>
    </div>
    <div className='product-category-container'>
      {
        homeProducts?
        homeProducts.slice(0, 20).map((prod, i) => (
          <ProductCard 
            key={i}
            productId={prod.productId}
            productType={prod.productType}
            description={prod.description}
            merchantId={prod.merchantId}
            price={prod.price}
            size={prod.size}
            createdAt={prod.createdAt.split('T')[0]}
          />))
        : ''
      }
    </div>
    </>
  );
}
