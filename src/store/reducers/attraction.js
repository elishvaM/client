import * as types from "../actionTypes";

const initialState={
    attractions: [
        {Id:1, Name:"במדבר", Desc:"enjoy", Img:"/imgs/ac_b3_d30.jpg",OpeningHours:1, WebsiteAddress:"http",CountryId:1,IsConfirm:1,TypeId:1,Address:"sanedrin 52",Price:300,PersonId:1},
        {Id:2, Name:"נחל", Desc:"arounding", Img:"/imgs/ac-back_country_m27.jpg",OpeningHours:1, WebsiteAddress:"http",CountryId:1,IsConfirm:1,TypeId:1,Address:"shalom 17",Price:0,PersonId:2},
        {Id:3, Name:"בריכה", Desc:"shpritz", Img:"/imgs/ak_WFALL2.jpg",OpeningHours:1, WebsiteAddress:"http",CountryId:3,IsConfirm:3,TypeId:2,Address:"chafez 5",Price:40,PersonId:3},
        {Id:4, Name:"גן חיות", Desc:"sunny", Img:"/imgs/aw1.jpg",OpeningHours:1, WebsiteAddress:"http",CountryId:3,IsConfirm:2,TypeId:2,Address:"sol 12",Price:70,PersonId:1},
        {Id:5, Name:"מפלים", Desc:"challenge", Img:"/imgs/ac_m139.jpg",OpeningHours:1, WebsiteAddress:"http",CountryId:2,IsConfirm:1,TypeId:3,Address:"chalil 40",Price:0,PersonId:2},
        {Id:6, Name:"הגינה הסודית", Desc:"enjoy", Img:"/imgs/Garden 075.jpg",OpeningHours:1, WebsiteAddress:"http",CountryId:2,IsConfirm:1,TypeId:3,Address:"even 34",Price:100,PersonId:2},
        {Id:7, Name:"שיט", Desc:"enjoy", Img:"/imgs/bm_8-97-1-9.jpg",OpeningHours:1, WebsiteAddress:"http",CountryId:2,IsConfirm:1,TypeId:2,Address:"even 34",Price:200,PersonId:3},
    ],
    countries:[
        {Id:1, Country:"קנדה"},
        {Id:2, Country:"דובאי"},
        {Id:3, Country:"ישראל"},
    ],
    person:[
        {Id:1, Person:"ילדים"},
        {Id:2, Person:"נוער"},
        {Id:3, Person:"מבוגרים"},
        // {Id:4, Person:"הכל"},// check it ... ??? smart way to a case the manager change the place it and it will be in the middle...
    ],
    attractionTypes:[
        {Id:1, Type:"יבש"},
        {Id:2, Type:"אקסטרים"},
        {Id:3, Type:"רטוב"},
    ],
    chosen:[
        {Id:1, Name:"במדבר", Desc:"enjoy", Img:"/imgs/ac_b3_d30.jpg",OpeningHours:1, WebsiteAddress:"http",CountryId:1,IsConfirm:1,TypeId:1,Address:"sanedrin 52",Price:300, PersonId:1},
        {Id:2, Name:"נחל", Desc:"arounding", Img:"/imgs/ac-back_country_m27.jpg",OpeningHours:1, WebsiteAddress:"http",CountryId:1,IsConfirm:1,TypeId:1,Address:"shalom 17",Price:0,PersonId:1},
        {Id:3, Name:"בריכה", Desc:"shpritz", Img:"/imgs/ak_WFALL2.jpg",OpeningHours:1, WebsiteAddress:"http",CountryId:1,IsConfirm:3,TypeId:1,Address:"chafez 5",Price:40,PersonId:1},
        {Id:5, Name:"מפלים", Desc:"challenge", Img:"/imgs/ac_m139.jpg",OpeningHours:1, WebsiteAddress:"http",CountryId:2,IsConfirm:1,TypeId:1,Address:"chalil 40",Price:0,PersonId:1}]
    ,
    filtering:[
        {Id:1, Name:"במדבר", Desc:"enjoy", Img:"/imgs/ac_b3_d30.jpg",OpeningHours:1, WebsiteAddress:"http",CountryId:1,IsConfirm:1,TypeId:1,Address:"sanedrin 52",Price:300, PersonId:1},
        {Id:2, Name:"נחל", Desc:"arounding", Img:"/imgs/ac-back_country_m27.jpg",OpeningHours:1, WebsiteAddress:"http",CountryId:1,IsConfirm:1,TypeId:1,Address:"shalom 17",Price:0,PersonId:2},
        {Id:3, Name:"בריכה", Desc:"shpritz", Img:"/imgs/ak_WFALL2.jpg",OpeningHours:1, WebsiteAddress:"http",CountryId:3,IsConfirm:3,TypeId:2,Address:"chafez 5",Price:40,PersonId:3},
        {Id:4, Name:"גן חיות", Desc:"sunny", Img:"/imgs/aw1.jpg",OpeningHours:1, WebsiteAddress:"http",CountryId:3,IsConfirm:2,TypeId:2,Address:"sol 12",Price:70,PersonId:1},
        {Id:5, Name:"מפלים", Desc:"challenge", Img:"/imgs/ac_m139.jpg",OpeningHours:1, WebsiteAddress:"http",CountryId:2,IsConfirm:1,TypeId:3,Address:"chalil 40",Price:0,PersonId:2},
        {Id:6, Name:"הגינה הסודית", Desc:"enjoy", Img:"/imgs/Garden 075.jpg",OpeningHours:1, WebsiteAddress:"http",CountryId:2,IsConfirm:1,TypeId:3,Address:"even 34",Price:100,PersonId:2},
        {Id:7, Name:"שיט", Desc:"enjoy", Img:"/imgs/bm_8-97-1-9.jpg",OpeningHours:1, WebsiteAddress:"http",CountryId:2,IsConfirm:1,TypeId:2,Address:"even 34",Price:200,PersonId:3},
    ]
}
const attractionReducer= (state = initialState, action)=>{
    switch(action.type)
    {
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

        case types.DELETE_ATTRACTION: 
        let arr1 = state.attractions.filter( item => item.id != action.payload );
        return{
            ...state,
            attractions: arr1
        } 

        case types.UPDATE_ATTRACTION:
        let arr2 = [...state.attractions];

        for (let i = 0; i < arr2.length; i++) {
            if (arr2[i].id === action.payload.id)
                arr2[i][action.payload.fieldName] = action.payload.newValue;
        }
        return{
            ...state,
            attractions: arr2,
        }
        //עדכון הסינון
        case types.UPDATE_FILTERING:
        return{
            ...state,
            filtering: action.payload
        } 

        case types.SELECT_ATTRACTION:
            // [{"attractionTypes":["wet","extrim"]},{"Group":["teenager","adults"]}]
        for (let i=0; i<action.payload.length; i++)
        {
            for (let i=0; i<state.attractions.length; i++){
                for (let j=0; j<state.attractionTypes.length; j++) 
                {
    
                }

            }

        }
            
    }
    return state;
}
export default attractionReducer;