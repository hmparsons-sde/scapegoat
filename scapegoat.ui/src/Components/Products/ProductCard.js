import React, { useState } from "react";
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
    <CardBody>
      <CardTitle tag='h5'>{description}</CardTitle>
      <CardSubtitle tag='h6' className='mb-2 d-flex flex-column'>
        <CardText>{productType}</CardText>
        <CardText>Price: {price}</CardText>
        <CardText>Size: {size}</CardText>
        <CardText>{createdAt}</CardText>
      </CardSubtitle>
      <ButtonGroup>
        <Button outline onClick={() => handleButton('single')}>Info</Button>
        <Button outline onClick={() => handleButton('update')}>Update</Button>
        <Button outline onClick={() => handleButton('delete')}>X</Button>
        <Button outline>Add To Cart</Button>
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
