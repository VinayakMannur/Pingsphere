import axios from "axios";

export const BASE_URL = "https://pingsphere.onrender.com"
// const BASE_URL = "http://localhost:5000"

const axiosInstance = axios.create({ baseURL: BASE_URL });

axios.interceptors.response.use(
  (responce) => responce,
  (error) =>
    Promise.reject(
      (error.responce && error.responce.data) || "Something went wrong"
    )
);

export default axiosInstance
