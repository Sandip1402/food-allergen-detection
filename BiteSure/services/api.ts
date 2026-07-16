import axios from "axios";

const API = axios.create({
  baseURL: "http://10.78.82.148:8000/api",
  timeout: 60000,
});

export default API;