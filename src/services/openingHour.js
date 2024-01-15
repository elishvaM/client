
import axios from "axios";

export const openingHourFromServer = (attractionId) => {
    return axios.post(`https://localhost:7114/api/OpeningHour/Get/${attractionId}`);
}