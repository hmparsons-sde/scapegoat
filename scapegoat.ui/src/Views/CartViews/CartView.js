import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { getPendingOrderInfo } from '../../helpers/data/orderData';
import OrderInfo from '../../Components/Orders/OrderInfo';
import { useHistory } from 'react-router';
import UpdateOrder from '../../Components/Orders/UpdateOrder';
import { getUserByFBKey } from '../../helpers/data/userData';

const CartButton = styled.button`
width: 15rem;
height: 2rem;
background-color: black;
color: white;
cursor: pointer;
border-radius: 25px;
`;


export default function CartView({ firebaseUser }) {
  const [userOrder, setUserOrder] = useState([]);
  const [updateSwitch, setUpdateSwitch] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getUserByFBKey(firebaseUser.uid).then((resp) => {
      getPendingOrderInfo(resp.id)
      .then(setUserOrder);
    })
  },[updateSwitch, firebaseUser.uid])

  console.warn(userOrder);

  return (
    <>
    {userOrder.length === 0
    ? <div>
        <h3>You have no open orders</h3>
        <CartButton onClick={() => history.push('/products')}>Back to Products</CartButton>
      </div>
    :     <div>
    <h2>{userOrder?.user?.firstName} {userOrder?.user?.lastName}'s cart</h2>
    <p>Order Status: {userOrder?.status}</p>
    <h3>Cart Items</h3>
    <OrderInfo order={userOrder} setUpdateSwitch={setUpdateSwitch}/>
     <h3>Total:$ {userOrder?.totalCost}</h3>
    <UpdateOrder setUpdateSwitch={setUpdateSwitch} id={userOrder.id}/>
  </div>
    }
    </>
  )
}
