import React, { useState } from 'react';
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


export default function UpdateOrder({ setUpdateSwitch, ...orderItem }) {
  const [orderItemObj, setOrderItemObj] = useState({
    id: orderItem?.id || '',
    userId: orderItem?.user?.id || '',
    status: 'completed',
    createdAt: orderItem?.createdAt || Date.now,
    totalCost: orderItem?.totalCost || 0,
    paymentId: orderItem?.payment?.id || ''
  });


  const handleSubmit = () => {
    updateOrder(orderItemObj).then(setOrderItemObj).then(setUpdateSwitch);
  }

  return (
    <div>
      <CartButton onClick={handleSubmit}>Submit Order</CartButton>
    </div>
  )
}
