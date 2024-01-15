import * as types from "../actionTypes";

const initialState = {
    attractions: [],
    selectedAttraction: null,
    filtering: []
}

const lovedAtrraction = (atractins, isuSer, loved) => {

    if (!isuSer) {
        return atractins.map(x => ({ ...x, isLoved: false }))
    }
    return atractins.map(x => ({ ...x, isLoved: loved.map(y => y.attractionId).includes(x.id) }))
}

const attractionReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_ATTRACTIONS:
            const att = action.payload.map(x => ({ ...x, isLoved: false }))
            return {
                ...state,
                attractions: att,
                filtering: att
            }
        case types.SAVE_LOVED_ATTRACTIONS: {
            const atractions = lovedAtrraction(state.attractions, action.payload.isuSer, action.payload.loved)
            return {
                ...state,
                attractions: atractions,
            }
        }
        case types.ADD_ATTRACTION:
            return {
                ...state,
                attractions: [...state.attractions, action.payload]
            }
        case types.SELECT_ATTRACTION:
            return {
                ...state,
                selectedAttraction: action.payload
            }
        // break;
        case types.ADD_LOVED_ATTRACION:
            const copy = [...state.attractions];//??? הסבר מתי ולמה עושים 3 נקודות מה היה קורה אם לא עשיתי 3 נק ואם הייתי עושה כך בריטרן מאחורי הקלעים
            //השורה הזו זרקה שגיאה
            // copy.findIndex(x => action.payload.id == x.id).isLoved = action.payload.isLoved;
            //אז עשיתי את זה במקום
            const index = copy.findIndex(x => action.payload.id == x.id);
            copy[index].isLoved = action.payload.isLoved;
            return {
                ...state,
                //הוספת האטרקציה לצערך אהבתי
                attractions: copy
            }
        case types.REMOVE_LOVED_ATTRACION:
            //הוצאת האטרקציה מהאטרקציות האהובות
            //מציאת האטרקציה שצריך להסיר כדי להפוך את השדה לפולס
            let copy2 = [...state.attractions];
            copy2.map(i => i.id === action.payload ? i.isLoved = false : null)
            return {
                ...state,
                //כיון שעודכנה אטרקציה ממערך זה
                attractions: copy2
            }
        case types.UPDATE_FILTERING:
            return {
                ...state,
                filtering: action.payload
            }

        default: { return state }
    }
    //??? האם נכון
    // return state;
}
export default attractionReducer;