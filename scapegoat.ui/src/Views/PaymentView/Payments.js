import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { getAllPayments } from '../../helpers/data/paymentData';
import styled from 'styled-components';
// import { Button } from 'reactstrap';
import PaymentCard from '../../Components/Payments/PaymentCard';
import PaymentForm from '../../Components/Payments/PaymentForm';

// const SinglePayment = styled.div`
//   width: 300px;
//   height: auto;
//   margin: 15px;
//   border-style: solid;
//   box-shadow: 50px;
// `;
const PaymentHeader = styled.div`
h1 {
  font-weight: 400;
  line-height: 1.2;
  margin-top: 5%;
  margin-bottom: 5%;
}
`;
const PaymentContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-top: 5%;
`;
const AddPaymentButton = styled.div`
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

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [addPayment, setAddPayment] = useState(false);
  
    useEffect(() => getAllPayments().then(data => setPayments(data)), [setPayments]);

    console.warn(payments);

    return (
      <div>
        <PaymentHeader>
        <h1>My Payments</h1>
        </PaymentHeader>
        <AddPaymentButton onClick={() => setAddPayment(!addPayment)}>
        <div className="button_slide slide_down">
          Add New Payment
          </div>
          </AddPaymentButton>
        <PaymentContainer>
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
          : <p>No Payments</p>
        }
      </PaymentContainer>
    </div>  
    )
}

export default Payments;
