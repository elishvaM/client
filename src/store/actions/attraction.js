import * as types from "../actionTypes";

export const saveAttractions = (attractions, lovedAttractions, user)=>{
    return {
        type: types.SAVE_ATTRACTIONS,
        payload: [attractions, lovedAttractions, user]//??? באיזה שיטה להשתמש
    }
}
export const saveLovedAttractions = (lovedAttractions)=>{
    return {
        type: types.SAVE_LOVED_ATTRACTIONS,
        payload: lovedAttractions
    }
}
export const addAttraction = (attraction) => {
    return {
        type: types.ADD_ATTRACTION,
        payload: attraction
    }
}
export const deleteAttraction = (id)=>{
    return {
        type: types.DELETE_ATTRACTION,
        payload: id
    }
}    
//???
//מה עם מצב שרוצים לשנות מספר שדות 
//או שלשנות תמיד את כל השדות
export const updateAttraction = (id, fieldName, newValue)=>{//???איזה אטרקציה לשנות, איזה שדה ומה הערך החדש 
    return {
        type: types.UPDATE_ATTRACTION,
        payload:{ id:id, fieldName:fieldName, newValue:newValue }
    }
}

//סינון
export const selectAttraction = (id)=>{
    return {
        type: types.SELECT_ATTRACTION,
        payload: id
    }
} 
export const updateFiltering = (arr)=>{
    return {
        type: types.UPDATE_FILTERING,
        payload: arr
    }
} 
export const changeSwitch = ()=>{
    return {
        type: types.CHANGE_SWITCH,
    }
}
export const addLovedAttraction = (x)=>{
    return {
        type: types.ADD_LOVED_ATTRACION,
        payload: x
    }
}
export const removeLovedAttraction = (id)=>{
    return {
        type: types.REMOVE_LOVED_ATTRACION,
        payload: id
    }
}
