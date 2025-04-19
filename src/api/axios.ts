import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const getToken = ()=>{
  const navigate = useNavigate()
  const {token} = useAuth()
  if(!token){
    navigate('/login')
    return
  }
  return token;
}
const adminApi = axios.create({
  baseURL: "https://medical-clinic.serv00.net/admin_api",
});

const userApi = axios.create({
  baseURL: "https://medical-clinic.serv00.net/customer_api",
  headers:{
    Accept:'application/json'
  }
});
export {userApi,adminApi}
