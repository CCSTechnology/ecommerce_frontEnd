import axios from "axios";
import { toast } from "react-toastify";

// export const baseURL = import.meta.env.REACT_APP_MAIN_URL;
export const baseURL = import.meta.env.VITE_APP_MAIN_URL;

const SECONDS = 30;
const MILISECONDS = 1000;
const timeout = SECONDS * MILISECONDS;
const TOKEN_PAYLOAD_KEY = "authorization";

const PUBLICSERVER = axios.create({
  // baseURL: "http://staggingapi.truevine.in/api",
  baseURL,
  timeout,
});

PUBLICSERVER.interceptors.request.use(function (config) {
  const TOKEN = localStorage.getItem("public_token");
  if (TOKEN) {
    config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${TOKEN}`;
  }
  return config;
});

PUBLICSERVER.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  (error) => {
    if (error?.response?.status === 403) {
      const path = String(window.location.href).split("/").slice(3).join("/");
      const domain = import.meta.env.VITE_APP_DOMAIN_URL + "login";
      const url = new URL(domain);
      url.searchParams.set("callBackUrl", `/${path}`);
      localStorage.removeItem('public_token')
      setInterval(() => {
        window.location.href = url;
      }, [2000]);
      return Promise.reject(error.response.data);
    } else if (error?.response) {
      return Promise.reject(error.response.data);
    } else {
      return Promise.reject({
        error: "Network Error",
      });
    }
  }
);

export default PUBLICSERVER;
