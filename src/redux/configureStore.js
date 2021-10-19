import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { initializeAuthThunk } from './actions/authActions';

function configureStore(preloadedStore) {
  const middlewares = [ thunk ];

  const store = createStore(
    rootReducer,
    preloadedStore,
    composeWithDevTools(
      applyMiddleware(...middlewares),
  ));

  store.dispatch(initializeAuthThunk());

  return store;
}

export default configureStore();
