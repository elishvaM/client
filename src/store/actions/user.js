import * as types from "../actionTypes";

export const saveUser = (user)=>{
    
    return {
        type:types.LOG_IN,
        payload: user
    }
    
}
//יציאת משתמש
export const logOut = ()=>{
    
    return {
        type:types.LOG_OUT,
    }
    
}