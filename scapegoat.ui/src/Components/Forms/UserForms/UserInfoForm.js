import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {createNewUser} from '../../../helpers/data/userData';

export default function UserInfoForm() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    userType: '',
    customerTier: ''
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
        <button
          type='submit'
          onClick={handleSubmit}
        >Submit</button>
      </form>
    </div>
  );
}

// UserInfoForm.propTypes = {
//   firstName: PropTypes.string,
//   lastName: PropTypes.string,
//   id: PropTypes.any,
//   createdAt: PropTypes.any,
//   customerTier: PropTypes.any,
//   userType: PropTypes.any
// }
