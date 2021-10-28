import React, { useEffect, useState } from 'react'
import OrderInfo from '../../Components/Orders/OrderInfo';
import { getSingleUserOrder } from '../../helpers/data/orderData';

export default function Orders() {
  const [userOrder, setUserOrder] = useState([]);

  useEffect(() => {
    getSingleUserOrder('145beb4f-54a0-41de-8de8-1e6adb3a38f3')
    .then(setUserOrder)
  },[])
  
console.warn(userOrder);
// const orderInfo = userOrder[0];
// const lineItems = userOrder[0].lineItems;

  return (
    <div>
      <h1>My Cart</h1>
      <h2>{userOrder[0]?.user?.firstName} {userOrder[0]?.user?.lastName}'s cart</h2>
      <h3>Cart Items</h3>
      {userOrder.map(orderItem => (
        <OrderInfo key={orderItem.id} { ...orderItem}/>
      ))}
       <h3>Total:$ {userOrder[0]?.totalCost}</h3>
      <p>Order Status: {userOrder[0]?.status}</p>
    </div>
  )
}
