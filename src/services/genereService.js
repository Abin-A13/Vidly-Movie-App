import http from "./httpServices";
import config from "../config.json";

const endpoint = config.apiUrl

export function getGenere() {
  return http.get(endpoint+"/genres");
}
