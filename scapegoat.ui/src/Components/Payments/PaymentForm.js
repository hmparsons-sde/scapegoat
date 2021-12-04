import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { createNewPayment, updatePayment } from '../../helpers/data/paymentData';
import MagicButton from './PaymentButton';

const PaymentForm = ({  
    id, 
    paymentMethod, 
    accountNumber, 
    userId, 
    setPayments,
    update,
    setUpdate,
    addPayment,
    setAddPayment
}) => {
 
    const [updatedPayment, setUpdatedPayment] = useState({
        id: id,
        PaymentMethod: paymentMethod,
        AccountNumber: accountNumber,
        userId: userId,
    });
    const history = useHistory()
    const handleInputChange = (e) => {
      setUpdatedPayment((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        if (id) {
            updatePayment(updatedPayment.id, updatedPayment)
                .then(r => setPayments(r)).then(() => {
                    console.warn(updatedPayment)
                    if (updatedPayment.PaymentMethod === 'BankAccount') {
                      history.push("/bankInfo")
                      }
                    else if (updatedPayment.PaymentMethod === 'DebitCard') {
                       history.push("/creditcardpayments")
                       }
                    else if (updatedPayment.PaymentMethod === 'DebitCard') {
                        history.push("/creditcardpayments")
                        }
                    else if (updatedPayment.PaymentMethod === 'PayPal') {
                        history.push("/creditcardpayments")
                        }
                     else{
                       history.push("/payments") 
                     }
                   });
            setUpdate(!update);
        } else {
            createNewPayment(updatedPayment)
                .then(r => setPayments(r));
            setAddPayment(!addPayment);
        }
    }
    


    return (
        <Form onSubmit={handleUpdate}>
            <FormGroup> 
                <Label htmlFor='id'>Id: </Label>
                <Input 
                    type='text'
                    id='id' 
                    defaultValue={id} 
                    name='id'
                    onChange={handleInputChange}
                >
                </Input>
                <Label htmlFor='paymentMethod'>Payment Method : </Label>
                <Input 
                    type='number' 
                    id='paymentMethod'
                    defaultValue={paymentMethod} 
                    name='paymentMethod'
                    onChange={handleInputChange}
                >
                </Input>

                <Label htmlFor='accountNumber'>Account Number : </Label>
                <Input 
                    type='text'
                    id='accountNumber' 
                    defaultValue={accountNumber} 
                    name='accountNumber'
                    onChange={handleInputChange}
                >
                </Input>

                <Label htmlFor='userId'>User Id : </Label>
                <Input 
                    type='text'
                    id='userId' 
                    defaultValue={userId} 
                    name='userId'
                    onChange={handleInputChange}
                >
                </Input>
            </FormGroup>
            <Button type='submit'>Submit</Button>
        </Form>
    );

}



export default PaymentForm;
