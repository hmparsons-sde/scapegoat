import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FulfillOrders from '../../../Components/Orders/FulfillOrders';
import MerchantMetrics from '../../../Components/Orders/MerchantMetrics';
import MerchantProductCard from '../../../Components/Products/MerchantProductCard';
import MerchantProductForm from '../../../Components/Products/MerchantProductForm';
import { getMerchantOrders, getMonthlyOrders } from '../../../helpers/data/orderData';
import { getMerchantProducts } from '../../../helpers/data/productData';

const FlexyDiv = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
`;

export default function MerchantDashboardView({user}) {
  const [merchantOrders, setMerchantOrders] = useState([]);
  const [thisMonthOrders, setThisMonthOrders] = useState([]);
  const [merchantProducts, setMerchantProducts] = useState([]);
  const [updateSwitch, setUpdateSwitch] = useState(false);
  const [addProduct, setAddProduct] = useState(false);

  useEffect(() => {
    getMerchantOrders(user?.id).then(setMerchantOrders);
    getMonthlyOrders(user?.id).then(setThisMonthOrders);
    getMerchantProducts(user?.id).then(setMerchantProducts);
  }, [updateSwitch, user?.id]);
  
  return (
    <div>
      <h1>merchant dash</h1>
      {
      merchantOrders
      ? <FlexyDiv>
        { merchantOrders.map((order) => (
        <FulfillOrders key={order.id} orders={order}/>
      ))
      } 
      </FlexyDiv>
      : null
      }
      <MerchantMetrics merchantOrders={merchantOrders} monthlyOrders={thisMonthOrders} />
      <h2>My Products</h2>
      <div>
      {
        addProduct
        ? <button onClick={() => setAddProduct(!addProduct)}>Cancel</button>
        : <button outline onClick={() => setAddProduct(!addProduct)}>Add Product</button>
      }
       {
            addProduct
            ?
                <MerchantProductForm
                  setAddProduct={setAddProduct}
                  merchantId={user?.id}
                  setUpdateSwitch={setUpdateSwitch}
                />
            : null
       }        
      </div>

      {merchantProducts
      ? <FlexyDiv>
      { merchantProducts.map((product) => (
        <MerchantProductCard 
        key={product.productId}
        productId={product.productId} 
        productType={product.productType} 
        description={product.description} 
        merchantId={product.merchantId} 
        price={product.price}
        size={product.size}
        createdAt={product.createdAt}
        setUpdateSwitch={setUpdateSwitch}
        setMerchantProducts={setMerchantProducts}/>
      ))} </FlexyDiv>
      : <p>You currently have no products.</p>
      }
    </div>
  )
}
