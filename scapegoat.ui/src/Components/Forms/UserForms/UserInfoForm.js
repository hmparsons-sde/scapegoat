import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {createNewUser, updateUsers} from '../../../helpers/data/userData';

export default function UserInfoForm({firstName, lastName, id, customerTier, userType, createdAt}) {
  const [user, setUser] = useState({
    firstName: firstName,
    lastName: lastName,
    id: id,
    createdAt: createdAt,
    userType: userType,
    customerTier: customerTier
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
    if (id) {
      updateUsers(user).then(setUser);
    } else {
      createNewUser(user).then(setUser);
      history.push(`/users`);
    }
  };

  return (
    <div>
      <form>
        <input
          name='first name'
          type='text'
          placeholder='First Name'
          value={firstName}
          onChange={handleInputChange}
        ></input>
        <input
          name='last name'
          type='text'
          placeholder='Last Name'
          value={lastName}
          onChange={handleInputChange}
        ></input>
        <input
          name='user type'
          type='number'
          placeholder='User Type'
          value={userType}
          onChange={handleInputChange}
        ></input>
        <input
          name='customer tier'
          type='number'
          placeholder='Customer Tier'
          value={customerTier}
          onChange={handleInputChange}
        ></input>
        <button
          type='submit'
          onClick={handleSubmit}
        >Submit</button>
      </form>
    </div>
  );
}

UserInfoForm.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  id: PropTypes.any,
  createdAt: PropTypes.any,
  customerTier: PropTypes.any,
  userType: PropTypes.any
}
