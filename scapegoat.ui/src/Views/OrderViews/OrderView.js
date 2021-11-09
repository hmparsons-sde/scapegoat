import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { getSingleUserOrder } from '../../helpers/data/orderData';
import { useHistory, useParams } from 'react-router';


const CartButton = styled.button`
width: 15rem;
height: 2rem;
background-color: black;
color: white;
cursor: pointer;
border-radius: 25px;
`;

const CartContainer = styled.div`
border: solid 1px black;
border-radius: 25px;
width: 30rem;
margin: auto;
padding: 10px;
margin-bottom: 1rem;
`;

export default function OrderView() {
  const [userOrder, setUserOrder] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getSingleUserOrder(id)
    .then(setUserOrder);
  },[id])
  
const orderStatus = userOrder.status !== 'completed';

  return (
    <>
    <div>
    <h1>Order History</h1>
    </div>
    {orderStatus
    ? <div>
        <h3>You have no recent orders</h3>
        <CartButton onClick={() => history.push('/products')}>Back to Products</CartButton>
      </div>
    : <CartContainer>
    <h3>Order Number: {userOrder?.id}</h3>
    <p>Order Status: {userOrder?.status}</p>
    <h3>Cart Items</h3>
    {userOrder?.lineItems.map((item) => (
      <div>
      <p>Product Id: {item.id}</p>
      <p>Quantity: {item.quantity}</p>
      {item?.product.map((prod) => (
        <div>
        <p>description: {prod.description}</p>
        <p>price:$ {prod.price}</p>
        </div>
      ))}
      </div>
    ))}
     <h3>Total:$ {userOrder?.totalCost}</h3>
     <p>Order placed: {userOrder?.createdAt}</p>
  </CartContainer>
    }
    </>
  )
}
