import React, { useState, useEffect } from 'react'
import { getSingleProduct } from '../../helpers/data/productData';
// import styled from 'styled-components';

export default function CartProducts({...item}) {
  const [orderProducts, setOrderProducts] = useState([]);

  useEffect(() => {
    getSingleProduct(item.productId).then(setOrderProducts);
  },[item.productId])

  // const OrderCard = styled.div`
  // width: 50rem;
  // height: 10rem;
  // background-color: #f5d5cf
  // `;
  return (
    <div>
      <h4>Product description: {orderProducts.description}</h4>
      <p>Price:$ {orderProducts.price}</p>
    </div>
  )
}
