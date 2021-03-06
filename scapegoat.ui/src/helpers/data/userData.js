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

const getUserByFBKey = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/api/users/authedUsers/${firebaseKey}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getAdminUsers = () => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/api/Users/AdminUsers?IsAdmin=true`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const createNewUser = (user) => new Promise((resolve, reject) => {
  axios.post(`${config.baseUrl}/api/users`, user)
  .then(response => resolve(response.data))
  .catch(error => reject(error));
});

const updateUser = (id, user) => new Promise((resolve, reject) => {
  axios.put(`${config.baseUrl}/api/users/UpdateUserInfo/${id}`, user)
  .then(response => resolve(response))
  .catch(error => reject(error));
});

const softDeleteUser = (id, user) => new Promise((resolve, reject) => {
  axios.put(`${config.baseUrl}/api/users/SoftDeleteUsers/${id}`, user)
  .then(response => resolve(response.data))
  .catch(error => reject(error));
});

const hardDeleteUser = (id) => new Promise((resolve, reject) => {
  axios.delete(`${config.baseUrl}/api/users/${id}`)
  .then(response => resolve(response))
  .catch(error => reject(error));
})

const getUserByType = (userType) => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/api/users/types/${userType}`)
    .then(response => resolve(response.data))
    .catch(error => reject(error));
})

const getUserByTier = (customerTier) => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/api/users/tiers/${customerTier}`)
    .then(response => resolve(response.data))
    .catch(error => reject(error));
})

export {
  getSingleUser, createNewUser, getAllUsers, softDeleteUser, hardDeleteUser, getUserByFBKey, updateUser, getUserByType, getUserByTier, getAdminUsers
};
