import axios from "axios";

export const loginFromServer = (user) => {
    console.log("user ps:", user)
    return axios.post(`https://localhost:7114/api/User/LogIn`, user);
}
export const sighinFromServer = (user) => {
    return axios.post();
}
export const usersFromServer = () => {
    return axios.get(`https://localhost:7114/api/User/GetAllUsers`);
}

export const changeStatusFromServer = (user) => {
    return axios.put(`https://localhost:7114/api/User/UpDateStatusById`, user)
}