import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { isAuthLoadingSelector } from '../../redux/selectors/authSelectors';

function PublicAndPrivateRoute({ component: Component, ...rest }) {
  const isLoading = useSelector(isAuthLoadingSelector);

  if (isLoading) {
    return <p>Loading...</p>; // TODO
  }

  return (
    <Route {...rest} render={props => {
      return <Component {...props} />
    }}/>
  );

}

export default PublicAndPrivateRoute;
