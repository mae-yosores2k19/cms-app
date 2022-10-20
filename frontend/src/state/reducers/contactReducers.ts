import { UserState } from "../../components/type";
import { ActionType } from "../action-type";
import { Action } from "../actions/index";

const initialState = {
  userContact: {
    firstname: "",
    lastname: "",
    billingaddress: "",
    physicaladdress: "",
  },
  error: [],
  msg: "",
};
const reducer = (state: UserState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.Get_Contact:
      return {
        ...state,
        userContact: action.payload,
      };
    case ActionType.Add_Contact:
      return {
        ...state,
        userContact: action.payload,
      };
    case ActionType.Update_Contact:
      return {
        ...state,
        userContact: action.payload,
      };
    case ActionType.Remove_Contact:
      const { payload } = action;
      const newData= Object.values(state.userContact).filter(
        (user: any) => user._id !== payload
      );
      return {
        ...state,
        userContact:newData
      }

    case ActionType.Search_Contact:
      return {
        ...state,
        userContact:payload
      };
    default:
      return state;
  }
};

export default reducer;
