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
//כניסת/יציאת המשתמש ל/מ איזור האישי
export const privateRegion = ()=>{
    
    return {
        type:types.PRIVATE_REGION,
    }
    
}