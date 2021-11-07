import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { isAuthLoadingSelector } from '../../redux/selectors/authSelectors';
import CenteredCircularProgress from '../../ui/molecules/CenteredCircularProgress';

// Route where you can be either authenticated or unauthenticated

function PublicAndPrivateRoute({ component: Component, ...rest }) {
  const isLoading = useSelector(isAuthLoadingSelector);

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  return (
    <Route {...rest} render={props => {
      return <Component {...props} />
    }}/>
  );

}

export default PublicAndPrivateRoute;
