import { USER_ACTIONS_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser : null,
    isFetching : false,
}

export const userReducer = (state = INITIAL_STATE , action) => {

    const {type,payload} = action;

    switch(type){
        case USER_ACTIONS_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser : payload
            }
        case USER_ACTIONS_TYPES.SET_IS_FETCHING:
                return {
                    ...state,
                    isFetching : payload
                }
        default:
            return state;
    }
}