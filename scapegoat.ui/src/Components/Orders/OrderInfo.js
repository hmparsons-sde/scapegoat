import React from 'react'
import styled from 'styled-components';
import { deleteOrderItem, getSingleUserOrder } from '../../helpers/data/orderData';
import CartProducts from './CartProducts';

export default function OrderInfo({ setUserOrder, order }) {
  // const [orderItems, setOrderItems] = useState([]);

  const CartButton = styled.button`
  width: 7rem;
  height: 2rem;
  `;
  
  const handleClick = (id) => {
   deleteOrderItem(id).then(getSingleUserOrder('145beb4f-54a0-41de-8de8-1e6adb3a38f3')
   .then(setUserOrder));
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
        </>
      ))
      : <p>no items in cart</p>
      }
    </div>
  )
}
