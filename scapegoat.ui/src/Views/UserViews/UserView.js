import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import SellerCard from '../../Components/Users/Sellers/SellerCard';
import { getSingleUser} from '../../helpers/data/userData';

export default function SingleUserView() {
  const [user, setUser] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getSingleUser(id).then(data => setUser(data));
  }, []);
  return <div><SellerCard user={user}></SellerCard></div>;
}

SingleUserView.propTypes = {
  id: PropTypes.string,
};
