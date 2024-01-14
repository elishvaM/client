import * as types from "../actionTypes";

export const addItemToMyList = (item)=>{
    return {      
        type:types.ADD_ITEM_TO_MY_LIST,
        payload: item
    }
    
}
export const removeItemFromMyList = (id)=>{
    
    return {
        type:types.REMOVE_ITEM_FROM_MY_LIST,
        payload: id
    }
    
}
export const updateItemsSelected = (arr)=>{
    return {
        type:types.UPDATE_ITEMS_SELECTED,
        payload: arr
    }
    
}
export const saveItems = (arr)=>{
    return {
        type:types.SAVE_ITEMS,
        payload: arr
    }
    
}
export const addItem = (item)=>{
    return {
        type:types.ADD_ITEM,
        payload: item
    }
    
}
export const removeItem = (id)=>{
    
    return {
        type:types.REMOVE_ITEM,
        payload: id
    }
    
}
export const saveProductTypes = (productTypes)=>{
    return {
        type:types.SAVE_PRODUCT_TYPES,
        payload: productTypes
    }
    
}
export const saveItemsSelected = (arr)=>{
    return {
        type:types.SAVE_ITEMS_SELECTED,
        payload: arr
    }
    
}
export const saveStorageTypes = (storageTypes)=>{
    return {
        type:types.SAVE_STORAGE_TYPES,
        payload: storageTypes
    }
    
}
export const addManyItems = (arr)=>{
    return {
        type:types.ADD_MANY_ITEMS,
        payload: arr
    }
    
}