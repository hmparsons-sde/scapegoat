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
const getTotal = (number, price) => {
  return number * price
}
console.warn(orders)
  return (
    <OrderDiv>
      {orders
      ? <OrderCard>
        <h4>{orders.id}</h4>
        {myItems.map((item) => (
          <>
            <p>Product Id: {item.product[0].productId}</p>
            <p>Description: {item.product[0].description}</p>
            <p>Price: {item.product[0].price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>total:{getTotal(item.quantity, item.product[0].price)}</p>
          </>
      ))
      }
      <h4>gross total: </h4>
      </OrderCard>
      : null
      }
    </OrderDiv>
  )
}
