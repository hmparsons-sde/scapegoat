import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import SinglePayment from '../../Components/Payments/SinglePayment';
import { getSinglePayment} from '../../helpers/data/paymentData';

export default function SinglePaymentView() {
  const [payment, setPayment] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getSinglePayment(id).then(data => { 
      setPayment(data);
    });
  }, [id]);
  
  return (
  <div>
    <SinglePayment payment={payment}/>
  </div>
  );
}

SinglePayment.propTypes = {
  id: PropTypes.string,
};
