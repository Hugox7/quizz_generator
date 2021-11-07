export const TYPE_ACTIONS = {
  SET_TYPES: 'TYPES/SET_LOADING',
};

const typeReducer = (state = [], action) => {
  switch (action.type) {
    case TYPE_ACTIONS.SET_TYPES: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default typeReducer;
