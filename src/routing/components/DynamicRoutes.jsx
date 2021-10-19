import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import PublicAndPrivateRoute from './PublicAndPrivateRoute';

function DynamicRoutes({ routes, routesComponents, children }) {
	return (
		<Switch>
			{Object.values(routes).map(({ name, path, isPublic, isPrivate, exact }) => {
				let RouteComponent;
				if (isPrivate && isPublic) {
					RouteComponent = PublicAndPrivateRoute;
				} else if (isPublic) {
					RouteComponent = PublicRoute;
				} else {
					RouteComponent = PrivateRoute;
				}

				const ViewComponent = routesComponents[name];

				if (!ViewComponent) {
					throw new Error('Page missing for ' + name);
				}

				return exact ?
					(
						<RouteComponent
							key={path}
							exact path={path}
							component={ViewComponent}
						/>
					) : (
						<RouteComponent
							key={path}
							path={path}
							component={ViewComponent}
						/>
					)
			})}
			{children}
		</Switch>
	);
}

export default DynamicRoutes;
