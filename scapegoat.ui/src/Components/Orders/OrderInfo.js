import React from 'react'
import styled from 'styled-components';
import { deleteOrderItem } from '../../helpers/data/orderData';
import CartProducts from './CartProducts';
import UpdateCartItem from './UpdateCartItem';

export default function OrderInfo({ setUpdateSwitch, order }) {

  const CartButton = styled.button`
  width: 7rem;
  height: 2rem;
  `;
  
  const handleClick = (id) => {
   deleteOrderItem(id).then(setUpdateSwitch);
  }
  
  const cartItems = order.lineItems;
  
  return (
    <div>
      {cartItems 
      ? cartItems?.map(item => (
        <>
        <CartProducts item={item}/>
        <CartButton onClick={() => handleClick(item.id)}>Delete Item</CartButton> 
        <p>quantity: {item.quantity}</p>
        <UpdateCartItem setUpdateSwitch={setUpdateSwitch} {...item}/>
        </>
      ))
      : <p>no items in cart</p>
      }
    </div>
  )
}
