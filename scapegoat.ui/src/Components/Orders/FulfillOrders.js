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
border: black 1px solid;
border-radius: 25px;
`;



export default function FulfillOrders({ orders }) {
const myItems = orders.lineItems;
const userInfo = orders.user;
  return (
    <OrderDiv>
      {orders
      ? <OrderCard>
        <h4>{orders.id}</h4>
        {myItems.map((item) => (
          <>
          {item.product.length > 0
          ? <>
          <img src={item.productImage} alt={item.description}></img>
          <p>Product Id: {item.product[0].productId}</p>
          <p>Description: {item.product[0].description}</p>
          <p>Price:$ {item.product[0].price}</p>
          <p>Quantity: {item.quantity}</p>
          </>
          : null
          }
          </>
      ))
      }
      <h4>gross total:$ {orders.totalCost} </h4>
      <h4>order status: {orders.status}</h4>
      <h3>Customer Information</h3>
      <p>Customer Id: {userInfo.id}</p>
      <p>Name: {userInfo.firstName} {userInfo.lastName}</p>
      </OrderCard>
      : null
      }
    </OrderDiv>
  )
}
