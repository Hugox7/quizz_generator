export const TOASTS_ACTIONS = {
  push: 'TOASTS/PUSH',
  delete: 'TOASTS/DELETE',
};

const toastReducer = (state = [], action) => {
  switch (action.type) {
    case TOASTS_ACTIONS.push:
      return [...state, action.payload];
    case TOASTS_ACTIONS.delete:
      return state.filter((toast) => toast.id !== action.payload);
    default:
      return state;
  }
};

export default toastReducer;
