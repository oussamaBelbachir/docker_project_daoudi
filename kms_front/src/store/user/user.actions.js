import {USER_ACTIONS_TYPES} from "./user.types";


export const setCurrentUser = (user) => {
    return {
        type : USER_ACTIONS_TYPES.SET_CURRENT_USER,
        payload : user
    }
}

export const setIsFetching = (check) => {
    return {
        type : USER_ACTIONS_TYPES.SET_IS_FETCHING,
        payload : check
    }
}