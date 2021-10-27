import { useLocation } from 'react-router-dom';
import routes from "../routing/routes";

/**
 * Returns a boolean : tells if current route shows header or not
 */

function useHiddenHeader() {
  const location = useLocation();

  // add here routes where you don't want the header to be shown
  const hiddenHeaderRoutes = [routes.login.path, routes.register.path];
  const isHiddenHeaderRoute = hiddenHeaderRoutes.includes(location.pathname);

  return { isHiddenHeaderRoute };
}

export default useHiddenHeader;
