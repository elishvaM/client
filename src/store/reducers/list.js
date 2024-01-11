import * as types from "../actionTypes";

const initialState = {
  allTripList: [],
  currentAttractionListId:0
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_TRIP_LIST:
      return {
        ...state,
        allTripList: action.payload,
      };
    case types.SAVE_ATTRACTION_LIST_ID:
      return {
        ...state,
        currentAttractionListId: action.payload,
      };

    default: {
      return state;
    }
  }
};
export default listReducer;
