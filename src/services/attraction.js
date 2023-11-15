import axios from "axios";
export const attractionFromServer = () => {
    return axios.get(`https://localhost:7114/api/Attraction/GetAll`);
}
export const savedAttractionByUserIdFromServer = (userId) => {
    return axios.get(`https://localhost:7114/api/SavedAttraction/GetSavedAttractionByUserId?
    `+userId);
}
