import * as types from "../actionTypes";

const initialState={
    currentUser: {Id:1, Name:"רננה", UserTypeId:2, Password:1234, Email:"renana@gmail.com"},
    users:[ {Id:1, Name:"יוסי", NumList:5, NumLikes:90},
    {Id:1, Name:"אביגיל", NumList:2, NumLikes:12},
    {Id:1, Name:"לימור", NumList:7, NumLikes:50}]
}

const userReducer= (state = initialState, action)=>{
    switch(action.type)
    {
        case types.LOG_IN:
        return {
            ...state,
            currentUser: action.payload
        }
        case types.LOG_OUT:
        return {
            ...state,
            currentUser: null
        }
    }
    return state;
}
export default userReducer;