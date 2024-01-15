import axios from "axios";
export const attractionTypeFromServer = () => {
    return axios.get(`https://localhost:7114/api/AttractionType/GetAll`);
}