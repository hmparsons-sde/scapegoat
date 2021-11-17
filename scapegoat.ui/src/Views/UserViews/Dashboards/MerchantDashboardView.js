import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Modal from 'react-responsive-modal';
import styled from 'styled-components';
import UserInfoForm from '../../../Components/Forms/UserForms/UserInfoForm';
import FulfillOrders from '../../../Components/Orders/FulfillOrders';
import MerchantMetrics from '../../../Components/Orders/MerchantMetrics';
import MerchantProductCard from '../../../Components/Products/MerchantProductCard';
import MerchantProductForm from '../../../Components/Products/MerchantProductForm';
import { getMerchantOrders, getMonthlyOrders } from '../../../helpers/data/orderData';
import { getMerchantProducts } from '../../../helpers/data/productData';

const FlexyDiv = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
padding: 2rem;
`;

const FormButton = styled.div`
  .button_slide {
    color: black;
    border: 2px solid #e7e7e7;
    border-radius: 0px;
    padding: 18px 36px;
    display: inline-block;
    font-size: 14px;
    letter-spacing: 1px;
    cursor: pointer;
    box-shadow: inset 0 0 0 0 #000000;
    -webkit-transition: ease-out 0.4s;
    -moz-transition: ease-out 0.4s;
    transition: ease-out 0.4s;
  }
  .slide_down:hover {
    box-shadow: inset 0 100px 0 0 #000000;
    color: white;
  }
  align-content: center;
  margin-top: 10px;
`;

const PageWrapper = styled.div`
background-size:auto, 100% 100%;
font-size: 16px;
line-height: 1.5;
font-weight: 300;
min-height: 100%;
overflow-y: scroll;
width: 100%;
margin: 50px;

h1, h3, h4 {
  font-weight: 300;
  line-height: 1.2;
}
}`;

export default function MerchantDashboardView({ user, setUser }) {
  const [merchantOrders, setMerchantOrders] = useState([]);
  const [thisMonthOrders, setThisMonthOrders] = useState([]);
  const [merchantProducts, setMerchantProducts] = useState([]);
  const [updateSwitch, setUpdateSwitch] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const closeIcon = (
    <AiOutlineCloseCircle/>
  );


  useEffect(() => {
    getMerchantOrders(user?.id).then(setMerchantOrders);
    getMonthlyOrders(user?.id).then(setThisMonthOrders);
    getMerchantProducts(user?.id).then(setMerchantProducts);
  }, [updateSwitch, user?.id]);

  return (
    <PageWrapper>
      <h1>merchant dash</h1>
      <FormButton onClick={onOpenModal}>
          <div className="button_slide slide_down">
              Update Profile
          </div>
        </FormButton>
        <Modal
          id="userInfoFormModal"
          open={open}
          onClose={onCloseModal}
          center
          closeIcon={closeIcon}
          classNames={{
            overlay: 'customOverlay',
            modal: 'customModal',
          }}
        >
          <UserInfoForm user={user} onCloseModal={onCloseModal} setUser={setUser}/>
        </Modal>
      <h3>{user?.firstName} {user?.lastName}</h3>
      {
      merchantOrders
      ? <div>
        <h3>My Orders</h3>
        <FlexyDiv>
          { merchantOrders.map((order) => (
          <FulfillOrders key={order.id} orders={order}/>
          ))
          } 
        </FlexyDiv>
      </div>
      : null
      }
      
      <h3>Metrics</h3>
      <MerchantMetrics merchantOrders={merchantOrders} monthlyOrders={thisMonthOrders} />

      <h3>My Products</h3>
      <div>
      {
        addProduct
            ? <FormButton onClick={() => setAddProduct(!addProduct)}><div className="button_slide slide_down">
            Cancel
        </div>
        </FormButton>
        : <FormButton outline onClick={() => setAddProduct(!addProduct)}><div className="button_slide slide_down">
        Add Product
    </div></FormButton>
      }
       {
            addProduct
            ?
                <MerchantProductForm
                  setAddProduct={setAddProduct}
                  merchantId={user?.id}
                  setUpdateSwitch={setUpdateSwitch}
                />
            : null
       }        
      </div>

      {merchantProducts
      ? <FlexyDiv>
      { merchantProducts.map((product) => (
        <MerchantProductCard 
        key={product.productId}
        productId={product.productId} 
        productType={product.productType} 
        description={product.description} 
        merchantId={product.merchantId} 
        price={product.price}
        size={product.size}
        productImage={product.productImage}
        createdAt={product.createdAt}
        setUpdateSwitch={setUpdateSwitch}
        setMerchantProducts={setMerchantProducts}/>
      ))} </FlexyDiv>
      : <p>You currently have no products.</p>
      }
    </PageWrapper>
  )
}
