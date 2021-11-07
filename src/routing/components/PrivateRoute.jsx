import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticatedSelector, isAuthLoadingSelector } from '../../redux/selectors/authSelectors';
import CenteredCircularProgress from '../../ui/molecules/CenteredCircularProgress';
import routes from '../routes';

// Route where you must be authenticated

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const isLoading = useSelector(isAuthLoadingSelector);

  if (isLoading) {
    return <CenteredCircularProgress />;
  }
  if (isAuthenticated) {
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
