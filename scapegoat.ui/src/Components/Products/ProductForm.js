import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { createProduct, updateProduct } from '../../helpers/data/productData';

const ProductForm = ({  
    productId, 
    productType, 
    description, 
    merchantId, 
    price,
    size,
    createdAt,
    setProducts,
    update,
    setUpdate,
    setAddProduct
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
        if (productId) {
            updateProduct(updatedProduct.ProductId, updatedProduct)
                .then(r => setProducts(r));
            setUpdate(!update);
        } else {
            createProduct(updatedProduct)
                .then(r => setProducts(r));
            setAddProduct(false);
        }
    }
    return (
        <div className='p-4'>
            <Form onSubmit={handleUpdate}>
                <FormGroup> 
                    <Label htmlFor='description'>Description</Label>
                    <Input 
                        type='text'
                        id='description' 
                        defaultValue={description} 
                        name='description'
                        onChange={handleInputChange}
                    >
                    </Input>
                    <Label htmlFor='productType'>Product Type</Label>
                    <Input 
                        type='number' 
                        id='productType'
                        defaultValue={productType} 
                        name='productType'
                        onChange={handleInputChange}
                    >
                    </Input>
                    <Label htmlFor='productType'>Merchant Id</Label>
                    <Input 
                        type='text'
                        id='merchantId' 
                        defaultValue={merchantId} 
                        name='merchantId'
                        onChange={handleInputChange}
                    >
                    </Input>
                    <Label htmlFor='productType'>Price</Label>
                    <Input 
                        type='text'
                        id='price' 
                        defaultValue={price} 
                        name='price'
                        onChange={handleInputChange}
                    >
                    </Input>
                    <Label htmlFor='productType'>Size</Label>
                    <Input 
                        type='text'
                        id='size' 
                        defaultValue={size} 
                        name='size'
                        onChange={handleInputChange}
                    >
                    </Input>
                </FormGroup>
                <Button className='mt-2' type='submit'>Submit</Button>
            </Form>
        </div>
    );
}

export default ProductForm;