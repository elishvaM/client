import axios from "axios";
export const AddTripListFromServer = (bigList) => {
    console.log("b list:", bigList)
    return axios.post(`https://localhost:7114/api/TripList/Add`, bigList);
}
export const GetAllTripListsByUserIdFromServer = (userId) => {
    console.log("u", userId)
    return axios.get(`https://localhost:7114/api/TripList/GetAll/${userId}`);
}