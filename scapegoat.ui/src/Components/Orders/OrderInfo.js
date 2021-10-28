import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { deleteOrderItem, getOrderItemsByOrderId } from '../../helpers/data/orderData';
import CartProducts from './CartProducts';

export default function OrderInfo({ ...order }) {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    getOrderItemsByOrderId(order.id).then(setOrderItems);
  },[order.id]);

  const CartButton = styled.button`
  width: 7rem;
  height: 2rem;
  `;
console.warn(orderItems)
  const handleClick = (id) => {
   deleteOrderItem(id).then(setOrderItems);
  }

  const cartItems = orderItems?.map(item => (
    <>
    <CartProducts {...item}/>
    <CartButton onClick={() => handleClick(item.id)}>Delete Item</CartButton> 
    <p>quantity: {item.quantity}</p>
    </>
  ))
  return (
    <div>
      {
      order.lineItems.length > 0 
      ? cartItems
      : "no items in cart"
      }
    </div>
  )
}
