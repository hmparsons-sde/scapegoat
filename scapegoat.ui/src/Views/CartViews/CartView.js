import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { getSingleUserOrder } from '../../helpers/data/orderData';
import OrderInfo from '../../Components/Orders/OrderInfo';
import { useHistory, useParams } from 'react-router';
import UpdateOrder from '../../Components/Orders/UpdateOrder';

const CartButton = styled.button`
width: 15rem;
height: 2rem;
background-color: black;
color: white;
cursor: pointer;
border-radius: 25px;
`;


export default function CartView() {
  const [userOrder, setUserOrder] = useState([]);
  const [updateSwitch, setUpdateSwitch] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getSingleUserOrder(id)
    .then(setUserOrder);
  },[updateSwitch, id])
  
const orderStatus = userOrder.status === 'completed';

  return (
    <>
    {orderStatus
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
    <UpdateOrder setUpdateSwitch={setUpdateSwitch} {...userOrder}/>
  </div>
    }
    </>
  )
}
