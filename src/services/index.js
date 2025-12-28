import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice.js";
import store from "../store/store.js";



import axios from 'axios';
const api=axios.create({
    baseURL:import.meta.env.VITE_BASE_URL+'/api', 
    withCredentials: true,
});
function dispatchLogout(err) {
  store.dispatch(logout()); 
  window.location.href = "/";
  alert("Session expired. Please log in again.");
  localStorage.removeItem("user");
  console.error("Auto-logout due to:", err);
}


api.interceptors.response.use(
  (res) => res,
  (err) => {
    
    if (err.response?.status === 401) {
      dispatchLogout(err);
    }
    return Promise.reject(err);
  }
);

export default api;