import ApiService from "../../api/apiService";
import { QUIZZ_ACTIONS } from "../reducers/quizzReducer";

export function fetchListThunk(params = {}) {
  return async (dispatch) => {
    dispatch({ type: QUIZZ_ACTIONS.SET_LOADING, payload: true  });
    try {
      const { data: quizz } = await ApiService.get('/quizz', params);
      dispatch({ type: QUIZZ_ACTIONS.SET_LIST, payload: quizz });
    } catch {
      throw new Error("Can't fetch quizz");
    } finally {
      dispatch({ type: QUIZZ_ACTIONS.SET_LOADING, payload: false  });
    }
  }
}

export function fetchQuizzThunk(id) {
  return async (dispatch) => {
    dispatch({ type: QUIZZ_ACTIONS.SET_LOADING, payload: true  });
    try {
      const { data: quizz } = await ApiService.get(`quizz/${id}`);
      dispatch({ type: QUIZZ_ACTIONS.SET_CURRENT, payload: quizz });
    } catch {
      throw new Error("Can't fetch quizz");
    } finally {
      dispatch({ type: QUIZZ_ACTIONS.SET_LOADING, payload: false  });
    }
  }
}
