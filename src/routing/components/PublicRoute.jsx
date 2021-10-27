import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticatedSelector, isAuthLoadingSelector } from '../../redux/selectors/authSelectors';
import routes from '../routes';

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const isLoading = useSelector(isAuthLoadingSelector);

  if (isLoading) {
    return <p>Loading...</p>; // TODO
  }
  if (!isAuthenticated) {
    return (
      <Route {...rest} render={props => {
        return <Component {...props} />
      }}/>
    );
  } else {
    return <Redirect to={routes.home.path} />;
  }
}

export default PrivateRoute;
