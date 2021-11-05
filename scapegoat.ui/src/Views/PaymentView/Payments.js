import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { getPaymentByUser } from '../../helpers/data/paymentData';
import PaymentInfo from '../../Components/Payments/PaymentInfo';
import styled from 'styled-components';

const SinglePayment = styled.div`
  width: 300px;
  height: auto;
  margin: 15px;
  border-style: solid;
  box-shadow: 50px;
`;


export default function Payments() {
    const [userPayment, setUserPayment] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        getPaymentByUser(userId).then(data => setUserPayment(data));
    }, [userId])

    console.warn(userPayment);

    return (
        <div><SinglePayment userPayment = {userPayment}>
            <h1>All Payments</h1>
            {userPayment.map(paymentObject => (
                <PaymentInfo key={paymentObject.userId} {...paymentObject} />
            ))}
        </SinglePayment></div>
    )
}
