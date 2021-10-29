import axios from "axios";
import config from "../config";

const getAllProducts = () => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/api/Products`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
});

const getSingleProduct = (id) => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/api/Products/${id}`)
    .then(response => resolve(response.data))
    .catch(error => reject(error));
});

const deleteProduct = (id) => new Promise((resolve, reject) => {
  axios.delete(`${config.baseUrl}/api/Products/${id}`)
    .then(() => {
      getAllProducts().then(response => resolve(response));
    })
    .catch(error => reject(error));
});

const updateProduct = (product) => new Promise((resolve, reject) => {
  axios.put(`${config.baseUrl}/api/Products/${product.productId}`, product)
    .then(() => {
      getAllProducts().then(response => console.wanr(response));
    })
    .catch(error => reject(error));
});

export { getAllProducts, getSingleProduct, deleteProduct, updateProduct };
