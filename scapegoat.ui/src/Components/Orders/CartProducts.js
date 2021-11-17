import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { getSingleProduct } from '../../helpers/data/productData';

export default function CartProducts({ item }) {
  const [orderProducts, setOrderProducts] = useState([]);

  useEffect(() => {
    getSingleProduct(item.productId).then(setOrderProducts);
  },[item.productId])


  return (
    <div>
      <ProductOrderImage>
      <img src={orderProducts.productImage} alt={orderProducts.description}></img>
      </ProductOrderImage>
      <h4>Product description: {orderProducts.description}</h4>
      <p>Price:$ {orderProducts.price}</p>
    </div>
  )
}

const ProductOrderImage = styled.div`
img {
  object-fit: cover;
  width: 250px;
  height: 250px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 5%;
  padding: 3%;
}
`;
