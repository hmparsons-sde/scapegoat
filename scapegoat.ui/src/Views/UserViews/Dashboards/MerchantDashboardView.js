import React, { useEffect, useState } from 'react'
import FulfillOrders from '../../../Components/Orders/FulfillOrders';
import { getMerchantOrders } from '../../../helpers/data/orderData';

export default function MerchantDashboardView({user}) {
  const [merchantOrders, setMerchantOrders] = useState([]);

  useEffect(() => {
    getMerchantOrders(user?.id).then(setMerchantOrders);
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
    </div>
  )
}
