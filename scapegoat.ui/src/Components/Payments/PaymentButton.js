import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getSinglePayment } from "../../helpers/data/paymentData";

 export default function MagicButton() {
  const history = useHistory()
  const [payments, setPayments] = useState([]);
  useEffect(() => getSinglePayment().then(data => setPayments(data)), [setPayments]);

  const MethodChecker = () => {
  payments.map((paymentObject) => {
   if (paymentObject.paymentMethod === 1) {
     return(
        history.push("/bankInfo")
     )}
   else if (paymentObject.paymentMethod === 2) {
      return(
         history.push("/creditcardpayments")
      )}
    else{
      return(
        history.push("/payments")
     ) 
    }
  }
  )}
  return (
    MethodChecker()
  )
}
