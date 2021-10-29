import React, { useEffect, useState } from "react";
import { getAllPayments } from "../../helpers/data/paymentData";


export default function PaymentList() {

  const [payments, setPayments] = useState([]);
  
    useEffect(() => getAllPayments().then(data =>
        setPayments(data)), []);

    let SinglePayments = payments?.map(payment => (<SinglePayment payment={payment}></SinglePayment>));

    return (
    <div>
        {SinglePayment}
    </div>
    )
}
