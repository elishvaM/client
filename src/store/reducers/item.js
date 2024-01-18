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
        case types.UPDATE_ITEM:
            delete action.payload.idRow; delete action.payload.edit; delete action.payload.isNew;
            action.payload.storageType = state.storageTypes.find(i=> i.type == action.payload.storageType).type;
            action.payload.productType = state.productTypes.find(i=> i.type == action.payload.productType).type;
            const updated =  state.allitems.map(i=>i.id == action.payload.id?
                {...action.payload,userId:i.userId,status:i.status}:{...i});
                console.log("reduxxxxxxxxxxxxx");
                console.log(updated)
            return {
                ...state,
                allitems: updated
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
            return {
                ...state,
                allitems: [...state.allitems, action.payload]
            }
        case types.REMOVE_ITEM:
            const x = state.allitems.filter(i => i.id != action.payload)
            return {
                ...state,
                allitems: x
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
            case types.DELETE_MANY_ITEMS:
        
                return {
                    ...state,
                    itemsSelected: [...state.itemsSelected, ...action.payload] 
                }
        default: { return state }
    }
}
export default itemReducer;