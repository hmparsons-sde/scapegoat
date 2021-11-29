import React from 'react';
import styled from 'styled-components';
import { updateOrder } from '../../helpers/data/orderData';

const CartButton = styled.button`
width: 15rem;
height: 2rem;
background-color: black;
color: white;
cursor: pointer;
border-radius: 25px;
`;


export default function UpdateOrder({ setUpdateSwitch, id }) {


  const handleSubmit = () => {
    updateOrder({id: id, status: 'completed'}).then(setUpdateSwitch);
  }

  return (
    <div>
      <CartButton onClick={handleSubmit}>Submit Order</CartButton>
    </div>
  )
}
