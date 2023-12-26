import * as types from "../actionTypes";

const initialState = {
    allTripList: []
}

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_TRIP_LIST:
            return {
                ...state,
                allTripList: action.payload
            }

        default: { return state }
    }
}
export default listReducer;