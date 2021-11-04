import axios from "axios";
import config from "../config";

const getAllPayments = () => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/api/Payments`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
});

const getSinglePayment = (id) => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/api/Payments/${id}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getPaymentByUser = (userId) => new Promise((resolve, reject) => {
    axios.get(`${config.baseUrl}/userpayments/${userId}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
});

const createNewPayment = (paymentObject) => new Promise((resolve, reject) => {
    axios.post(`${config.baseUrl}/api/Payments/`, paymentObject)
    .then((response) => {
      resolve(response.data);
    }).catch((error) => reject(error));
});

const updatePayment = (paymentObject) => new Promise((resolve, reject) => {
    axios.put(`${config.baseUrl}/api/Payments/${paymentObject.id}`, paymentObject)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
});

const deletePayment= (id) => new Promise((resolve, reject) => {
    axios.delete(`${config.baseUrl}/deletepayment/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
})

export { getAllPayments, getSinglePayment, getPaymentByUser, createNewPayment, updatePayment, deletePayment};
