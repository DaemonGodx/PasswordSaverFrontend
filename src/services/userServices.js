
import api from "./index.js";

export const loginUser = (data) => {
  return api.post("/user/login", data);
};

export const signupUser = (data) => {
  return api.post("/user/signup", data);
};
export const getCurrentUser = () => {
    return api.get("/user/me");
};
export const vpp=(data)=>{
    return api.post("/user/vpp",data);
}

