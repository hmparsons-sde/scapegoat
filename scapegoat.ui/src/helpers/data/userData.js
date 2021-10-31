import axios from "axios";
import config from "../config";

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/api/Users`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
});

const getSingleUser = (id) => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/api/Users/${id}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const createNewUser = (userObject) => new Promise((resolve, reject) => {
  axios.post(`${config.baseUrl}/api/Users/`, userObject)
    .then((response) => {
      resolve(response.data);
    }).catch((error) => reject(error));
});
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
  getSingleUser, createNewUser, getAllUsers
};;
