export const AUTH_ACTIONS = {
  CLEAR: 'AUTH/CLEAR',
  SET_USER_IRI: 'AUTH/SET_USER_IRI',
  SET_USER: 'AUTH/SET_USER',
  SET_LOADING: 'AUTH/SET_LOADING',
};

const initialState = {
  userIri: null,
  user: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_USER_IRI: {
      return { ...state, userIri: action.payload };
    }
    case AUTH_ACTIONS.SET_USER: {
      return { ...state, user: action.payload };
    }
    case AUTH_ACTIONS.CLEAR: {
      return { ...initialState, userIri: null, user: null };
    }
    case AUTH_ACTIONS.SET_LOADING: {
      return { ...state, loading: action.payload }
    }
    default:
      return state;
  }
};

export default authReducer;
