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
        ProductId: productId,
        ProductType: productType,
        Description: description,
        MerchantId: merchantId,
        Price: price,
        Size: size,
        CreatedAt: createdAt
    });

    const handleInputChange = (e) => {
        setUpdatedProduct((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        updateProduct(updatedProduct.ProductId, updatedProduct)
            .then(r => { setProducts(r) });
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
                    type='number' 
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