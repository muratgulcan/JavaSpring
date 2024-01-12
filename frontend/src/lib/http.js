import axios from "axios";
import { i18nInstance } from "../locales";
import { loadToken, storeToken } from "../shared/state/storage";

let authToken = loadToken();
const http = axios.create();

export function setToken(token) {
  authToken = token;
  storeToken(token);
}

http.interceptors.request.use((config) => {
  config.headers["Accept-Language"] = i18nInstance.language;
  if (authToken) {
    config.headers["authorization"] = `${authToken.prefix} ${authToken.token}`;
  }
  return config;
});

export default http;
