import axios from "axios";

export const loginFromServer = (user) => {
    return axios.post(`https://localhost:7114/api/User/LogIn`, user);
}
export const sighinFromServer = (user) => {
    console.log("u",user)
    return axios.post(`https://localhost:7114/api/User/SignIn`, user);
}
export const usersFromServer = () => {
    return axios.get(`https://localhost:7114/api/User/GetAllUsers`);
}
export const changeStatusFromServer = (user) => {
    return axios.put(`https://localhost:7114/api/User/UpDateStatusById`, user)
}
export const changeTypeFromServer = (user) => {
    return axios.post(`https://localhost:7114/api/User/UpDateType`, user)
}