import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import ProductCard from '../../Components/Products/ProductCard';
import { getMerchantProducts } from '../../helpers/data/productData';
import { getSingleUser } from '../../helpers/data/userData';

const FlexyDiv = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
padding: 2rem;
`;

const PageWrapper = styled.div`
background-size:auto, 100% 100%;
font-size: 16px;
line-height: 1.5;
font-weight: 300;
min-height: 100%;
overflow-y: scroll;
width: 100%;
margin: 50px;

h1, h3, h4 {
  font-weight: 300;
  line-height: 1.2;
}
}`;

export default function MerchantProducts() {
  const [merchProds, setMerchProds] = useState([]);
  const [merchant, setMerchant] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getMerchantProducts(id).then(setMerchProds);
    getSingleUser(id).then(setMerchant);
  }, [id]);

  return (
    <PageWrapper>
      <h1>All Products by {merchant.firstName} {merchant.lastName}</h1>
      {merchProds
      ? <FlexyDiv>
        {
          merchProds.map((prod) => (
          <ProductCard 
          key={prod.productId}
          productId={prod.productId}
          productType={prod.productType}
          description={prod.description}
          merchantId={prod.merchantId}
          price={prod.price}
          size={prod.size}
          createdAt={prod.createdAt}
          />
          ))
        }
      </FlexyDiv>
      : <p>Merchant has no products</p>
    }
    </PageWrapper>
  )
};
 