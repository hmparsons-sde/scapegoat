import React, { useState } from "react";
import { Button } from "reactstrap";
import { deletePayment, getSinglePayment } from "../../helpers/data/paymentData";
import PaymentForm from "./PaymentForm";
import styled from 'styled-components';

const SinglePaymentCard = styled.div`
  width: 300px;
  height: auto;
  margin: 15px;
  border-style: solid;
  box-shadow: 50px;
`;

export default function PaymentCard({
  id, 
  paymentMethod, 
  accountNumber,
  userId, 
  setPayments
}) {
  const [update, setUpdate] = useState(false);

  const handleButton = (p) => {
    switch (p) {
      case 'delete': 
        deletePayment(id).then(r => setPayments(r));
      break;
      case 'update':
        setUpdate(!update)
      break;
      case 'single':
        getSinglePayment(id).then(r => console.warn(r));
      break;
      default:
      break;
    }
  };

  return (
    <SinglePaymentCard>
    <div>
      Id: {id} <br/>
      PaymentMethod: {paymentMethod} <br/>
      AccountNumber: {accountNumber} <br/>
      User: {userId} <br/>
        <Button onClick={() => handleButton('update')}>Update</Button>
        <Button onClick={() => handleButton('delete')}>Delete</Button>
      {
        update
        ? <PaymentForm 
            id={id}
            paymentMethod={paymentMethod}
            accountNumber={accountNumber}
            userId={userId}
            setPayments={setPayments}
            update={update}
            setUpdate={setUpdate}
          />
        : ''
      }
    </div>
    </SinglePaymentCard>
  )
}
