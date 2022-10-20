import {ActionType} from "../action-type/index"
import {UserState} from "../../components/type"

interface Add_Contact{
    type:ActionType,
    payload:UserState
}

interface Update_Contact{
    type:ActionType,
    payload:UserState
}
interface Remove_Contact {
    type:ActionType.Remove_Contact,
    payload:UserState
}
interface Get_Contact {
    type:ActionType.Get_Contact,
    payload:UserState
}
interface Search_Contact {
    type:ActionType.Search_Contact,
    payload:UserState
}
export type Action =Add_Contact|Update_Contact|Remove_Contact|Get_Contact|Search_Contact
