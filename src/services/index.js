import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice.js";
import store from "../store/store.js";

import axios from 'axios';
const api=axios.create({
    baseURL:'/api'
});
function dispatchLogout() {
  store.dispatch(logout()); 
  window.location.href = "/";
  alert("Session expired. Please log in again.");
  localStorage.removeItem("user");
}


api.interceptors.response.use(
  (res) => res,
  (err) => {
    
    if (err.response?.status === 401) {
      dispatchLogout();
    }
    return Promise.reject(err);
  }
);

export default api;