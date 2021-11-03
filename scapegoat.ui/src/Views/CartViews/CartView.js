import React, { useEffect, useState } from 'react'
import { getSingleUserOrder } from '../../helpers/data/orderData';
import OrderInfo from '../../Components/Orders/OrderInfo';
import { useParams } from 'react-router';

export default function CartView() {
  const [userOrder, setUserOrder] = useState([]);
  const [updateSwitch, setUpdateSwitch] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getSingleUserOrder(id)
    .then(setUserOrder);
  },[updateSwitch, id])
  
console.warn(userOrder);



  return (
    <div>
      <h2>{userOrder?.user?.firstName} {userOrder?.user?.lastName}'s cart</h2>
      <p>Order Status: {userOrder?.status}</p>
      <h3>Cart Items</h3>
      <OrderInfo order={userOrder} setUpdateSwitch={setUpdateSwitch}/>
       <h3>Total:$ {userOrder?.totalCost}</h3>
    </div>
  )
}
