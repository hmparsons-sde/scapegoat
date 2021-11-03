import React, { useEffect, useState } from 'react'
import FulfillOrders from '../../../Components/Orders/FulfillOrders';
import { getMerchantOrders } from '../../../helpers/data/orderData';

export default function MerchantDashboardView() {
  const [merchantOrders, setMerchantOrders] = useState([]);

  useEffect(() => {
    getMerchantOrders('f8f520b6-a464-4aba-8d64-45c62810b526').then(setMerchantOrders);
  }, []);
  console.warn(merchantOrders);
  return (
    <div>
      <h1>merchant dash</h1>
      {/* <Metrics />
      <ProductAdmin /> */}
      {
      merchantOrders
      ? merchantOrders.map((order) => (
        <FulfillOrders key={order.id} orders={order}/>
      )) 
      : null
      }
    </div>
  )
}
