import axios from "axios";
import config from "../config";

const getAllPayments = () => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/api/PaymentType`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
});

const getSinglePayment = (id) => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/singlepayment/${id}`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getPaymentByUser = (userId) => new Promise((resolve, reject) => {
    axios.get(`${config.baseUrl}/api/PaymentType/userPaymentMethods/${userId}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
});

const createNewPayment = (paymentObject) => new Promise((resolve, reject) => {
    axios.post(`${config.baseUrl}/api/PaymentType/`, paymentObject)
    .then((response) => {
      resolve(response.data);
    }).catch((error) => reject(error));
});

const updatePayment = (id, paymentObject) => new Promise((resolve, reject) => {
    axios.put(`${config.baseUrl}/api/PaymentType/${id}`, paymentObject)
        .then(response => resolve(response.data))
        .catch(error => reject(error));
});

const deletePayment= (id) => new Promise((resolve, reject) => {
    axios.delete(`${config.baseUrl}/api/PaymentType/${id}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
})

export { getAllPayments, getSinglePayment, getPaymentByUser, createNewPayment, updatePayment, deletePayment};
