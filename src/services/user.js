import { useSelector } from "react-redux";
import { useState } from 'react';
import axios from "axios";
//login
// export const saveUser= (user)=>{}

export const loginFromServer = (user) => {
    console.log("user ps:" + user.Password)
    return axios.post(`https://localhost:7114/api/User/LogIn/7777/hadas@gmail.com`);
}

export const usersFromServer = () => {
    return axios.get(`https://localhost:7114/api/User/GetAllUsers`);
}

