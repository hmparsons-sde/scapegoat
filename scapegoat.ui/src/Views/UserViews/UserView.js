import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getSingleUser} from '../../helpers/data/userData';
import styled from 'styled-components';
import orderhistory from '../../assets/orderhistory.jpg';
import paymenttype from '../../assets/paymenttype.jpg';
import cartimage from '../../assets/cartimage.jpg';

const SingleUser = styled.div`
  background-size:auto, 100% 100%;
  font-size: 16px;
  line-height: 1.5;
  font-weight: 300;
  min-height: 100%;
  overflow-y: scroll;
  width: 100%;
  margin: 50px;

  h1, h3 {
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
`;

export default function SingleUserView() {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getSingleUser(id).then(data => setUser(data));
  }, [id]);
  return (
    <div>
      <SingleUser user={user}>
        <img src='' alt='profile'></img>
        <h1 tag="h1" className='mt-1'>{user.firstName} {user.lastName}</h1>
        <h3>User Type: {user.userType}</h3>
        <h3>Customer Tier: {user.customerTier}</h3>
        <h3>Created: {user.createdAt}</h3>
      </SingleUser>
      <UserCategories>
      <UserCategoryCard class="card">
        <img src={orderhistory} alt='order history'></img>
        <h2 class="card-body">Order History</h2>
      </UserCategoryCard>
      <UserCategoryCard class="card">
        <img src={paymenttype} alt='payment type'></img>
        <h2 class="card-body">Payment Types</h2>
      </UserCategoryCard>
      <UserCategoryCard class="card">
      <img src={cartimage} alt='cart'></img>
        <h2 className="card-body">View Cart</h2>
      </UserCategoryCard>
      </UserCategories>
    </div>
  );
}

SingleUserView.propTypes = {
  id: PropTypes.string,
};
