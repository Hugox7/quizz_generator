export const QUIZZ_ACTIONS = {
  SET_LIST: 'QUIZZ/SET_LIST',
  SET_CURRENT: 'QUIZZ/SET_CURRENT',
  SET_LOADING: 'QUIZZ/SET_LOADING',
};

const initialState = {
  list: [],
  current: null,
  loading: false,
}

const quizzReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUIZZ_ACTIONS.SET_LIST: {
      return { ...state, list: action.payload };
    }
    case QUIZZ_ACTIONS.SET_CURRENT: {
      return { ...state, current: action.payload };
    }
    case QUIZZ_ACTIONS.SET_LOADING: {
      return { ...state, loading: action.payload }
    }
    default:
      return state;
  }
};

export default quizzReducer;
