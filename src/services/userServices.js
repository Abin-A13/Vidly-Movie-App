import http from "./httpServices";
import config from "../config.json"

const endpoint = config.apiUrl + "/users";

export function register(user){
    return http.post(endpoint,{
        name: user.full_name,
        email: user.username,
        password: user.password,
    })
}
