import * as types from "../actionTypes";

export const saveUser = (user) => {
  return {
    type: types.LOG_IN,
    payload: user,
  };
};
//יציאת משתמש
export const logOut = () => {
  return {
    type: types.LOG_OUT,
  };
};
// export const privateRegion = ()=>{

//     return {
//         type:types.PRIVATE_REGION,
//     }

// }
//כניסת/יציאת המשתמש ל/מ איזור האישי

export const changeUserLocation = (value) => {
  return {
    type: types.CHANGE_USER_LOCATION,
    payload: value,
  };
};
