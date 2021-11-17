import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from 'styled-components'
import { Button, ButtonGroup, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { deleteMerchantProduct } from "../../helpers/data/productData";
import { AiOutlineDelete, AiOutlineInfoCircle, AiOutlineEdit } from 'react-icons/ai';
import MerchantProductForm from "./MerchantProductForm";

const MerchantProductImage = styled.div`
img {
  object-fit: cover;
  width: 250px;
  height: 250px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 5%;
  padding: 3%;
}
`;
export default function MerchantProductCard({
  productId, 
  productType, 
  description, 
  merchantId, 
  price,
  size,
  productImage,
  createdAt,
  setMerchantProducts, 
  setUpdateSwitch
}) {
  const [update, setUpdate] = useState(false);
  const history = useHistory();

  const handleButton = (p) => {
    switch (p) {
      case 'delete': 
          deleteMerchantProduct(productId).then(setUpdateSwitch);
      break;
      case 'update':
        setUpdate(!update);
      break;
      case 'single':
        history.push(`/products/${productId}`)
      break;
      default:
      break;
    }
  };

  return (
      <CardBody className='product-card m-2 border border-secondary rounded' style={{maxWidth: '18rem'}}>
        <MerchantProductImage>
        <img src={productImage} alt={description}></img>
        </MerchantProductImage>
        <CardTitle tag='h4' className='mb-1'>{description}</CardTitle>
        <CardSubtitle tag='h6' className='mb-3 d-flex flex-column' />
          <CardText>${price} per day</CardText>
          <CardText>Quantity: {size}</CardText>
          <CardText>Added on {createdAt}</CardText>
        <ButtonGroup>
          <Button outline onClick={() => handleButton('single')}><AiOutlineInfoCircle /></Button>
          <Button outline onClick={() => handleButton('update')}><AiOutlineEdit /></Button>
          <Button outline onClick={() => handleButton('delete')}><AiOutlineDelete /></Button>
        </ButtonGroup>
        {
          update
          ? <MerchantProductForm 
              productId={productId}
              productType={productType}
              description={description}
              merchantId={merchantId}
              price={price}
              size={size}
              createdAt={createdAt}
              setMerchantProducts={setMerchantProducts}
              productImage={productImage}
              update={update}
              setUpdateSwitch={setUpdateSwitch}
              setUpdate={setUpdate}
            />
          : null
        }
      </CardBody>
  )
}
