import * as types from "../actionTypes";

const initialState = {
    attractions: [],
    selectedAttraction: null
}
const attractionReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_ATTRACTIONS:
            return {
                ...state,
                attractions: action.payload,
            }
        case types.ADD_ATTRACTION:
            return {
                ...state,
                attractions: [...state.attractions, action.payload]
            }
        case types.SELECT_ATTRACTION:
            return {
                ...state,
                selectedAttraction:action.payload
            }
            // break;
        default: { return state }
    }
    //??? האם נכון
    // return state;
}
export default attractionReducer;