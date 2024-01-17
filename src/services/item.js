import axios from "axios";

export const getAllProducts = () => {
    return axios.get(`https://localhost:7114/api/Product/GetAllProducts`);   
}
export const addItemToSql = (item) => {
    return axios.post(`https://localhost:7114/api/Product/AddProduct`, item);   
}
export const getAllProductTypes = () => {
    return axios.get(`https://localhost:7114/api/ProductType/GetAll`);   
}
export const GetAttractionListProductByAttractionListId = (attractionListId) => {
    return axios.get(`https://localhost:7114/api/AttractionListProduct/GetByAttractionListId/${attractionListId}
    `);   
}
export const AddAttractionListProductFromServer = (attractionListProduct) => {
    return axios.post(`https://localhost:7114/api/AttractionListProduct/Add`, attractionListProduct);  
    
}
export const DeleteAttractionListProductFromServer = (productId, attractionListId) => {
    return axios.post(`https://localhost:7114/api/AttractionListProduct/Delete/${productId}/${attractionListId}`);  
    
}
export const GetAllStorageTypesFromServer = () => {
    return axios.get(`https://localhost:7114/api/StorageType/GetAll`);  
    
}
export const AddListAttractionListProductFromServer = (attractionListProduct) => {
    console.log("attractionListProduct")
    console.log(attractionListProduct)
    return axios.post(`https://localhost:7114/api/AttractionListProduct/AddList`, attractionListProduct);  
    
}

