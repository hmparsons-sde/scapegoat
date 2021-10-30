import React from "react";
import styled from 'styled-components';

const SingleProductCard = styled.div`
  width: 300px;
  height: auto;
  margin: 15px;
  border-style: solid;
  box-shadow: 50px;
`;

export default function SingleProduct(product) {
  console.log(product);
  return (
    <SingleProductCard>
      <div>
        <h4 tag="h4" className='mt-1'>
          Product Type: {product.product.productType} 
        </h4><br/>
        <h5>Description: {product.product.description}
        </h5> <br/>
      </div>
    </SingleProductCard>
  )
}
