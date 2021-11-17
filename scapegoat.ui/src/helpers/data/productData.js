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

const getMerchantProducts = (id) => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/merchantProducts/${id}`)
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

const deleteMerchantProduct = (id) => new Promise((resolve, reject) => {
  axios.delete(`${config.baseUrl}/api/Products/${id}`)
    .then(response => resolve(response))
    .catch(error => reject(error));
});

const updateProduct = (id, product) => new Promise((resolve, reject) => {
  axios.put(`${config.baseUrl}/api/Products/${id}`, product)
  .then(() => {
    getAllProducts().then(response => resolve(response));
  })
    .catch(error => reject(error));
});

const updateMerchantProduct = (id, product) => new Promise((resolve, reject) => {
  axios.put(`${config.baseUrl}/api/Products/${id}`, product)
  .then(() => {
    getMerchantProducts(product.merchantId).then(response => resolve(response));
  })
    .catch(error => reject(error));
});

const createProduct = (product) => new Promise((resolve, reject) => {
  axios.post(`${config.baseUrl}/api/Products`, product)
    .then(() => {
      getAllProducts().then(response => resolve(response));
    })
      .catch(error => reject(error));
});

const createMerchantProduct = (product) => new Promise((resolve, reject) => {
  axios.post(`${config.baseUrl}/api/Products`, product)
  .then(response => resolve(response))
  .catch(error => reject(error));
});

const getProductsByType = (type) => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/api/Products/ProductTypes/${type}`)
    .then(response => resolve(response.data))
    .catch(error => reject(error));
})

const deleteProductByType = (id, category) => new Promise((resolve, reject) => {
  axios.delete(`${config.baseUrl}/api/Products/${id}`)
    .then(() => {
      getProductsByType(category).then(response => resolve(response));
    })
    .catch(error => reject(error));
});

const updateProductByType = (id, product, category) => new Promise((resolve, reject) => {
  axios.put(`${config.baseUrl}/api/Products/${id}`, product)
  .then(() => {
    getProductsByType(category).then(response => resolve(response));
  })
    .catch(error => reject(error));
});


export { 
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  createProduct,
  getProductsByType,
  deleteProductByType,
  updateProductByType,
  getMerchantProducts,
  createMerchantProduct,
  updateMerchantProduct,
  deleteMerchantProduct
};
