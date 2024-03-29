import axios from "axios";
export const AddTripListFromServer = (bigList) => {
    console.log("b list:", bigList)
    return axios.post(`https://localhost:7114/api/TripList/Add`, bigList);
}
export const GetAllTripListsByUserIdFromServer = (userId) => {
    return axios.get(`https://localhost:7114/api/TripList/GetAll/${userId}`);
}
export const GetAttractionListByAttractionIdFromServer = (attractionId, myAttractionListId) => {
    return axios.get(`https://localhost:7114/api/AttractionList/GetSAttractionListByAttractionId/${attractionId}/${myAttractionListId}`);
}
export const AddAttractionListFromServer = (AttractionList) => {
    return axios.post(`https://localhost:7114/api/AttractionList/Add`,AttractionList);
}
