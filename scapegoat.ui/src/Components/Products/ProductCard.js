import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button, ButtonGroup, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { deleteProduct } from "../../helpers/data/productData";
import ProductForm from "./ProductForm";
import { AiOutlineShoppingCart, AiOutlineDelete, AiOutlineInfoCircle, AiOutlineEdit } from 'react-icons/ai'

export default function ProductCard({
  productId, 
  productType, 
  description, 
  merchantId, 
  price,
  size,
  createdAt,
  setProducts
}) {
  const [update, setUpdate] = useState(false);
  const history = useHistory();

  const handleButton = (p) => {
    switch (p) {
      case 'delete': 
        deleteProduct(productId).then(r => setProducts(r));
      break;
      case 'update':
        setUpdate(!update)
      break;
      case 'single':
        history.push(`/products/${productId}`)
      break;
      default:
      break;
    }
  };

  return (
    <CardBody className='m-2 border border-dark rounded' style={{maxWidth: '18rem'}}>
      <CardTitle tag='h4' className='mb-1'>{description}</CardTitle>
      <CardSubtitle tag='h6' className='mb-3 d-flex flex-column' />
        <CardText>${price} per day</CardText>
        <CardText>Size: {size}</CardText>
        <CardText>Added on {createdAt}</CardText>
      <ButtonGroup>
        <Button outline onClick={() => handleButton('single')}><AiOutlineInfoCircle /></Button>
        <Button outline onClick={() => handleButton('update')}><AiOutlineEdit /></Button>
        <Button outline onClick={() => handleButton('delete')}><AiOutlineDelete /></Button>
        <Button outline onClick={() => console.warn(createdAt)}><AiOutlineShoppingCart /></Button>
      </ButtonGroup>
      {
        update
        ? <ProductForm 
            productId={productId}
            productType={productType}
            description={description}
            merchantId={merchantId}
            price={price}
            size={size}
            createdAt={createdAt}
            setProducts={setProducts}
            update={update}
            setUpdate={setUpdate}
          />
        : ''
      }
    </CardBody>
  )
}
