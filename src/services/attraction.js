import { Details } from "@mui/icons-material";
import axios from "axios";
export const attractionFromServer = () => {
    return axios.get(`https://localhost:7114/api/Attraction/GetAll`);
}
export const savedAttractionByUserIdFromServer = (userId) => {
    return axios.get(`https://localhost:7114/api/SavedAttraction/GetSavedAttractionByUserId/${userId}`);
}
export const AddLovedAttractionFromServer = (lovedAttraction) => {
    return axios.post(`https://localhost:7114/api/SavedAttraction/AddLovedAttraction`,lovedAttraction);   
}
export const upDateAttractionFromServer = (attraction) => {
    return axios.post(`https://localhost:7114/api/Attraction/Update`,attraction);   
}
export const addAttractionFromServer = (attraction) => {
console.log( "aaaaa",attraction)
    return axios.post(`https://localhost:7114/api/Attraction/Add`,attraction);   
}

