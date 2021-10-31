import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getSingleUser} from '../../helpers/data/userData';
import styled from 'styled-components';

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
        <h1 tag="h1" className='mt-1'>{user.firstName} {user.lastName}</h1>
        <h3>User Type: {user.userType}</h3>
        <h3>Customer Tier: {user.customerTier}</h3>
      </SingleUser>
    </div>
  );
}

SingleUserView.propTypes = {
  id: PropTypes.string,
};
