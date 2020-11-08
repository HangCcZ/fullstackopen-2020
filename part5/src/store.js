import { createStore, combineReducers, applyMiddlleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

const reducer = combineReducers({})

const store = createStore(reducer, composeWithDevTools(applyMiddlleware(thunk)))
