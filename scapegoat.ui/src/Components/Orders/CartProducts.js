import React, { useState, useEffect } from 'react'
import { getSingleProduct } from '../../helpers/data/productData';

export default function CartProducts({ item }) {
  const [orderProducts, setOrderProducts] = useState([]);

  useEffect(() => {
    getSingleProduct(item.productId).then(setOrderProducts);
  },[item.productId])


  return (
    <div>
      <img src={orderProducts.productImage} alt={orderProducts.description}></img>
      <h4>Product description: {orderProducts.description}</h4>
      <p>Price:$ {orderProducts.price}</p>
    </div>
  )
}
