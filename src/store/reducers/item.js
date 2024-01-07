import * as types from "../actionTypes";

const initialState = {
    selectItem: [],
    allitems: [],
    productTypes: [],
    storageTypes: [],
    itemsSelected: []
}

const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_ITEM_TO_MY_LIST:
            action.payload.isSelected = true;
            //??? איך הו עובד ושומר לי את אייזסלקטד כ-טרו למרות ששינתי פה רק בפריטים שנבחרו ולא בכל הפריטים   
            return {
                ...state,
                itemsSelected: [...state.itemsSelected, action.payload]
            }
        case types.REMOVE_ITEM_FROM_MY_LIST:
            let item = state.itemsSelected.find(item => item.Id !== action.payload);
            item.isSelected = false;
            //מחיקת הפריט מהרשימה
            let arr = state.itemsSelected.filter(item => item.Id !== action.payload);
            //שינוי תכונת פריט זה ל-לא נבחר
            // for(let i=0; i < state.allitems.length; i++)
            //     if(state.allitems[i].Id == action.payload)
            //        state.allitems[i].isSelected = false;
            return {
                ...state,
                itemsSelected: arr,
            }
        case types.UPDATE_ITEMS_SELECTED:
            let arr2 = [...action.payload] //???העתקתי כי אני עוד משתמשת במערך copyשלא יהיה בעיות ..
            return {
                ...state,
                itemsSelected: arr2
            }
        case types.SAVE_ITEMS:
            let i = 0, j = 0;
            let arr3 = action.payload;
            for (; i < arr3.length; i++) {
                for (; j < state.itemsSelected.length; j++) {
                    if (arr3[i].Id === state.itemsSelected[j].Id) {
                        arr3[i].isSelected = true;
                        break;
                    }
                }
                if (j === state.itemsSelected.length)
                    arr3[i].isSelected = false;
            }
            console.log("arr3", arr3)
            return {
                ...state,
                allitems: arr3
            }
        case types.ADD_ITEM:
            let arr4 = [...state.allitems, action.payload]//??? need its id from the data base

            return {
                ...state,
                allitems: arr4
            }
        case types.REMOVE_ITEM:
            // let arr5 =
            return {
                ...state,
                allitems: arr2
            }
        case types.SAVE_DATES:
            console.log("v")
            console.log(action.payload[0])
            console.log(action.payload[1])
            console.log(new Date(action.payload[0]))
            console.log(new Date(action.payload[1]))
            return {
                ...state,
                date: [new Date(action.payload[0]), new Date(action.payload[1])]
            }
        default: { return state }
    }
}
export default itemReducer;