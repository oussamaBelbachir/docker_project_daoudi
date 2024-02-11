import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";


import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";

import { getPersistConfig } from 'redux-deep-persist';


const rootReducer =  combineReducers({
    user : userReducer
});


const persistConfig = getPersistConfig({
    key : "root",
    version : 1,
    storage,
    whitelist: ['user'], // only navigation will be persisted
    rootReducer
});



export const persistedReducer = persistReducer(persistConfig,rootReducer);
