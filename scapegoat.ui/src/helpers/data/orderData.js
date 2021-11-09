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

const getMerchantOrders = (userId) => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/merchantorders/${userId}`)
  .then(response => resolve(response.data))
  .catch(error => reject(error));
});

const createOrder = (order) => new Promise((resolve, reject) => {
  axios.post(`${config.baseUrl}/api/orders`, order)
  .then(response => resolve(response.data))
  .catch(error => reject(error));
});

const updateOrder = (order) => new Promise((resolve, reject) => {
  axios.put(`${config.baseUrl}/api/orders/${order.id}`, order)
  .then(response => resolve(response.data))
  .catch(error => reject(error));
});

const deleteOrder = (id) => new Promise((resolve, reject) => {
  axios.delete(`${config.baseUrl}/harddeleteorder/${id}`)
  .then(response => resolve(response))
  .catch(error => reject(error));
});

const checkOrderStatus = (userId) => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/pendingCustomerOrder/${userId}`)
  .then(response => resolve(response.data))
  .then(error => reject(error));
});

const getPendingOrderInfo = (userId) => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/openOrder/${userId}`)
  .then(response => resolve(response.data))
  .then(error => reject(error));
}); 

// order join data

const getAllOrderItems = () => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/api/orderitems`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
});

const getOrderItemsByOrderId = (id) => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/orderid/${id}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
});

const getOrderItemsById = (id) => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/api/orderitems/${id}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
});

const createOrderItem = (orderItem) => new Promise((resolve, reject) => {
  axios.post(`${config.baseUrl}/api/orderitems`, orderItem)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
});

const updateOrderItem = (orderItem) => new Promise((resolve, reject) => {
  axios.put(`${config.baseUrl}/api/orderitems/${orderItem.id}`, orderItem)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
});

const deleteOrderItem = (id) => new Promise((resolve, reject) => {
  axios.delete(`${config.baseUrl}/harddelete/${id}`)
      .then(response => resolve(response))
      .catch(error => reject(error));
});

export {
  getAllOrders,
  getSingleOrderById,
  getSingleUserOrder,
  getMerchantOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  checkOrderStatus,
  getPendingOrderInfo,
  getAllOrderItems,
  getOrderItemsById,
  getOrderItemsByOrderId,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem
};
