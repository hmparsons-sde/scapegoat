import React from "react";

export default function SinglePayment(payment) {
    console.log(payment);
  return (
    <div>
      Payment Method: {payment.payment.paymentMethod} <br/>
      User: {payment.payment.userId} <br/>
    </div>
  )
}
