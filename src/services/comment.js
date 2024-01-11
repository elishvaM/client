import axios from "axios";

export const getAllCommentsFromServer = (attractionId) => {
    return axios.post(`https://localhost:7114/api/Comment/GetAll/${attractionId}`);
}
export const addCommentFromServer = (comment) => {
    return axios.post(`https://localhost:7114/api/Comment/Add`, comment);
}
export const upDateCountFromServer = (id,userId) => {
    return axios.post(`https://localhost:7114/api/Comment/UpDateCount/${id}/${userId}`);
}
export const getComplainedFromServer = () => {
    return axios.post(`https://localhost:7114/api/Comment/GetComplained`);
}
export const deleteFromServer = (comment) => {
    return axios.post(`https://localhost:7114/api/Comment/Delete/${comment.id}`);
}

export const validFromServer = (comment) => {
    return axios.post(`https://localhost:7114/api/Comment/ValidComment/${comment.id}`);
}