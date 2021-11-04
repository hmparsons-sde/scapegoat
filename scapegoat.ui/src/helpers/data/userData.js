import axios from "axios";
import config from "../config";

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/api/users`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
});

const getSingleUser = (id) => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/api/users/${id}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const createNewUser = (user) => new Promise((resolve, reject) => {
  axios.post(`${config.baseUrl}/api/users`, user)
  .then(response => resolve(response.data))
  .catch(error => reject(error));
});

const softDeleteUser = (id, user) => new Promise((resolve, reject) => {
  axios.put(`${config.baseUrl}/api/users/${id}`, user)
  .then(response => resolve(response.data))
  .catch(error => reject(error));
});

const hardDeleteUser = (id) => new Promise((resolve, reject) => {
  axios.delete(`${config.baseUrl}/api/users/${id}`)
  .then(response => resolve(response))
  .catch(error => reject(error));
})

export {
  getSingleUser, createNewUser, getAllUsers, softDeleteUser, hardDeleteUser
};

// import React, { useState} from 'react';
// import { useHistory } from 'react-router-dom';
// import {createNewUser} from '../../../helpers/data/userData';

// export default function UserInfoForm({editUser ={}}) {
//   const [user, setUser] = useState({
//     firstName: editUser.firstName || '',
//     lastName: editUser.lastName || '',
//     userType: editUser.userType || '',
//     customerTier: editUser.customerTier || ''
//   });
  
//   const handleInputChange = (e) => {
//     setUser((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const history = useHistory();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // if (editUser) {
//     //   updateUsers(editUser.id, user);
//     // } else {
//       createNewUser(user).then(setUser);
//     // }

//     history.push(`/users`);
//   };

//   return (
//     <div>
//       <form autoComplete='off'>
//         <input
//           name='firstName'
//           type='text'
//           placeholder='First Name'
//           value={editUser.firstName || user.firstName}
//           onChange={handleInputChange}
//         ></input>
//         <br/>
//         <input
//           name='lastName'
//           type='text'
//           placeholder='Last Name'
//           value={editUser.lastName || user.lastName}
//           onChange={handleInputChange}
//         ></input>
//         <br/>
//         <input
//           name='userType'
//           type='text'
//           placeholder='User Type'
//           value={editUser.userType || user.userType}
//           onChange={handleInputChange}
//         ></input>
//         <br/>
//         <input
//           name='customerTier'
//           type='text'
//           placeholder='Customer Tier'
//           value={editUser.customerTier || user.customerTier}
//           onChange={handleInputChange}
//         ></input>
//         <br/>
//         <button
//           type='submit'
//           onClick={handleSubmit}
//         >Submit</button>
//       </form>
//     </div>
//   );
// }
