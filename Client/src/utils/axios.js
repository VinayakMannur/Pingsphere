import axios from "axios";

import { BASE_URL } from "../config";

const axiosInstance = axios.create({ baseURL: BASE_URL });

axios.interceptors.response.use(
  (responce) => responce,
  (error) =>
    Promise.reject(
      (error.responce && error.responce.data) || "Something went wrong"
    )
);

export default axiosInstance
