import axios from "axios";
import { toast } from "react-toastify";
export const baseURL = process.env.REACT_APP_MAIN_URL;
const SECONDS = 30;
const MILISECONDS = 1000;
const timeout = SECONDS * MILISECONDS;
const TOKEN_PAYLOAD_KEY = "authorization";

const SERVER = axios.create({
  baseURL,
  timeout,
});

SERVER.interceptors.request.use(function (config) {
  const TOKEN = localStorage.getItem("token");
  if (TOKEN) {
    config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${TOKEN}`;
  }
  return config;
});

SERVER.interceptors.response.use(
  (response) => {
    const result = Promise.resolve(response);
    if (result) {
      // SnackBar(true, 'Helo')
      return Promise.resolve(response);
    }
  },
  (error) => {
    if (error?.response?.status === 403) {
      toast.error(
        "Authentication Fail",
        "Authentication Fail you are need to verify your login"
      );
      return Promise.reject(error.response.data);
    } else if (error.response) {
      return Promise.reject(error.response.data);
    }
  }
);

export default SERVER;
