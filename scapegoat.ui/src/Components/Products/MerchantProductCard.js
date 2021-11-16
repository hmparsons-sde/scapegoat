import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, ButtonGroup, CardBody, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { deleteProduct, deleteProductByType } from "../../helpers/data/productData";
import ProductForm from "./ProductForm";
import { AiOutlineShoppingCart, AiOutlineDelete, AiOutlineInfoCircle, AiOutlineEdit } from 'react-icons/ai'
import { checkOrderStatus, createOrder, createOrderItem } from "../../helpers/data/orderData";

export default function MerchantProductCard({
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
      <CardBody className='product-card m-2 border border-dark rounded' style={{maxWidth: '18rem'}}>
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