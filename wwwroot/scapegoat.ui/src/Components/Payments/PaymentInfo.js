import React, { useEffect, useState } from "react";
import { getAllPayments } from "../../helpers/data/paymentData";
import SinglePayment from "./SinglePayment";
import styled from 'styled-components';


const PaymentContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-top: 5%;
`;

export default function PaymentInfo() {

  const [payments, setPayments] = useState([]);
  
    useEffect(() => getAllPayments().then(data =>
        setPayments(data)), []);

    let SinglePayments = payments?.map(payment => (<SinglePayment payment={payment}></SinglePayment>));

    return (
    <PaymentContainer>
        {SinglePayments}
    </PaymentContainer>
    )
}
