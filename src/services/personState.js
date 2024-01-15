import axios from "axios";
export const personStateFromServer = () => {
    return axios.get(`https://localhost:7114/api/PersonState/GetAll`);
}