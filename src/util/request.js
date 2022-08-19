import axios from "axios";
import store from "../redux/store.js";
import { alertMessage } from "./common/alertToastMessages.js";
import { server_url } from "./config.js";
import { Log } from "./index.js";

const request = () => {
  let instance = axios.create({});
  instance.interceptors.request.use(async (config) => {
    const { token, user } = store.getState()?._auth;
    config.headers.Authorization = token || user?.token;
    config.baseURL = server_url;
    return config;
  });
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      Log("error.response.data.error", error.response.data.message, error);
      alertMessage(error.response.data.message);
      // if ([401, 403].includes(error.response.status)) {
      //   alertMessage(error.response.data.message);
      // }
      return error.response;
    }
  );
  return instance;
};

export default request();
