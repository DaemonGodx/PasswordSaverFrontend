import api from "./index.js";

export const allSavedPasswords = () => {
    return api.get("/save")
};
export const getDecrypted=(id)=>{
    return api.get(`/save/${id}`);
}
export const deletePassword=(id)=>{
    return api.delete(`/save/${id}`);
}
export const addPassword=(data)=>{
    return api.post("/save",data);
}
export const updatePassword=(id,data)=>{
    return api.put(`/save/${id}`,data);
}