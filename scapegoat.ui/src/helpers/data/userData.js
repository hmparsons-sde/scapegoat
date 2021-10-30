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

const getShopOrderHistory = (id) => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/api/Users/ShopOrderHistory/${id}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getPurchaseHistory = (id) => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/api/Users/PurchaseHistory/${id}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

// const getFilteredSellers = (searchInput) => new Promise((resolve, reject) => {
//   axios.get(`${config.baseUrl}/seller-search`).then((response) => {
//     const filteredSellers = response.data.filter((seller) => seller.firstName.toLowerCase().includes(searchInput) || seller.lastName.toLowerCase().includes(searchInput));
//     resolve(filteredSellers);
//   })
//     .catch((error) => reject(error));
// });

export {
  getSingleUser, getShopOrderHistory, getPurchaseHistory, createNewUser, getAllUsers
};;
