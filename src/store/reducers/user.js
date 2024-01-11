import * as types from "../actionTypes";

const initialState = {
    currentUser: null, 
    isInPersonalArea: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
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
        case types.CHANGE_USER_LOCATION:
            return {
                ...state,
                isInPersonalArea: action.payload
            }
        default: { return state }
    }
    //??? האם נכון
    //return state;
}
export default userReducer;