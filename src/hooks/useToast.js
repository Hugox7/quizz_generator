import { useCallback } from 'react';
import { useDispatch } from "react-redux";
import { pushToastAction } from '../redux/actions/toastActions';

function useToast() {
  const dispatch = useDispatch();
  return useCallback(
    (message, severity = 'error', autoHideDuration = 6000) => {
      dispatch(pushToastAction(message, severity, autoHideDuration));
    },
    [dispatch]
  );
}

export default useToast;
