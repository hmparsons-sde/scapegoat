import axios from "axios";
import config from "../config";

const getAllUsers = () => new Promise((resolve, reject) => {
  axios.get(`${config.baseUrl}/api/Users`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
});

export {getAllUsers};
