import React from 'react';
import {Route, Switch} from 'react-router-dom';
import BlogFfmpeg from './pages/Blog/ffmpeg';
import Home from './pages/Home/index';
import VideoCompress from './pages/VideoCompress';
import VideoCut from './pages/VideoCut';
import VideoFormatConvert from './pages/VideoFormatConvert';

const ROUTES = [
  {path: '/', key: 'ROOT', needsAuth: false, exact: true, component: () => <Home />},
  {path: '/video-compress', key: 'VIDEO_COMPRESS', needsAuth: false, exact: true, component: () => <VideoCompress />},
  {
    path: '/video-convert',
    key: 'VIDEO_CONVERT',
    needsAuth: false,
    exact: true,
    component: () => <VideoFormatConvert />,
  },
  {
    path: '/video-cut',
    key: 'VIDEO_CUT',
    needsAuth: false,
    exact: true,
    component: () => <VideoCut />,
  },
  {
    path: '/blog/ffmpeg',
    key: 'BLOG_FFMPEG',
    needsAuth: false,
    exact: true,
    component: () => <BlogFfmpeg />,
  },
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
