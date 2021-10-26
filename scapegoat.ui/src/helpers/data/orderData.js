import axios from "axios";
import config from "../config";

// order data

const getAllOrders = () => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/api/orders`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
});

const getSingleOrderById = (id) => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/api/orders/${id}`)
    .then(response => resolve(response.data))
    .catch(error => reject(error));
});

const getSingleUserOrder = (userId) => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/userorder/${userId}`)
  .then(response => resolve(response.data))
  .catch(error => reject(error));
});

const createOrder = () => new Promise((resolve, reject) => {
  axios.post(`${config.baseUrl}/api/orders`)
  .then(response => resolve(response.data))
  .catch(error => reject(error));
});

const updateOrder = (id) => new Promise((resolve, reject) => {
  axios.put(`${config.baseUrl}/api/orders/${id}`)
  .then(response => resolve(response.data))
  .catch(error => reject(error));
});

// order join data




export {
  getAllOrders,
  getSingleOrderById,
  getSingleUserOrder,
  createOrder,
  updateOrder
};
