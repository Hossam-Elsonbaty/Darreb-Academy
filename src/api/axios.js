import axios from "axios";
import { handleChangeLoader } from "../Store/Slices/loaderSlice.js";

const api = axios.create({
  baseURL: "https://darreb-academy-backend.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  import("../Store/store.js").then(({ store }) => {
      store.dispatch(handleChangeLoader(true));
    });
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},(err)=>{
  Promise.reject(err)
});
api.interceptors.response.use((config)=>{
  import("../Store/store.js").then(({ store }) => {
    store.dispatch(handleChangeLoader(false));
  });
  return config
},(err)=>{
  Promise.reject(err)
})

export default api;

