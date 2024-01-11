import * as types from "../actionTypes";

export const saveTripList = (allTripList)=>{
    
    return {
        type:types.SAVE_TRIP_LIST,
        payload: allTripList
    }
    
}
export const saveCurrentAttractionListId = (id)=>{
    
    return {
        type:types.SAVE_ATTRACTION_LIST_ID,
        payload: id
    }
    
}