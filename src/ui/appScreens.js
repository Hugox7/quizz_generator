import routes from '../routing/routes';
import CreateQuizz from './pages/CreateQuizz';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';

const AUTH_SCREENS = {
  [routes.login.name]: Login,
  [routes.register.name]: Register,
  [routes.profile.name]: Profile,
  [routes.createQuizz.name]: CreateQuizz,
};

const APP_SCREENS = {
  [routes.home.name]: Home,
};

const appScreens = {
  ...AUTH_SCREENS,
  ...APP_SCREENS,
};


export default appScreens;
