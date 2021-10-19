import React from 'react';
import Header from '../molecules/Header';
import { useSelector } from 'react-redux';
import { currentUserSelector, isAuthenticatedSelector } from '../../redux/selectors/authSelectors';
import useHiddenHeader from '../../hooks/useHiddenHeader';

function HeaderWithStore() {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const currentUser = useSelector(currentUserSelector);

  // if we are on login or register page, we don't show the header
  const { isHiddenHeaderRoute } = useHiddenHeader();

  return !isHiddenHeaderRoute ? <Header isAuthenticated={isAuthenticated} user={currentUser} /> : null;
}

export default HeaderWithStore;
