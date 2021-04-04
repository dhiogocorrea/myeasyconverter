import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './pages/Home/index';
import VideoCompress from './pages/VideoCompress';

const ROUTES = [
  {path: '/', key: 'ROOT', needsAuth: false, exact: true, component: () => <Home />},
  {path: '/videocompress', key: 'VIDEO_COMPRESS', needsAuth: false, exact: true, component: () => <VideoCompress />},
];

export default ROUTES;

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props =>
        route.needsAuth ? RouteComponentWithAuth(props, route) : <route.component {...props} routes={route.routes} />}
    />
  );
}

const RouteComponentWithAuth = (props, route) => {
  return <route.component {...props} routes={route.routes} />;
};

export function RenderRoutes({routes}) {
  return (
    <Route
      render={({location}) => {
        return (
          <Switch location={location} style={{overflow: 'auto'}}>
            {routes.map((route, i) => {
              return <RouteWithSubRoutes key={route.key} {...route} style={{overflow: 'auto'}} />;
            })}
            <Route component={() => <h1>Not Found!</h1>} />
          </Switch>
        );
      }}
    />
  );
}
