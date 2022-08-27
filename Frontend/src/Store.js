import { applyMiddleware, createStore } from "redux"
import logger from "redux-logger"
import {Reducer} from "./Redux/Reducer"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
export const Store = createStore(Reducer, composeWithDevTools(applyMiddleware(thunk)))

