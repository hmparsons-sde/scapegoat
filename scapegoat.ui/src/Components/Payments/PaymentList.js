import React from "react";
import PaymentCard from "./PaymentCard";

export default function PaymentList({payments, setPayments}) {
  
    return (
    <div>
      {
        payments 
        ? payments.map((payment, i) => (<PaymentCard key={i} payment={payment} payments={payments} setPayments={setPayments} />))
        : ''
      }
    </div>
    )
}
