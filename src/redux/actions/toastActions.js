import { TOASTS_ACTIONS } from '../reducers/toastReducer';

let toastId = 0;

export function deleteToastAction(toast) {
  return {
    type: TOASTS_ACTIONS.delete,
    payload: toast.id,
  }
}

export function pushToastAction(message, severity, autoHideDuration) {
  return (dispatch) => {
    toastId += 1;
    const toast = { message, severity, autoHideDuration, id: toastId  };
    dispatch({ type: TOASTS_ACTIONS.push, payload: toast });
    if ('success' === severity) {
      window.setTimeout(() => {
        dispatch(deleteToastAction(toast));
      }, autoHideDuration);
    }
  }
}
