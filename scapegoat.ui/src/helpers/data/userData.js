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

const updateUsers = (user) => new Promise((resolve, reject) => {
  axios.patch(`${config.baseUrl}/api/users/${user.id}`, user)
  .then(response => resolve(response.data))
  .catch(error => reject(error));
});

const hardDeleteUser = (id) => new Promise((resolve, reject) => {
  axios.delete(`${config.baseUrl}/api/users/${id}`)
  .then(response => resolve(response))
  .catch(error => reject(error));
})
// const getShopOrderHistory = (id) => new Promise((resolve, reject) => {
//   axios.get(`${config.baseUrl}/api/ShopOrderHistory/${id}`).then((response) => {
//     resolve(response.data);
//   }).catch((error) => reject(error));
// });

// const getPurchaseHistory = (id) => new Promise((resolve, reject) => {
//   axios.get(`${config.baseUrl}/api/PurchaseHistory/${id}`).then((response) => {
//     resolve(response.data);
//   }).catch((error) => reject(error));
// });

// const getFilteredUsers = (searchInput) => new Promise((resolve, reject) => {
//   getAllUsers().then((response) => {
//       const filteredUsers = response.data.filter((user) => user.firstName.toLowerCase().includes(searchInput) || user.lastName.toLowerCase().includes(searchInput));
//       resolve(filteredUsers);
//     })
//     .catch((error) => reject(error));
// });

export {
  getSingleUser, createNewUser, getAllUsers, updateUsers, hardDeleteUser
};;
