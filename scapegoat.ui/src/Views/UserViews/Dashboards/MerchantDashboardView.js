import React, { useEffect, useState } from 'react'
import FulfillOrders from '../../../Components/Orders/FulfillOrders';
import MerchantMetrics from '../../../Components/Orders/MerchantMetrics';
import { getMerchantOrders, getMonthlyOrders } from '../../../helpers/data/orderData';

export default function MerchantDashboardView({user}) {
  const [merchantOrders, setMerchantOrders] = useState([]);
  const [thisMonthOrders, setThisMonthOrders] = useState([]);

  useEffect(() => {
    getMerchantOrders(user?.id).then(setMerchantOrders);
    getMonthlyOrders(user?.id).then(setThisMonthOrders)
  }, [user?.id]);
  
  return (
    <div>
      <h1>merchant dash</h1>
      {/* <Metrics />
      <ProductAdmin /> */}
      {
      merchantOrders
      ? merchantOrders.map((order) => (
        <>
        <FulfillOrders key={order.id} orders={order}/>
        </>
      )) 
      : null
      }
      <MerchantMetrics merchantOrders={merchantOrders} monthlyOrders={thisMonthOrders} />
    </div>
  )
}
