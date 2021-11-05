import React, { useState } from "react";
import { Button } from "reactstrap";
import { deletePayment, getSinglePayment } from "../../helpers/data/paymentData";
import PaymentForm from "./PaymentForm";

export default function PaymentCard({
  paymentId, 
  paymentMethod, 
  accountNumber,
  user, 
  userId, 
  setPayments
}) {
  const [update, setUpdate] = useState(false);

  const handleButton = (p) => {
    switch (p) {
      case 'delete': 
        deletePayment(paymentId).then(r => setPayments(r));
      break;
      case 'update':
        setUpdate(!update)
      break;
      case 'single':
        getSinglePayment(paymentId).then(r => console.warn(r));
      break;
      default:
      break;
    }
  };

  return (
    <div>
      PaymentMethod: {paymentMethod} <br/>
      User: {user} <br/>
        <Button onClick={() => handleButton('single')}>Info</Button>
        <Button onClick={() => handleButton('update')}>Update</Button>
        <Button onClick={() => handleButton('delete')}>Delete</Button>
      {
        update
        ? <PaymentForm 
            paymentId={paymentId}
            paymentMethod={paymentMethod}
            accountNumber={accountNumber}
            userId={userId}
            user = {user}
            setPayments={setPayments}
            update={update}
            setUpdate={setUpdate}
          />
        : ''
      }
    </div>
  )
}
