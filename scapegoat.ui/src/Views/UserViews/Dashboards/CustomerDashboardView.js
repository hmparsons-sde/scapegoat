import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router";
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getSingleUser} from '../../../helpers/data/userData';
import styled from 'styled-components';
import orderhistory from '../../../assets/orderhistory.jpg';
import paymenttype from '../../../assets/paymenttype.jpg';
import cartimage from '../../../assets/cartimage.jpg';

const SingleUser = styled.div`
  background-size:auto, 100% 100%;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 300;
  min-height: 100%;
  overflow-y: scroll;
  width: 100%;
  margin: 50px;

  h1, h3, h4 {
    font-weight: 300;
    line-height: 1.2;
  }

  img {
    position: relative;
    border-radius: 50%;
    height: 90px;
    width: 90px;
    padding: 0;
    margin: 0;
    border: 15px solid transparent;
  }
`;

const UserCategories = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-bottom: 25%;

  h2, h3, h4, h5 {
    font-weight: 300;
    line-height: 1.2;
  }
`;

const UserCategoryCard = styled.div`
  width: 300px;
  height: auto;
  margin: 15px;
  border: 15px solid transparent;
  box-shadow: 50px;

  img {
    object-fit: cover;
    width: 250px;
    height: 250px;
    margin-top: 20px;
    border-radius: 50%;
  }

  h2 {
    cursor: pointer;
  }
`;

export default function CustomerDashboardView() {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getSingleUser(id).then(data => setUser(data));
  }, [id]);

  const history = useHistory();
  const handleCartClick = () => {
    history.push(`users/cart`);
  };
  const handleOrderHistoryClick = () => {
    history.push(`orders`);
  };
  const handlePaymentTypeClick = () => {
    history.push(`PaymentType`);
  };

  return (
    <div>
      <SingleUser user={user}>
        <img src='' alt='profile'></img>
        <h1 tag="h1" className='mt-1'>{user.firstName} {user.lastName}</h1>
        <h4>User Type: {user.userType}</h4>
        <h4>Customer Tier: {user.customerTier}</h4>
        <h4>Created: {user.createdAt}</h4>
        <h4>{user.addressLine1}, {user.addressLine2}, {user.cityName}, {user.state}, {user.country}</h4>
      </SingleUser>
      <UserCategories>
      <UserCategoryCard className="card">
        <img src={orderhistory} alt='order history'></img>
        <h2 className="card-body" onClick={() => handleOrderHistoryClick()}>Order History</h2>
      </UserCategoryCard>
      <UserCategoryCard className="card">
        <img src={paymenttype} alt='payment type'></img>
        <h2 className="card-body" onClick={() => handlePaymentTypeClick()}>Payment Types</h2>
      </UserCategoryCard>
      <UserCategoryCard className="card">
      <img src={cartimage} alt='cart'></img>
        <h2 className="card-body" onClick={() => handleCartClick()}>View Cart</h2>
      </UserCategoryCard>
      </UserCategories>
    </div>
  );
}

CustomerDashboardView.propTypes = {
  id: PropTypes.string,
};
