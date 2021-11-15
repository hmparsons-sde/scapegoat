import React, { useState } from 'react';
import { useHistory } from "react-router";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import orderhistory from '../../../assets/orderhistory.jpg';
import paymenttype from '../../../assets/paymenttype.jpg';
import cartimage from '../../../assets/cartimage.jpg';
import moment from 'moment';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import UserInfoForm from '../../../Components/Forms/UserForms/UserInfoForm';
export default function CustomerDashboardView({user, photoURL, setUser}) {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const closeIcon = (
    <AiOutlineCloseCircle/>
  );

  const history = useHistory();
  const handleCartClick = () => {
    history.push(`cart`);
  };
  const handleOrderHistoryClick = () => {
    history.push(`orders`);
  };
  const handlePaymentTypeClick = () => {
    history.push(`payments`);
  };

  const date = moment.utc(user.createdAt).format();
  const local = moment.utc(date).local().format("dddd, MMMM Do YYYY, h:mm a");

  return (
    <div>
      <SingleUser user={user}>
        <img src={photoURL} alt='profile'></img>
        <EditUserFormButton onClick={onOpenModal}>
          <div className="button_slide slide_down">
              Update Profile
          </div>
        </EditUserFormButton>
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
        <h1 tag="h1" className='mt-1'>{user.firstName} {user.lastName}</h1>
        <h4>Type: {user.userType}</h4>
        <h4>Tier: {user.customerTier}</h4>
        <h4>Created: {local}</h4>
        <h4>{user.addressLine1}, {user.addressLine2}, {user.cityName}, {user.state}, {user.country}</h4>
      </SingleUser>
      <UserCategories>
      <UserCategoryCard className="card">
        <img src={orderhistory} alt='order history'></img>
        <h2 className="card-body" onClick={() => handleOrderHistoryClick()}>Order History</h2>
      </UserCategoryCard>
      <UserCategoryCard className="card">
        <img src={paymenttype} alt='payment type'></img>
        <h2 className="card-body" onClick={() => handlePaymentTypeClick()}>Payment Types</h2>
      </UserCategoryCard>
      <UserCategoryCard className="card">
      <img src={cartimage} alt='cart'></img>
        <h2 className="card-body" onClick={() => handleCartClick()}>View Cart</h2>
      </UserCategoryCard>
      </UserCategories>
    </div>
  );
}

CustomerDashboardView.propTypes = {
  id: PropTypes.string,
};

const SingleUser = styled.div`
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

  img {
    object-fit: cover;
    width: 150px;
    height: 150px;
    margin-top: 20px;
    border-radius: 50%;
    border: 15px solid transparent;
  }
`;

const UserCategories = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  margin-bottom: 25%;
  background-color: #FDF1E9;

  h2, h3, h4, h5 {
    font-weight: 300;
    line-height: 1.2;
  }
`;

const UserCategoryCard = styled.div`
  width: 300px;
  height: auto;
  margin: 15px;
  border: 15px solid transparent;
  box-shadow: 50px;
  background-color: #FDF1E9;

  img {
    object-fit: cover;
    width: 250px;
    height: 250px;
    margin-top: 20px;
    border-radius: 50%;
  }

  h2 {
    cursor: pointer;
  }
`;
const EditUserFormButton = styled.div`
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
  margin-top: 10px;
`;
