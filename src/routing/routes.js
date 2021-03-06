// auth routes
const AUTH_ROUTES = {
  login: {
    name: 'login',
    path: '/login',
    isPublic: true,
    isPrivate: false,
    exact: false,
  },
  register: {
      name: 'register',
      path: '/register',
      isPublic: true,
      isPrivate: false,
      exact: false,
  },
  profile: {
    name: 'profile',
    path: '/profile',
    isPrivate: true,
    exact: false,
  },
  createQuizz: {
    name: 'createQuizz',
    path: '/create-quizz/:id',
    isPrivate: true,
    exact: false,
  },
};

// app routes
const APP_ROUTES = {
  home: {
    name: 'home',
    path: '/',
    isPublic: true,
    isPrivate: true,
    exact: true,
  }
};

const routes = {
  ...AUTH_ROUTES,
  ...APP_ROUTES,
}

export default routes;
