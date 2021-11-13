import React, { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import styled from 'styled-components';
import scapegoatbanner2 from '../assets/scapegoatbanner2.png'
import ProductCard from '../Components/Products/ProductCard';
import { getAllProducts } from '../helpers/data/productData';

const LandingPage = styled.div`
  text-align: center;
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
      <img alt='scapegoat logo' src={scapegoatbanner2} height="500px" width="1000px"></img>
    </LandingPage>
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
