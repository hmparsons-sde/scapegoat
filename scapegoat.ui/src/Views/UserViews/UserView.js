import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import SellerCard from '../../Components/Users/Sellers/SellerCard';
import { getSingleUser} from '../../helpers/data/userData';
import styled from 'styled-components';

const SingleUser = styled.div`
  width: 300px;
  height: auto;
  margin: 15px;
  border-style: solid;
  box-shadow: 50px;
`;

export default function SingleUserView() {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getSingleUser(id).then(data => setUser(data));
  }, []);
  return <div><SingleUser user={user}>
      <h4 tag="h4" className='mt-1'>{user.firstName} {user.lastName}</h4>
      <h5>User Type: {user.userType}</h5>
      <h5>Customer Tier: {user.customerTier}</h5>
    </SingleUser></div>;
}

SingleUserView.propTypes = {
  id: PropTypes.string,
};
