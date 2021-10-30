import React, { useState } from 'react'
import { updateOrderItem } from '../../helpers/data/orderData';

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
      <form autoComplete='off' onSubmit={handleSubmit}>
        <label>Item Quantity</label>
        <input type='number' name='quantity' value={orderItemObj.quantity} onChange={handleInputChange}></input>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
