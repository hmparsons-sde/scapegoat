import React, { useEffect, useState } from 'react'
import { getSingleUserOrder } from '../../helpers/data/orderData';
import OrderInfo from '../../Components/Orders/OrderInfo';
import UpdateOrder from '../../Components/Orders/UpdateOrder';


export default function Orders({ user }) {
  const [userOrder, setUserOrder] = useState([]);
  const [updateSwitch, setUpdateSwitch] = useState(false);

  useEffect(() => {
    getSingleUserOrder('145beb4f-54a0-41de-8de8-1e6adb3a38f3')
    .then(setUserOrder);
  },[updateSwitch])

  return (
    <div>
      <h2>{userOrder?.user?.firstName} {userOrder?.user?.lastName}'s cart</h2>
      <p>Order Status: {userOrder?.status}</p>
      <h3>Cart Items</h3>
      <OrderInfo order={userOrder} setUpdateSwitch={setUpdateSwitch}/>
       <h3>Total:$ {userOrder?.totalCost}</h3>
       <UpdateOrder setUpdateSwitch={setUpdateSwitch} {...userOrder}/>
    </div>
  )
}
