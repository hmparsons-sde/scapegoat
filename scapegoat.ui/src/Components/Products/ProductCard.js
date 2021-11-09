import React, { useEffect, useState } from "react";
import { AiOutlineShoppingCart, AiOutlineDelete, AiOutlineInfoCircle, AiOutlineEdit } from "react-icons/ai";
import { useHistory } from "react-router";
import { Button, ButtonGroup, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { deleteProduct } from "../../helpers/data/productData";
import ProductForm from "./ProductForm";

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
  const [date, setDate] = useState('');
  const history = useHistory();

  useEffect(() => {
    setDate(createdAt);
  }, [createdAt]);

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
    <CardBody>
      <CardTitle tag='h5'>{description}</CardTitle>
      <CardSubtitle tag='h6' className='mb-2 d-flex flex-column'>
        <CardText>{productType}</CardText>
        <CardText>Price: {price}</CardText>
        <CardText>Size: {size}</CardText>
        <CardText>Added on {date}</CardText>
      </CardSubtitle>
      <ButtonGroup>
        <Button outline onClick={() => handleButton('single')}><AiOutlineInfoCircle /></Button>
        <Button outline onClick={() => handleButton('update')}><AiOutlineEdit /></Button>
        <Button outline onClick={() => handleButton('delete')}><AiOutlineDelete /></Button>
        <Button outline onClick={() => console.warn(date)}><AiOutlineShoppingCart /></Button>
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
