import axios from "axios";

const adminApi = axios.create({
  baseURL: "https://medical-clinic.serv00.net/admin_api",
  headers:{
    "Authorization":`Bearer ${localStorage.getItem('token')}`
  }
});

const userApi = axios.create({
  baseURL: "https://medical-clinic.serv00.net/customer_api",
  headers:{
    Accept:'application/json'
  }
});
export {userApi,adminApi}
