import React from "react";
import styled from 'styled-components';

const SinglePaymentCard = styled.div`
  width: 300px;
  height: auto;
  margin: 15px;
  border-style: solid;
  box-shadow: 50px;
`;

export default function SinglePayment(payment) {
  console.log(payment);
  return (
    <SinglePaymentCard>
      <div>
        <h4 tag="h4" className='mt-1'>
          Payment Method: {payment.payment.paymentMethod} 
        </h4><br/>
        <h5>User ID: {payment.payment.userId}
        </h5> <br/>
      </div>
    </SinglePaymentCard>
  )
}
