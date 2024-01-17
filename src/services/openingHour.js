
import axios from "axios";

export const openingHourFromServer = (attractionId) => {
    return axios.post(`https://localhost:7114/api/OpeningHour/Get/${attractionId}`);
}

export const updateOpeningHourFromServer = (openHour) => {
    return axios.post(`https://localhost:7114/api/OpeningHour/Update`,openHour);
}

export const deleteOpeningHourFromServer = (openHour) => {
    return axios.post(`https://localhost:7114/api/OpeningHour/Delete`,openHour);
}