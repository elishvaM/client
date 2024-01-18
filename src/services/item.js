import axios from "axios";

export const getAllProducts = () => {
    return axios.get(`https://localhost:7114/api/Product/GetAllProducts`);   
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
    return axios.post(`https://localhost:7114/api/AttractionListProduct/AddList`, attractionListProduct);    
}
export const getAllProductsByTripListId = (tripListId) => {
    return axios.get(`https://localhost:7114/api/AttractionListProduct/GetAllByTripListId/${tripListId}`);
}
export const updateProductFromServer = (item) => {
    return axios.post(`https://localhost:7114/api/Product/Update`,item);
}
export const DeleteProductFromServer = (id) => {
    return axios.post(`https://localhost:7114/api/Product/Delete/${id}`);
}
export const AddProductFromServer = (item) => {
    return axios.post(`https://localhost:7114/api/Product/Add`,item);
}