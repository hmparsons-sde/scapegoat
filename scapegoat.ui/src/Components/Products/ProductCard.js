import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button, ButtonGroup, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { deleteProduct } from "../../helpers/data/productData";
import ProductForm from "./ProductForm";
import { AiOutlineShoppingCart, AiOutlineDelete, AiOutlineInfoCircle, AiOutlineEdit } from 'react-icons/ai'
import { checkOrderStatus, createOrder, createOrderItem } from "../../helpers/data/orderData";

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
  // const [orderObj, setOrderObj] = useState({});
  // const [newOrder, setNewOrder] = useState({});

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
      case 'cart':
        checkOrderStatus('0999c62f-0951-49fd-bc38-df8df6d4d244').then(resp => {
          if (resp.length === 0) {
            createOrder({
              userId: '0999c62f-0951-49fd-bc38-df8df6d4d244',
              status: 'pending',
            }).then(() => {
              checkOrderStatus('0999c62f-0951-49fd-bc38-df8df6d4d244').then(resp2 => {
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
        <Button outline onClick={() => handleButton('cart')}><AiOutlineShoppingCart /></Button>
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
