import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { getPendingOrderInfo } from '../../helpers/data/orderData';
import OrderInfo from '../../Components/Orders/OrderInfo';
import { useHistory } from 'react-router';
import UpdateOrder from '../../Components/Orders/UpdateOrder';
import { getUserByFBKey } from '../../helpers/data/userData';

const CartButton = styled.div`
.button_slide {
  color: black;
  border: 2px solid #e7e7e7;
  border-radius: 0px;
  padding: 18px 36px;
  display: inline-block;
  font-size: 14px;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: inset 0 0 0 0 #e7e7e7;
  -webkit-transition: ease-out 0.4s;
  -moz-transition: ease-out 0.4s;
  transition: ease-out 0.4s;
}
.slide_down:hover {
  box-shadow: inset 0 100px 0 0 #e7e7e7;
}
align-content: center;
margin-top: 10px;
margin-bottom: 15px;
`;
const CartHeader = styled.div`
h1 {
  font-weight: 400;
  line-height: 1.2;
  margin-top: 5%;
  margin-bottom: 5%;
}
`;

const FlexyDiv = styled.div`
display: flex;
flex-direction: row;
margin-top: 5rem;
margin: auto;
`;

const TotalDiv = styled.div`
background-color: #ffe8d6;
border: 2px solid #e7e7e7;
padding: 1rem;
border-radius: 25px
`

export default function CartView({ firebaseUser }) {
  const [userOrder, setUserOrder] = useState([]);
  const [updateSwitch, setUpdateSwitch] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getUserByFBKey(firebaseUser.uid).then((resp) => {
      getPendingOrderInfo(resp.id)
      .then(setUserOrder);
    });
  },[updateSwitch, firebaseUser.uid])

  return (
    <>
      <CartHeader>
        <h1>My Cart</h1>
      </CartHeader>
    {userOrder.length === 0
    ? <div>
        <CartButton onClick={() => history.push('/products')}>
          <div className="button_slide slide_down">
          Back to Products
          </div>
        </CartButton>
        <h4>You have no open orders.</h4>
      </div>
    :     <div>
    <FlexyDiv>
    <OrderInfo order={userOrder} setUpdateSwitch={setUpdateSwitch}/>
    <TotalDiv>
      {
      userOrder?.user?.addressLine1
      ? <div>
        <p>{userOrder?.user?.firstName} {userOrder?.user?.lastName}</p>
        <p>{userOrder?.user?.addressLine1}</p>
        <p>{userOrder?.user?.cityName}, {userOrder?.user?.state} {userOrder?.user?.postalCode}</p>
        <p>Order Status: {userOrder?.status}</p>
      </div>
      : null
    }
     <h3>Total: ${userOrder?.totalCost}</h3>
    <UpdateOrder setUpdateSwitch={setUpdateSwitch} id={userOrder.id}/>
    </TotalDiv>
    </FlexyDiv>
  </div>
    }
    </>
  )
}
