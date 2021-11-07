import jwtDecode from "jwt-decode";
import ApiService from "../../api/apiService";
import { jwt } from "../../storage/jwt";
import { refreshToken } from "../../storage/refreshToken";
import { AUTH_ACTIONS } from "../reducers/authReducer";
import { currentUserSelector } from "../selectors/authSelectors";

export function logoutAction() {
  return (dispatch) => {
    jwt.remove();
    refreshToken.remove();
    dispatch({ type: AUTH_ACTIONS.CLEAR });
  };
}

export function initializeAuthThunk() {
  return async (dispatch, getState) => {
    // return if user is already set - avoid useless api calls
    const currentUser = currentUserSelector(getState());
    if (currentUser) {
      return;
    }

    const token = jwt.get();

    // If no token, we make sure to clear the store.
    if (!token) {
      dispatch(logoutAction());
      return;
    }

    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });

    const decodedToken = jwtDecode(token);

    if (!decodedToken.publicId) {
      throw new Error('Missing user from JWT token.');
    }

    dispatch({ type: AUTH_ACTIONS.SET_USER_IRI, payload: decodedToken.publicId });

    // fetch data
    const userResponse = await ApiService.get('user/me', {});
    // TODO improve ?
    if (userResponse.data) {
      dispatch({ type: AUTH_ACTIONS.SET_USER, payload: userResponse.data });
    } else {
      dispatch(logoutAction());
    }

    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
  }
}
