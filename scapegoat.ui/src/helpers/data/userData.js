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

export {getAllUsers, createNewUser, getSingleUser};
