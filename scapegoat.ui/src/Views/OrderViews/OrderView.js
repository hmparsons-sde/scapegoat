import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { getCompletedOrders } from '../../helpers/data/orderData';
import { useHistory } from 'react-router';
import { getUserByFBKey } from '../../helpers/data/userData';


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
text-align: left;
padding: 20px;
margin: 10px;
`;

const FlexyDiv = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
`;

export default function OrderView({ firebaseUser }) {
  const [userOrders, setUserOrders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getUserByFBKey(firebaseUser.uid).then((resp) => {
      console.warn(resp);
      getCompletedOrders(resp.id)
    .then(setUserOrders);
    })
    
  },[firebaseUser.uid])
  

  return (
    <>
    <div>
    <h1>Order History</h1>
    </div>
    {!userOrders
    ? <div>
        <h3>You have no recent orders</h3>
        <CartButton onClick={() => history.push('/products')}>Back to Products</CartButton>
      </div>
    : <FlexyDiv>
    {userOrders.map((userOrder) => (
      <CartContainer>
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
    ))
      }
    </FlexyDiv>
    }
    </>
  )
}
