import * as types from "../actionTypes";

const initialState = {
    currentUser: null
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
        default: { return state }
    }
    //??? האם נכון
    //return state;
}
export default userReducer;