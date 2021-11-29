import React, { useState } from 'react';
import styled from 'styled-components';
import { updateOrderItem } from '../../helpers/data/orderData';

const CartForm = styled.form`
margin-top: 1rem;
`;

const CartButton = styled.button`
width: 15rem;
height: 2rem;
background-color: black;
color: white;
cursor: pointer;
margin: 1rem;
border-radius: 25px;
`;

const CartInput = styled.input`
width: 2rem;
margin-left: 1rem;
text-align: center;
`;


export default function UpdateCartItem({ setUpdateSwitch, ...orderItem }) {
  const [orderItemObj, setOrderItemObj] = useState({
    id: orderItem?.id || '',
    orderId: orderItem?.orderId || '',
    productId: orderItem?.productId || '',
    quantity: orderItem?.quantity || 0,
  });

  const handleInputChange = (e) => {
    setOrderItemObj((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      updateOrderItem(orderItemObj).then(setUpdateSwitch);
  };


  return (
    <div>
      <CartForm autoComplete='off' onSubmit={handleSubmit}>
        <label>Item Quantity:</label>
        <CartInput type='number' name='quantity' value={orderItemObj.quantity} onChange={handleInputChange}></CartInput>
        <br/>
        <CartButton type='submit'>Update Quantity</CartButton>
      </CartForm>
    </div>
  )
}
