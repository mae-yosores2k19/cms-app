import {combineReducers} from "redux"
import contactReducers from "./contactReducers"

const reducers = combineReducers({
    contact:contactReducers
})

export default reducers
export type State = ReturnType<typeof reducers>