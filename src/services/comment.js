import axios from "axios";

export const getAllCommentsFromServer = (attractionId) => {
    return axios.post(`https://localhost:7114/api/Comment/GetAll/${attractionId}`);   
}
export const addCommentFromServer = (comment) => {
    return axios.post(`https://localhost:7114/api/Comment/Add`,comment);   
}