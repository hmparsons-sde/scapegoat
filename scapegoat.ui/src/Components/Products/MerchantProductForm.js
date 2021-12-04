import React, { useState } from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Input, Label } from "reactstrap"
import { createMerchantProduct, updateMerchantProduct } from '../../helpers/data/productData';

const MerchantProductForm = ({  
    productId, 
    productType, 
    description, 
    merchantId, 
    price,
    size,
    productImage,
    createdAt,
    update,
    setUpdate,
    setUpdateSwitch,
    setAddProduct
}) => {
    const [dropName, setDropName] = useState('');
    const [updatedProduct, setUpdatedProduct] = useState({
        productId: productId,
        productType: productType,
        description: description,
        merchantId: merchantId,
        price: price,
        size: size,
        productImage: productImage,
        createdAt: createdAt
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
            updateMerchantProduct(updatedProduct.productId, updatedProduct)
                .then(setUpdateSwitch);
            setUpdate(!update);
        } else {
            createMerchantProduct(updatedProduct)
                .then(setUpdateSwitch)
                .then(setAddProduct(false));
        }
    }
    return (
        <Form onSubmit={handleUpdate} className='product-form'>
            <FormGroup size='sm'>
                <Label htmlFor='description' tag='h5'>Description</Label>
                <Input 
                    type='text'
                    id='description' 
                    defaultValue={description} 
                    name='description'
                    onChange={handleInputChange}
                >
                </Input> 
                <Label htmlFor='merchantId' tag='h5'>Merchant Id</Label>
                <Input 
                    type='text'
                    id='merchantId' 
                    defaultValue={merchantId} 
                    name='merchantId'
                    onChange={handleInputChange}
                >
                </Input>
                <Label htmlFor='productType' tag='h5'>Product Type</Label>
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
                <div className='d-flex justify-content-center'>
                    <div className='d-flex flex-column'>
                        <Label htmlFor='price' tag='h5'>Price</Label>
                        <Input 
                            type='text'
                            id='price' 
                            defaultValue={price} 
                            name='price'
                            onChange={handleInputChange}
                        >
                        </Input>
                    </div>
                    <div className='d-flex flex-column'>
                        <Label htmlFor='size' tag='h5'>Quantity</Label>
                        <Input 
                            type='text'
                            id='size' 
                            defaultValue={size} 
                            name='size'
                            onChange={handleInputChange}
                        >
                        </Input>
                    </div>
                    <div className='d-flex flex-column'>
                        <Label htmlFor='productImage' tag='h5'>Image URL</Label>
                        <Input 
                            type='text'
                            id='productImage' 
                            defaultValue={productImage} 
                            name='productImage'
                            onChange={handleInputChange}
                        >
                        </Input>
                    </div>
                </div>
                <Button className='mt-2' type='submit'>Submit</Button>
            </FormGroup>
        </Form>
    );
}

export default MerchantProductForm;
