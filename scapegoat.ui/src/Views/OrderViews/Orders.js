import React, { useEffect, useState } from 'react'
import { getSingleUserOrder } from '../../helpers/data/orderData';
import OrderInfo from '../../Components/Orders/OrderInfo';

export default function Orders() {
  const [userOrder, setUserOrder] = useState([]);
  const [updateSwitch, setUpdateSwitch] = useState(false);

  useEffect(() => {
    getSingleUserOrder('145beb4f-54a0-41de-8de8-1e6adb3a38f3')
    .then(setUserOrder);
  },[updateSwitch])
  
console.warn(userOrder);


  return (
    <div>
      <h1>My Cart</h1>
      <h2>{userOrder?.user?.firstName} {userOrder?.user?.lastName}'s cart</h2>
      <h3>Cart Items</h3>
      <OrderInfo order={userOrder} setUpdateSwitch={setUpdateSwitch}/>
       <h3>Total:$ {userOrder?.totalCost}</h3>
      <p>Order Status: {userOrder?.status}</p>
    </div>
  )
}
