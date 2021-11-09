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
  axios.get(`${config.baseUrl}/api/users/${firebaseKey}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});


const createNewUser = (user) => new Promise((resolve, reject) => {
  axios.post(`${config.baseUrl}/api/users`, user)
  .then(response => resolve(response.data))
  .catch(error => reject(error));
});

const updateUser = (id, user) => new Promise((resolve, reject) => {
  axios.put(`${config.baseUrl}/api/users/${id}`, user)
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
  getSingleUser, createNewUser, getAllUsers, softDeleteUser, hardDeleteUser, getUserByFBKey, updateUser
};
