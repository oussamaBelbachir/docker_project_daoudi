 
import logger from 'redux-logger'
 
import { createStore ,applyMiddleware} from "redux";
import { persistedReducer } from "./root-reducer";

const store = createStore(
    persistedReducer,
    applyMiddleware(logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;