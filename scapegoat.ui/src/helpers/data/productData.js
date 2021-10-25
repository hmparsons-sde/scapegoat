import axios from "axios";
import config from "../config";

const getAllProducts = () => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/api/Products`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
});

const getSingleProduct = (id) => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/Products/${id}`)
    .then(response => resolve(response.data))
    .catch(error => reject(error));
});

export {getAllProducts, getSingleProduct};
