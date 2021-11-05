import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { createNewPayment, updatePayment } from '../../helpers/data/paymentData';

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
                .then(r => setPayments(r));
            setUpdate(!update);
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
