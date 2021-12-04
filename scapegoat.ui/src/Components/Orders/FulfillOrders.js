import React from 'react'
import styled from 'styled-components'

const OrderDiv = styled.div`
display: flex;
flex-direction: flex-row;
flex-wrap: row-wrap;
width: 90%;
`;
const OrderCard = styled.div`
width: 25rem;
border:  2px solid #e7e7e7;
border-radius: 25px;
padding: 10px;
`;
const ProductFulfillImage = styled.div`
img {
  object-fit: cover;
  width: 250px;
  height: 250px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 5%;
  padding: 3%;
}
`;


export default function FulfillOrders({ orders }) {
const myItems = orders.lineItems;
const userInfo = orders.user;

  return (
    <div>
    <OrderDiv>
      {orders
      ? <OrderCard>
        <h4>{orders.id}</h4>
        {myItems.map((item) => (
          <>
          {item.product.length > 0
          ? <>
          <ProductFulfillImage>
          <img src={item.product[0].productImage} alt={item.product[0].description}></img>
          </ProductFulfillImage>
          <p>Product Id: {item.product[0].productId}</p>
          <p>Description: {item.product[0].description}</p>
          <p>Price: ${item.product[0].price}</p>
          <p>Quantity: {item.quantity}</p>
          </>
          : null
          }
          </>
      ))
      }
      <h4>gross total: ${orders.totalCost} </h4>
      <h4>order status: {orders.status}</h4>
      <h3>Customer Information</h3>
      <p>Customer Id: {userInfo.id}</p>
      <p>Name: {userInfo.firstName} {userInfo.lastName}</p>
      </OrderCard>
      : null
      }
    </OrderDiv>
    </div>
  )
}
