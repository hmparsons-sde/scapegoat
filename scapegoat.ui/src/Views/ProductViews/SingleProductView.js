import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import moment from 'moment';
import { getSingleProduct} from '../../helpers/data/productData';
import { getUserByFBKey } from '../../helpers/data/userData';
import { checkOrderStatus, createOrder, createOrderItem } from '../../helpers/data/orderData';

export default function SingleProductView({ firebaseUser }) {
  const [singleProduct, setSingleProduct] = useState({});
  // const [date, setDate] = useState('');
  const { id } = useParams();
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    getSingleProduct(id).then(data => {
      setSingleProduct(data);
      // setDate(data.createdAt.split('T'));
    });
  }, [id]);

  useEffect(() => {
    getUserByFBKey(firebaseUser?.uid).then(setUser);

  },[firebaseUser.uid])

  const date = moment.utc(singleProduct.createdAt).format();
  const local = moment.utc(date).local().format("dddd, MMMM Do YYYY, h:mm a");

  const handleButton = (p) => {
    switch (p) {
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
                  productId: singleProduct.productId,
                  quantity: 1
                }).then(console.warn('success creating order item'));
              })
            })
          }
          if (resp.length > 0) {
            createOrderItem({
              orderId: resp[0].id,
              productId: singleProduct.productId,
              quantity: 1
            }).then(console.warn('success on already existing order'));
      } 
      history.push(`/cart`);
        });
        break;
        case 'merch':
          history.push(`/merchantStore/${singleProduct.merchantId}`);
          break;
      default:
      break;
    }
  };

  return (
    <div>
      <SingleProductHeader><h1>{singleProduct.description}</h1></SingleProductHeader>
      <SingleProductContainer>
        <SingleProductImage>
        <img src={singleProduct.productImage} alt={singleProduct.description}></img>
        </SingleProductImage>
        <h4>${singleProduct.price} per day</h4>
        <h4>Quantity: {singleProduct.size}</h4>
        <h4>Created on {local}</h4>
        { !!user?.id
        ? <AddProductToCartButton onClick={() => handleButton('cart')}>
        <div className="button_slide slide_down">
          Add to Cart
        </div>
      </AddProductToCartButton>
        : null
        }
        <AddProductToCartButton onClick={() => handleButton('merch')}>
          <div className="button_slide slide_down">
            See More Products
          </div>
        </AddProductToCartButton>
      </SingleProductContainer>
    </div>
  );
}
const SingleProductHeader = styled.div`
h1 {
  font-weight: 400;
  line-height: 1.2;
  margin-top: 5%;
}
`;
const SingleProductContainer = styled.div`
h1, h2, h3, h4, h5, p {
  font-weight: 300;
  line-height: 1.2;
}
margin-bottom: 25%;
background-color: #FDF1E9;
`;
const AddProductToCartButton = styled.div`
.button_slide {
  color: black;
  border: 2px solid #e7e7e7;
  border-radius: 0px;
  padding: 18px 36px;
  display: inline-block;
  font-size: 14px;
  letter-spacing: 1px;
  cursor: pointer;
  box-shadow: inset 0 0 0 0 #e7e7e7;
  -webkit-transition: ease-out 0.4s;
  -moz-transition: ease-out 0.4s;
  transition: ease-out 0.4s;
}
.slide_down:hover {
  box-shadow: inset 0 100px 0 0 #e7e7e7;
}
align-content: center;
margin-top: 25px;
margin-bottom: 15px;
`;
const SingleProductImage = styled.div`
img {
  object-fit: cover;
  width: 450px;
  height: 450px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 5%;
  padding: 3%;
}
`;
