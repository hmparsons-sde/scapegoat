import React, { useEffect, useState } from 'react'
import FulfillOrders from '../../../Components/Orders/FulfillOrders';
import MerchantMetrics from '../../../Components/Orders/MerchantMetrics';
import ProductCard from '../../../Components/Products/ProductCard';
import { getMerchantOrders, getMonthlyOrders } from '../../../helpers/data/orderData';
import { getMerchantProducts } from '../../../helpers/data/productData';

export default function MerchantDashboardView({user}) {
  const [merchantOrders, setMerchantOrders] = useState([]);
  const [thisMonthOrders, setThisMonthOrders] = useState([]);
  const [merchantProducts, setMerchantProducts] = useState([]);

  useEffect(() => {
    getMerchantOrders(user?.id).then(setMerchantOrders);
    getMonthlyOrders(user?.id).then(setThisMonthOrders);
    getMerchantProducts(user?.id).then(setMerchantProducts);
  }, [user?.id]);

  console.warn(merchantProducts);
  
  return (
    <div>
      <h1>merchant dash</h1>
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
      <h2>My Products</h2>
      {merchantProducts
      ? merchantProducts.map((product) => (
        //TODO: create my own product card and update form
        <ProductCard 
        key={product.productId}
        productId={product.productId} 
        productType={product.productType} 
        description={product.description} 
        merchantId={product.merchantId} 
        price={product.price}
        size={product.size}
        createdAt={product.createdAt}
        setProducts={setMerchantProducts}/>
      ))
      : <p>You currently have no products.</p>
      }
    </div>
  )
}
