import { useSelector } from "react-redux";
import { AddListAttractionListProductFromServer } from "../../services/item";
import * as types from "../actionTypes";

const initialState = {
    selectItem: [],
    allitems: [],
    itemsSelected: [],
    productTypes:[],
    storageTypes:[]
}
const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_ITEM_TO_MY_LIST:
            const allitems = state.allitems.map(i=> i.id == action.payload.productId? {...i, isSelected:true}:{...i});
            return {
                ...state,
                itemsSelected: [...state.itemsSelected, action.payload],
                allitems:allitems
            }
        case types.REMOVE_ITEM_FROM_MY_LIST:
            const allitems2 = state.allitems.map(i=> i.id == action.payload? {...i, isSelected:false}:{...i});
            const itemsSelected = state.itemsSelected.filter(i => i.productId != action.payload);
            return {
                ...state,
                itemsSelected: itemsSelected,
                allitems:allitems2
            }
        case types.UPDATE_ITEMS_SELECTED:
            let arr2 = [...action.payload] //???העתקתי כי אני עוד משתמשת במערך copyשלא יהיה בעיות ..
            return {
                ...state,
                itemsSelected: arr2
            }
        case types.SAVE_ITEMS:
            const items = action.payload.map(item=> ({...item, isSelected: 
                state.itemsSelected.map(itemSelected=> itemSelected.productId).includes(item.id)}))
            console.log("arr3", items)
            return {
                ...state,
                allitems: items
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
        case types.SAVE_PRODUCT_TYPES:
            return {
                ...state,
                productTypes: action.payload
            }
        case types.SAVE_ITEMS_SELECTED:
            return {
                ...state,
                itemsSelected: action.payload
            }
        case types.SAVE_STORAGE_TYPES:
            return {
                ...state,
                storageTypes: action.payload
            }
        case types.ADD_MANY_ITEMS:
            return {
                ...state,
                itemsSelected: [...state.itemsSelected, ...action.payload] 
            }
        //}
        default: { return state }
    }
}
export default itemReducer;