import { ActionType } from "../action-type";
import { UserState } from "../../components/type";
import { Dispatch } from "redux";
import { Action } from "../actions/index";

export const addContact = (user: UserState) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.Add_Contact,
      payload: user,
    });
  };
};
export const updateContact = (user: UserState) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.Update_Contact,
      payload: user,
    });
  };
};
export const getContact = (user: UserState) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.Get_Contact,
      payload:user
    });
  };
};
export const removeContact = (id: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: ActionType.Remove_Contact,
      payload: id,
    });
  };
};

export const searchContact = (searchTerm:any) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.Search_Contact,
      payload: searchTerm,
    });
  };
};
