import axios from "axios";
export const attractionFromServer = () => {
    return axios.get(`https://localhost:7114/api/Attraction/GetAll`);
}
export const savedAttractionByUserIdFromServer = (userId) => {
    console.log('userId', userId)
    return axios.get(`https://localhost:7114/api/SavedAttraction/GetSavedAttractionByUserId/${userId}`);
}
export const AddLovedAttractionFromServer = (lovedAttraction) => {
    return axios.post(`https://localhost:7114/api/SavedAttraction/AddLovedAttraction
    `,lovedAttraction);   
}
export const RemoveLovedAttractionFromServer = (lovedAttraction) => {
    return axios.put(`https://localhost:7114/api/SavedAttraction/RemoveLovedAttraction`,lovedAttraction );
}
