import axios from "axios";

export const loginFromServer = (user) => {
    console.log("user ps:", user)
    // user={
    //     // "id": 0,
    //     // "name": "string",
    //     // "phone": "string",
    //     "password": "7777",
    //     "email": "777",
    //     // "dateBorn": "2023-10-18T16:43:10.098Z",
    //     // "userTypeId": 0,
    //     // "status": true
    //   }
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