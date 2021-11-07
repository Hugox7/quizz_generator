import ApiService from "../../api/apiService";
import { TYPE_ACTIONS } from "../reducers/typeReducer";

export function setTypesThunk() {
  return async (dispatch) => {
    const { data: types } = await ApiService.get('/type');
    dispatch({ type: TYPE_ACTIONS.SET_TYPES, payload: types });
  }
}
