import React from 'react';
import DynamicRoutes from './routing/components/DynamicRoutes';
import routes from './routing/routes';
import appScreens from './ui/appScreens';

function Router() {
  return (
    <DynamicRoutes routes={routes} routesComponents={appScreens} />
  );
}

export default Router;
