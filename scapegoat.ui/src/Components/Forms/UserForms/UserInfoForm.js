import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {createNewUser} from '../../../helpers/data/userData';

const SubmitFormButton = styled.div`
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
`;

export default function UserInfoForm() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    userType: '',
    customerTier: '',
    addressLine1: '',
    addressLine2: '',
    postalCode: '',
    cityName: '',
    state: '',
    country: ''
  });
  
  const handleInputChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewUser(user).then(setUser);
    history.push(`/users`);
  };

  return (
    <div>
      <form autoComplete='off'>
        <input
          name='firstName'
          type='text'
          placeholder='First Name'
          value={user.firstName}
          onChange={handleInputChange}
          required
        ></input>
        <br/>
        <input
          name='lastName'
          type='text'
          placeholder='Last Name'
          value={user.lastName}
          onChange={handleInputChange}
        ></input>
        <br/>
        <input
          name='userType'
          type='text'
          placeholder='User Type'
          value={user.userType}
          onChange={handleInputChange}
        ></input>
        <br/>
        <input
          name='customerTier'
          type='text'
          placeholder='Customer Tier'
          value={user.customerTier}
          onChange={handleInputChange}
        ></input>
        <br/>
        <input
          name='addressLine1'
          type='text'
          placeholder='Street Address'
          value={user.addressLine1}
          onChange={handleInputChange}
        ></input>
        <br/>
        <input
          name='addressLine2'
          type='text'
          placeholder='Suite or Apartment (Optional)'
          value={user.addressLine2}
          onChange={handleInputChange}
        ></input>
        <br/>
        <input
          name='postalCode'
          type='text'
          placeholder='Zip Code'
          value={user.postalCode}
          onChange={handleInputChange}
        ></input>
        <br/>
        <input
          name='cityName'
          type='text'
          placeholder='City'
          value={user.cityName}
          onChange={handleInputChange}
        ></input>
        <br/>
        <input
          name='state'
          type='text'
          placeholder='State (USA)'
          value={user.state}
          onChange={handleInputChange}
        ></input>
        <br/>
        <input
          name='country'
          type='text'
          placeholder='Country'
          value={user.country}
          onChange={handleInputChange}
        ></input>
        <br/>
        <hr/>
        <SubmitFormButton onClick={handleSubmit}>
          <div className="button_slide slide_down">Submit</div>
        </SubmitFormButton>
      </form>
    </div>
  );
}
