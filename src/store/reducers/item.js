import * as types from "../actionTypes";

const initialState={
    itemsSelected:[
    //   {Id:1, Name:"כובע שמש"  , IsDuplicated:0 , ProductTypeId:1 , StorageTypeId:1 , IsNeedAssurants:0 , Img:"Cloth027.JPG" , IsImgConfirm:1 , IsConfirm:1 ,Amount:2, Status:null},
    //   {Id:2, Name:"משקפי שמש" , IsDuplicated:0 , ProductTypeId:1 , StorageTypeId:1 , IsNeedAssurants:0 , Img:"Household 778.jpg" , IsImgConfirm:1 , IsConfirm:1 ,Amount:2, Status:null},
    //   {Id:3, Name:"קרם הגנה"  , IsDuplicated:0 , ProductTypeId:1 , StorageTypeId:1 , IsNeedAssurants:0 , Img:"Perfume Bottle.jpg" , IsImgConfirm:1 , IsConfirm:1 ,Amount:2, Status:null},
    //   {Id:4, Name:"מסרק"      , IsDuplicated:0 , ProductTypeId:1 , StorageTypeId:1 , IsNeedAssurants:0 , Img:"Hair Brush.jpg" , IsImgConfirm:1 , IsConfirm:1 ,Amount:2, Status:null},
    //   {Id:5, Name:"מצלמה"     , IsDuplicated:0 , ProductTypeId:1 , StorageTypeId:1 , IsNeedAssurants:0 , Img:"Household 487.jpg" , IsImgConfirm:1 , IsConfirm:1 ,Amount:2, Status:null}
      {Id:1, Name:"כובע שמש"  , IsDuplicated:0 , ProductTypeId:2 , StorageTypeId:1 , IsNeedAssurants:0 , Img:"/imgs/items/כובע שמש.jpg" , IsImgConfirm:1 , IsConfirm:1 ,Amount:2, Status:null},
      {Id:2, Name:"משקפי שמש" , IsDuplicated:0 , ProductTypeId:1 , StorageTypeId:1 , IsNeedAssurants:0 , Img:"/imgs/items/משקפי שמש.jpg" , IsImgConfirm:1 , IsConfirm:1 ,Amount:2, Status:null},
      {Id:3, Name:"קרם הגנה"  , IsDuplicated:0 , ProductTypeId:2 , StorageTypeId:1 , IsNeedAssurants:0 , Img:"/imgs/items/קרם הגנה.jpg" , IsImgConfirm:1 , IsConfirm:1 ,Amount:2, Status:null},
      {Id:4, Name:"מברשת"     , IsDuplicated:0 , ProductTypeId:2 , StorageTypeId:1 , IsNeedAssurants:0 , Img:"/imgs/items/מברשת.jpg" , IsImgConfirm:1 , IsConfirm:1 ,Amount:2, Status:null},
      {Id:5, Name:"מצלמה"     , IsDuplicated:0 , ProductTypeId:3 , StorageTypeId:1 , IsNeedAssurants:0 , Img:"/imgs/items/camera.jpg" , IsImgConfirm:1 , IsConfirm:1 ,Amount:2, Status:null}
], 


    allitems:[

      ],  
    productTypes:[{Id:1, Type:"ביגוד"},
        {Id:2, Type:"מזון"},{Id:3, Type:"אסטטיקה"},{Id:4, Type:"רפואי"} 
    ],
    // {Id:1, Type:"אביזר"},
    storageTypes:[
        {Id:1, Type:"קפאון"},{Id:2, Type:"קרור"},  
        {Id:3, Type:"צל"},{Id:4, Type:"חימום"}
    ],   
     date:[new Date("2023-10-02"), new Date("2023-10-04")]//need to be arr of big trips with id...   
         
}

const itemReducer= (state = initialState, action)=>{
    switch(action.type)
    {
        case types.ADD_ITEM_TO_MY_LIST:
        action.payload.isSelected = true;
         //??? איך הו עובד ושומר לי את אייזסלקטד כ-טרו למרות ששינתי פה רק בפריטים שנבחרו ולא בכל הפריטים   
        return {
            ...state,
            itemsSelected: [...state.itemsSelected, action.payload]
        }
        case types.REMOVE_ITEM_FROM_MY_LIST:
            let item = state.itemsSelected.find(item => item.Id != action.payload);
            item.isSelected = false;
            //מחיקת הפריט מהרשימה
            let arr = state.itemsSelected.filter(item => item.Id != action.payload);
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
            let i=0, j=0;
            let arr3 = action.payload;
            for(; i<arr3.length; i++){
                for(; j<state.itemsSelected.length; j++){
                    if(arr3[i].Id == state.itemsSelected[j].Id){
                        arr3[i].isSelected = true;
                        break;
                    }
                }
                if(j == state.itemsSelected.length)
                    arr3[i].isSelected = false;
            }
              console.log("arr3",arr3)
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
             date:[new Date(action.payload[0]) , new Date(action.payload[1])]
         }
    }
    return state;
}
export default itemReducer;