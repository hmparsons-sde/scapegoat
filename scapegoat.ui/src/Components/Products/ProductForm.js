import React, { useState } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label } from "reactstrap"
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
    const [dropName, setDropName] = useState('');
    const [updatedProduct, setUpdatedProduct] = useState({
        ProductId: productId,
        ProductType: productType,
        Description: description,
        MerchantId: merchantId,
        Price: price,
        Size: size,
        CreatedAt: createdAt
    });
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(prevState => !prevState);

    const handleInputChange = (e) => {
        setUpdatedProduct((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value 
        }))
    }

    const handleSelect = (e) => {
        setDropName(e.target.name);
        setUpdatedProduct(prevState => ({
            ...prevState,
            productType: e.target.value
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
        <Form onSubmit={handleUpdate} className='product-form'>
            <FormGroup> 
                <Label htmlFor='description' tag='h4'>Description</Label>
                <Input 
                    type='text'
                    id='description' 
                    defaultValue={description} 
                    name='description'
                    onChange={handleInputChange}
                >
                </Input>
                <Label htmlFor='productType' tag='h4'>Product Type</Label>
                <Dropdown 
                    isOpen={isOpen} 
                    toggle={toggle}
                    defaultValue={productType}
                >
                    <DropdownToggle caret>
                        {
                            dropName 
                            ? dropName
                            : 'Select a Category'
                        }
                    </DropdownToggle>
                    <DropdownMenu>
                    <DropdownItem name='Single Goat' onClick={e => handleSelect(e)} value='Single'>
                        Single Goat
                    </DropdownItem>
                    <DropdownItem name='Small Herd' onClick={e => handleSelect(e)} value='SmallHerd'>
                        Small Herd
                    </DropdownItem>
                    <DropdownItem  name='Large Herd' onClick={e => handleSelect(e)} value='LargeHerd'>
                        Large Herd
                    </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Label htmlFor='merchantId' tag='h4'>Merchant Id</Label>
                <Input 
                    type='text'
                    id='merchantId' 
                    defaultValue={merchantId} 
                    name='merchantId'
                    onChange={handleInputChange}
                >
                </Input>
                <Label htmlFor='price' tag='h4'>Price</Label>
                <Input 
                    type='text'
                    id='price' 
                    defaultValue={price} 
                    name='price'
                    onChange={handleInputChange}
                >
                </Input>
                <Label htmlFor='size' tag='h4'>Size</Label>
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
    );
}

export default ProductForm;