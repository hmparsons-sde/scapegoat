import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, ButtonGroup, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { deleteProduct, deleteProductByType } from "../../helpers/data/productData";
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
  setProducts, 
  setCategoryGoats, 
}) {
  const [update, setUpdate] = useState(false);
  const history = useHistory();
  const { category } = useParams();

  const handleButton = (p) => {
    switch (p) {
      case 'delete': 
        if (category) {
          deleteProductByType(productId, category)
            .then(setCategoryGoats);
        } else {
          deleteProduct(productId).then(r => setProducts(r));
        }
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
      <CardBody className='product-card m-2 border border-dark rounded'>
        <CardTitle tag='h4' className='mb-1'>{description}</CardTitle>
        <CardSubtitle tag='h6' className='mb-3 d-flex flex-column' />
          <CardText>${price} per day</CardText>
          <CardText>Quantity: {size}</CardText>
          <CardText>Added on {createdAt}</CardText>
        <ButtonGroup>
          <Button outline onClick={() => handleButton('single')}><AiOutlineInfoCircle /></Button>
          <Button outline onClick={() => handleButton('update')}><AiOutlineEdit /></Button>
          <Button outline onClick={() => handleButton('delete')}><AiOutlineDelete /></Button>
          <Button outline onClick={() => console.warn(category)}><AiOutlineShoppingCart /></Button>
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
              setCategoryGoats={setCategoryGoats}
              update={update}
              setUpdate={setUpdate}
            />
          : ''
        }
      </CardBody>
  )
}
