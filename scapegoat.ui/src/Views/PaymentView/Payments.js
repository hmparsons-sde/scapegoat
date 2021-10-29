import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getPaymentByUser } from '../../helpers/data/paymentData';


export default function Payments() {
    const [userPayment, setUserPayment] = useState([]);

    useEffect(() => {
        getPaymentByUser(userId)
        then(data => setUserPayment(data));
    }, [])

    console.warn(userPayment);

    return (
        <div>
            <h1>My Cart</h1>
            {userPayment.map(paymentObject => (
                <PaymentInfo key={paymentObject.userId} {...paymentObject} />
            ))}
        </div>
    )
}