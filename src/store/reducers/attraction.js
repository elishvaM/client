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
            let lovedAttractions = [], i = 0, j = 0;
            //כיון ששלחנו מאקשיין 2 דברים 
            //אחד מערך רגיל והשני מערך אהוב
            //אז ניתן לגשת לפיילוד במקום ה 0 או 1
            if(action.payload[2] != null){
            for(; i < action.payload[0].length; i++){               
                for(j = 0; j < action.payload[1].length; j++){
                    //כאן בדקנו האם אטרקציה נמצאת גם במערך האטרקציות האהובות
                    if(action.payload[0][i].id == action.payload[1][j].attractionId){
                        //הוספנו שדה כדי שנוכל לדעת אם היא אהובה 
                        action.payload[0][i].isLoved = true;
                        //הוספת האטרקציה למערך האטרקציה
                        lovedAttractions = [...lovedAttractions, action.payload[0][i]];
                        //:מאחורי הקלעים יוצר מערך חדש ארר??? וגם לוודא שלא צריך את האוביקטים המקוריים של השליפה
                        //{id: attractionId: userId:}
                        //??? איך יודעים מה הבעיה בקונסול ולא מופיש שורה או עמוד
                        //??? איפה נכון להביא את האטר האהובות בשלמותם עם כל הפרטים : פה כמו שעשיתי או באסקיואל
                        break;
                    }
                }
                //אם הגענו לסוף מערך אטרקציות אהובות זה אומר שהאטרקציה לא אהובה 
                //ולכן נהיה חייבים לקבוע ערך שלילי לשדה אי לובד
                if(j == action.payload[1].length){
                    action.payload[0][i].isLoved = false;
                }
            }
        }
        else{
            action.payload[0].map(i => i.isLoved = false);
            
        }
            return {
                ...state,
                attractions: action.payload[0],
                lovedAttractions: lovedAttractions
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
        case types.ADD_LOVED_ATTRACION:
            let copy = [...state.attractions];//??? הסבר מתי ולמה עושים 3 נקודות מה היה קורה אם לא עשיתי 3 נק ואם הייתי עושה כך בריטרן מאחורי הקלעים
            copy.map(i => i.id == action.payload.id? i.isLoved = true: null)//מיפוי משנה ???
            return {
                    ...state,
                    //הוספת האטרקציה לצערך אהבתי
                    lovedAttractions: [...state.lovedAttractions, action.payload],
                    attractions: copy      
            }
        case types.REMOVE_LOVED_ATTRACION:
            //הוצאת האטרקציה מהאטרקציות האהובות
            let lovedAttractions2 = state.lovedAttractions.filter(item => item.id != action.payload);
            //מציאת האטרקציה שצריך להסיר כדי להפוך את השדה לפולס
            let copy2 = [...state.attractions];
            copy2.map(i => i.id == action.payload? i.isLoved = false: null)
            return {
                    ...state,
                    //כיוון שהוסרה אטרקציה ממערך זה 
                    lovedAttractions: lovedAttractions2, 
                    //כיון שעודכנה אטרקציה ממערך זה
                    attractions: copy2     
            }
        default: { return state }
    }
    //??? האם נכון
    // return state;
}
export default attractionReducer;