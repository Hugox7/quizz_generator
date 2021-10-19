import routes from '../routing/routes';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const AUTH_SCREENS = {
  [routes.login.name]: Login,
  [routes.register.name]: Register,
};

const APP_SCREENS = {
  [routes.home.name]: Home,
};

const appScreens = {
  ...AUTH_SCREENS,
  ...APP_SCREENS,
};


export default appScreens;
