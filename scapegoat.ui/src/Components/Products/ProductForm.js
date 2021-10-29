import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { updateProduct } from '../../helpers/data/productData';

const ProductForm = ({  
    productId, 
    productType, 
    description, 
    merchantId, 
    price,
    size,
    createdAt,
    setProducts
}) => {
    const [updatedProduct, setUpdatedProduct] = useState({
        productId: productId,
        productType: productType || '',
        description: description || '',
        merchantId: merchantId,
        price: price || '',
        size: size || '',
        createdAt: createdAt || ''
    });

    const handleInputChange = (e) => {
        setUpdatedProduct((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        updateProduct(updatedProduct).then(r => console.warn(r));
    }
    return (
        <Form onSubmit={handleUpdate}>
            <FormGroup> 
                <Label htmlFor='description'>Description: </Label>
                <Input 
                    type='text'
                    id='description' 
                    defaultValue={description} 
                    name='description'
                    onChange={handleInputChange}
                >
                </Input>
                <Label htmlFor='productType'>Product Type : </Label>
                <Input 
                    type='text' 
                    id='productType'
                    defaultValue={productType} 
                    name='productType'
                    onChange={handleInputChange}
                >
                </Input>
            </FormGroup>
            <Button type='submit'>Submit</Button>
        </Form>
    );
}

export default ProductForm;