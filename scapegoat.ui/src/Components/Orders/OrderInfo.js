import React from 'react'
import { deleteOrderItem } from '../../helpers/data/orderData';
import CartProducts from './CartProducts';
import UpdateCartItem from './UpdateCartItem';

export default function OrderInfo({ setUpdateSwitch, order }) {

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
        <button onClick={() => handleClick(item.id)}>Delete Item</button> 
        <p>quantity: {item.quantity}</p>
        <UpdateCartItem setUpdateSwitch={setUpdateSwitch} {...item}/>
        </>
      ))
      : <p>no items in cart</p>
      }
    </div>
  )
}
