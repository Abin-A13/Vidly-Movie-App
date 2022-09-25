import http from "./httpServices";
import config from "../config.json";
import jwtDecode from "jwt-decode";

const endpoint = config.apiUrl + "/auth";

http.setJwt(getjwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(endpoint, { email, password });
  localStorage.setItem("token", jwt);
}
export function register() {
  localStorage.removeItem("token");
}
export function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}
export function logout() {
  localStorage.removeItem("token");
}
export function getCurrentUser() {
  try {
    // localstoe is browser database we taken set token as a token and get by name
    const jwt = localStorage.getItem("token");
    const user = jwtDecode(jwt);
    // to decode json
    return user;
  } catch (error) {
    return null;
  }
}
export function getjwt() {
  return localStorage.getItem("token");
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getjwt,
};
