import React from 'react'
import styled from 'styled-components';
import { deleteOrderItem } from '../../helpers/data/orderData';
import CartProducts from './CartProducts';
import UpdateCartItem from './UpdateCartItem';

const CartContainer = styled.div`
border: 2px solid #e7e7e7;
border-radius: 25px;
margin-left: 5rem;
margin-right: 8rem;
padding: 10px;
margin-bottom: 1rem;
display: flex;
flex-direction: row;
width: 40rem;
`;

const CartButton = styled.button`
width: 15rem;
height: 2rem;
background-color: black;
color: white;
cursor: pointer;
border-radius: 25px;
`;

const ButtonDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-left: 1rem;
`

export default function OrderInfo({ setUpdateSwitch, order }) {

  const handleClick = (id) => {
   deleteOrderItem(id).then(setUpdateSwitch);
  }
  
  const cartItems = order.lineItems;
  
  return (
    <div>
      {cartItems 
      ? cartItems?.map(item => (
        <CartContainer>
        <CartProducts item={item}/>
        <ButtonDiv>
        <UpdateCartItem setUpdateSwitch={setUpdateSwitch} {...item}/>
        <CartButton onClick={() => handleClick(item.id)}>Delete Item</CartButton> 
        </ButtonDiv>
        </CartContainer>
      ))
      : <p>no items in cart</p>
      }
    </div>
  )
}
