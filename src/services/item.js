import axios from "axios";

export const getAllProducts = () => {
    return axios.get(`https://localhost:7114/api/Product/GetAllProducts`);   
}
export const addItemToSql = (item) => {
    return axios.post(`https://localhost:7114/api/Product/AddProduct`, item);   
}