import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { createNewUser } from '../../../helpers/data/userData';

export default function UserForm ({firstName, lastName})
{
  const [user, setUser] = useState({
    firstName: '',
    lastName: ''
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
    history.push('users');
  };

  return (
    <div className="user-form-container">
      <form>
        <label for="firstname">First Name</label>
        <input type="text" id="fname" name="firstname" value={firstName} onChange={handleInputChange} placeholder="Your name.."></input>
        <label for="lastname">Last Name</label>
        <input type="text" id="lname" name="lastname" value={lastName} onChange={handleInputChange} placeholder="Your last name.."></input>
        <button type="submit" onClick={handleSubmit} value="Submit"></button>
      </form>
    </div>
  )
}
UserForm.propTypes = {
  user: PropTypes.any,
  firstName: PropTypes.string,
  lastName: PropTypes.string
};
