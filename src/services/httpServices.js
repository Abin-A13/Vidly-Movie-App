import axios from 'axios'
import { toast } from 'react-toastify'

export function setJwt(jwt){
    axios.defaults.headers.common["x-auth-token"] = jwt
}


axios.interceptors.response.use(null,error=>{
    const unexpectedError = error.response && error.response.status >= 400 && error.response.status < 500
    if(!unexpectedError){
        toast.error("No network")
    }
      
    return Promise.reject(error)
})

export default {
    get:axios.get,
    post:axios.post,
    put:axios.put,
    update:axios.put,
    delete:axios.delete,
    setJwt
}