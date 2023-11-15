import * as types from "../actionTypes";

const initialState = {
    attractions: [],
    selectedAttraction: null,
    lovedAttractions:[
        // {id:1, img:"115797440.jpg", name:"טיול ג'יפים" , Adress:""},
    // {id:2, img:"152255613.jpg", name:"מוזיאון", Adress:""},
    // {id:3, img:"192190375.jpg", name:"ההיטוריה שלכם", Adress:""},
    // {id:4, img:"203267750.jpg", name:"שיט", Adress:""},
    ]
}
const attractionReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SAVE_ATTRACTIONS:
            // let j = 0;
            // for(let i=0; i<action.payload.length; i++){
            //     for(j = 0; j<state.lovedattractions.length; j++){
            //         if(action.payload[i].id == state.lovedattractions[j].attractionId){         
            //            action.payload[i].isLoved = true; break;
            //         }
            //     }
            //     if(j == state.lovedattractions.length)
            //        action.payload[i].isLoved = false;
            // }
            let lovedAttractions = [], i = 0, j = 0;
            for(; i < action.payload[0].length; i++){
                for(j = 0; j < action.payload[1].length; j++){
                    if(action.payload[0][i].id == action.payload[1][j].attractionId){
                        action.payload[0][i].isLoved = true;
                        lovedAttractions = [...lovedAttractions, action.payload[0][i]];
                        //:מאחורי הקלעים יוצר מערך חדש ארר??? וגם לוודא שלא צריך את האוביקטים המקוריים של השליפה
                        //{id: attractionId: userId:}
                        //??? איך יודעים מה הבעיה בקונסול ולא מופיש שורה או עמוד
                        //??? איפה נכון להביא את האטר האהובות בשלמותם עם כל הפרטים : פה כמו שעשיתי או באסקיואל
                        break;
                    }
                }
                if(j == action.payload[1].length){
                    action.payload[0][i].isLoved = false;
                }
            }
            console.log("attttttttt")
            console.log(action.payload[0])
            console.log(lovedAttractions)
            return {
                ...state,
                attractions: action.payload[0],
                lovedAttractions: lovedAttractions
            }
        // case types.SAVE_LOVED_ATTRACTIONS:
        //     let x = 0, y = 0, arr2 = [];
        //     for(; x < action.payload.length; x++){
        //         for(y = 0; y < state.attractions.length; y++){
        //             if(action.payload[x].attractionId == state.attractions[y]){
        //                arr2 = [...arr2, state.attractions[y]];

        //                break;
        //             }
        //         }
        //     }
        //     return {
        //             ...state,
        //             lovedAttractions: arr,
        //     }         
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
        case types.ADD_LOVED_ATTRACION:
            let copy = [...state.attractions];//??? הסבר מתי ולמה עושים 3 נקודות מה היה קורה אם לא עשיתי 3 נק ואם הייתי עושה כך בריטרן מאחורי הקלעים
            copy.map(i => i.id == action.payload.id? i.isLoved = true: null)//מיפוי משנה ???
            return {
                    ...state,
                    lovedAttractions: [...state.lovedAttractions, action.payload],
                    attractions: copy      
            }
        case types.REMOVE_LOVED_ATTRACION:
            console.log("remove ")
            console.log(state.attractions)
            //הוצאת האטרקציה מהאטרקציות האהובות
            let lovedAttractions2 = state.lovedAttractions.filter(item => item.id != action.payload);
            //מציאת האטרקציה שצריך להסיר כדי להפוך את השדה לפולס
            let copy2 = [...state.attractions];
            copy2.map(i => i.id == action.payload? i.isLoved = false: null)
            return {
                    ...state,
                    lovedAttractions: lovedAttractions2, 
                    attractions: copy2     
            }
        default: { return state }
    }
    //??? האם נכון
    // return state;
}
export default attractionReducer;