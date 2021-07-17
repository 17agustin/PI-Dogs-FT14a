import {GET_ALL_DOGS,GET_DOG_DETAIL,GET_DOGS_BY_QUERY, GET_TEMPERAMENTS,FILTER, ORDER, FILTERTEMP, DELETE_DOG} from "../actions/index"

const initialState = {
    Dogs : [],
    Temperaments : [],
    dogDetail : undefined ,
    deleted: "",
    updating: false,
    
}

export default function rootReducer(state=initialState,{type,payload}){
    switch(type){
        case GET_ALL_DOGS:
            return {
                ...state,
                Dogs:payload          
            }
        case GET_DOG_DETAIL:
            return{
                ...state,
                dogDetail:payload
            }
        case GET_DOGS_BY_QUERY:
             return{
                 ...state,
                 Dogs: payload
             }
        case GET_TEMPERAMENTS:
             return{
                 ...state,
                 Temperaments: payload
             }
        case FILTER:
             return{
                 ...state,
                 Dogs:payload
             }
        case ORDER:
            return{
                ...state,
                Dogs:payload
            }
        case FILTERTEMP:
            return{
                ...state,
                Dogs:payload
            }
        case DELETE_DOG:
            return{
                ...state,
                deleted:payload
            }
        default : return state;            
    }
}