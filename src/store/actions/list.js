import * as types from "../actionTypes";

export const saveTripList = (allTripList)=>{
    
    return {
        type:types.SAVE_TRIP_LIST,
        payload: allTripList
    }
    
}