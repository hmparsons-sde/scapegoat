import React, { useEffect, useState } from 'react'
import OrderInfo from '../../Components/Orders/OrderInfo';
import { getAllOrders } from '../../helpers/data/orderData';

export default function Orders() {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    getAllOrders().then(setAllOrders);
  },[])
console.warn(allOrders);
  return (
    <div>
      <h1>orders</h1>
      {allOrders.map(order => (
        <OrderInfo key={order.id} {...order}/>
      ))}
    </div>
  )
}
