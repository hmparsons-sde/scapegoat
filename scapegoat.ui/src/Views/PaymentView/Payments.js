import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { getAllPayments } from '../../helpers/data/paymentData';
// import styled from 'styled-components';
import { Button } from 'reactstrap';
import PaymentCard from '../../Components/Payments/PaymentCard';
import PaymentForm from '../../Components/Payments/PaymentForm';

// const SinglePayment = styled.div`
//   width: 300px;
//   height: auto;
//   margin: 15px;
//   border-style: solid;
//   box-shadow: 50px;
// `;
// const PaymentContainer = styled.div`
//   display: flex;
//   flex-flow: row wrap;
//   justify-content: center;
//   margin-top: 5%;
// `;

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [addPayment, setAddPayment] = useState(false);
  
    useEffect(() => getAllPayments().then(data => setPayments(data)), [setPayments]);

    console.warn(payments);

    return (
      <div>
        <Button onClick={() => setAddPayment(!addPayment)}>Add</Button>
        {
          addPayment
          ? <PaymentForm
            addPayment={addPayment}
            setAddPayment={setAddPayment} 
            setPayments={setPayments}
            />
          : ''
        }
        {
          payments.length > 0
          ? payments.map((paymentObject, i) => (
            <PaymentCard 
              key={i} 
              id={paymentObject.id}
              paymentMethod={paymentObject.paymentMethod}
              accountNumber={paymentObject.accountNumber}
              userId={paymentObject.userId}
              setPayments={setPayments} 
            />))
          : <h1>No Payments</h1>
        }
    </div>  
    )
}

export default Payments;
