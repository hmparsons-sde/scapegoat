import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import styled from 'styled-components';
import { Button, ButtonGroup, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { deleteProduct, deleteProductByType } from "../../helpers/data/productData";
import ProductForm from "./ProductForm";
import { AiOutlineShoppingCart, AiOutlineDelete, AiOutlineInfoCircle, AiOutlineEdit } from 'react-icons/ai'
import { checkOrderStatus, createOrder, createOrderItem } from "../../helpers/data/orderData";
import moment from "moment";

export default function ProductCard({
  productId, 
  productType, 
  description, 
  merchantId, 
  price,
  size,
  productImage,
  createdAt,
  setProducts, 
  setCategoryGoats, 
  user
}) {
  const [update, setUpdate] = useState(false);
  const history = useHistory();
  const { category } = useParams();

  const date = moment.utc(createdAt).format();
  const local = moment.utc(date).local().format("dddd, MMMM Do YYYY, h:mm a");

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
      case 'cart':
        checkOrderStatus(user.id).then(resp => {
          console.warn(user.id);
          if (resp.length === 0) {
            createOrder({
              userId: user.id,
              status: 'pending',
            }).then(() => {
              checkOrderStatus(user.id).then(resp2 => {
                createOrderItem({
                  orderId: resp2[0].id,
                  productId: productId,
                  quantity: 1
                }).then(console.warn('success creating order item'));
              })
            })
          }
          if (resp.length > 0) {
            createOrderItem({
              orderId: resp[0].id,
              productId: productId,
              quantity: 1
            }).then(console.warn('success on already existing order'));
      } 
        });
        break;
      default:
      break;
    }
  };

  return (
      <CardBody className='product-card m-2 border border-secondary rounded' style={{maxWidth: '18rem', minWidth: '18rem'}}>
        <ProductCardImage>
        <img src={productImage} alt={description}></img>
        </ProductCardImage>
        <CardTitle tag='h4' className='mb-1'>{description}</CardTitle>
        <CardSubtitle tag='h6' className='mb-3 d-flex flex-column' />
          <CardText>${price} per day</CardText>
          <CardText>Quantity: {size}</CardText>
          <CardText>Added on {local}</CardText>
        <ButtonGroup>
          <Button outline onClick={() => handleButton('single')}><AiOutlineInfoCircle /></Button>
          {!!user?.id 
          ? 
          <div>
          <Button outline onClick={() => handleButton('update')}><AiOutlineEdit /></Button>
          <Button outline onClick={() => handleButton('delete')}><AiOutlineDelete /></Button>
          <Button outline onClick={() => handleButton('cart')}><AiOutlineShoppingCart /></Button>
          </div>
          : null
          }
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
              productImage={productImage}
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

const ProductCardImage = styled.div`
img {
  object-fit: cover;
  width: 250px;
  height: 250px;
  margin-top: 5px;
  margin-bottom: 20px;
  border-radius: 5%;
  padding: 3%;
}
`;
