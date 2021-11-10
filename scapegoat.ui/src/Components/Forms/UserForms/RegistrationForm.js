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

export default function RegistrationForm() {
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
          <select
            as='select'
            name='state'
            placeholder='State (USA)'
            value={user.state}
            onChange={handleInputChange}
          >
              <option value="AL">AL</option>
              <option value="AK">AK</option>
              <option value="AR">AR</option>	
              <option value="AZ">AZ</option>
              <option value="CA">CA</option>
              <option value="CO">CO</option>
              <option value="CT">CT</option>
              <option value="DC">DC</option>
              <option value="DE">DE</option>
              <option value="FL">FL</option>
              <option value="GA">GA</option>
              <option value="HI">HI</option>
              <option value="IA">IA</option>	
              <option value="ID">ID</option>
              <option value="IL">IL</option>
              <option value="IN">IN</option>
              <option value="KS">KS</option>
              <option value="KY">KY</option>
              <option value="LA">LA</option>
              <option value="MA">MA</option>
              <option value="MD">MD</option>
              <option value="ME">ME</option>
              <option value="MI">MI</option>
              <option value="MN">MN</option>
              <option value="MO">MO</option>	
              <option value="MS">MS</option>
              <option value="MT">MT</option>
              <option value="NC">NC</option>	
              <option value="NE">NE</option>
              <option value="NH">NH</option>
              <option value="NJ">NJ</option>
              <option value="NM">NM</option>			
              <option value="NV">NV</option>
              <option value="NY">NY</option>
              <option value="ND">ND</option>
              <option value="OH">OH</option>
              <option value="OK">OK</option>
              <option value="OR">OR</option>
              <option value="PA">PA</option>
              <option value="RI">RI</option>
              <option value="SC">SC</option>
              <option value="SD">SD</option>
              <option value="TN">TN</option>
              <option value="TX">TX</option>
              <option value="UT">UT</option>
              <option value="VT">VT</option>
              <option value="VA">VA</option>
              <option value="WA">WA</option>
              <option value="WI">WI</option>	
              <option value="WV">WV</option>
              <option value="WY">WY</option>
          </select>
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
