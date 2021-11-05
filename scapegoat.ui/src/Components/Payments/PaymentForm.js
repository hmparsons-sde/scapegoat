import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { createNewPayment, updatePayment } from '../../helpers/data/paymentData';

const PaymentForm = ({  
    paymentId, 
    paymentMethod, 
    accountNumber, 
    userId, 
    user,
    setPayments,
    update,
    setUpdate,
    addPayment,
    setAddPayment
}) => {
    const [updatedPayment, setUpdatedPayment] = useState({
        PaymentId: paymentId,
        PaymentType: paymentMethod,
        AccountNumber: accountNumber,
        MerchantId: userId,
        User: user,
    });

    const handleInputChange = (e) => {
      setUpdatedPayment((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        if (paymentId) {
            updatePayment(updatedPayment.PaymentId, updatedPayment)
                .then(r => setPayments(r));
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
                <Label htmlFor='description'>Description: </Label>
                <Input 
                    type='text'
                    id='description' 
                    defaultValue={accountNumber} 
                    name='description'
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
                <Label htmlFor='paymentMethod'>User Id : </Label>
                <Input 
                    type='text'
                    id='userId' 
                    defaultValue={userId} 
                    name='userId'
                    onChange={handleInputChange}
                >
                </Input>
                <Label htmlFor='paymentMethod'>User : </Label>
                <Input 
                    type='text'
                    id='user' 
                    defaultValue={user} 
                    name='user'
                    onChange={handleInputChange}
                >
                </Input>
            </FormGroup>
            <Button type='submit'>Submit</Button>
        </Form>
    );
}

export default PaymentForm;
