import axios from "axios";
import { SERVER_URL } from "../constants";

// localStorage for token
const LocalTokenName = "AUTH_TOKEN";
const getLocalToken = () => localStorage.getItem(LocalTokenName);
const setLocalToken = (token: string) =>
  localStorage.setItem(LocalTokenName, token);
const clearLocalToken = () => localStorage.removeItem(LocalTokenName);

// set the axios
export const Server = axios.create({
  baseURL: SERVER_URL,
  // timeout: 1000,
});
// if has local token
if (getLocalToken())
  Server.defaults.headers.common["Authorization"] = getLocalToken();

export const updateAuthorization = (token: string) => {
  setLocalToken(token);
  axios.defaults.headers.common["Authorization"] = token;
};
export const clearAuthorization = () => {
  clearLocalToken();
  axios.defaults.headers.common["Authorization"] = "";
};
