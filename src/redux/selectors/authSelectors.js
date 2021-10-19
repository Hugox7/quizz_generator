export function isAuthenticatedSelector(state) {
  return Boolean(state.auth.userIri && state.auth.user);
}

export function currentUserIriSelector(state) {
  return state.auth.userIri;
}

export function isAuthLoadingSelector(state) {
  return state.auth.loading;
}

export function currentUserSelector(state) {
  const userIri = currentUserIriSelector(state);

  if (!userIri) {
    return null;
  }
  return state.auth.user;
}
