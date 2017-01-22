import React from 'react';
import { render } from 'react-dom';
import { compose, applyMiddleware } from 'redux';
import { Router, useRouterHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { Provider } from 'react-redux';
import {
  createResponsiveStateReducer, createResponsiveStoreEnhancer,
} from 'redux-responsive';
import reduxLoggerMiddleware from 'redux-logger';
import createHistory from 'history/lib/createBrowserHistory';
import Main from './main';
import Store from './store';
import routes from './routes';

let history = useRouterHistory(createHistory)({
  basename: `${document.location.protocol}//${document.location.host}`,
});

Store.addReducers({
  routing: routerReducer,
  browser: createResponsiveStateReducer({
    mobile: 840,
    tablet: 960,
    desktop: 1280,
  }),
});

// init store
Store.init(compose(
  createResponsiveStoreEnhancer({
    performanceMode: true,
  }),
  applyMiddleware(
    reduxLoggerMiddleware()
  )
));

// Create an enhanced history that syncs navigation events with the store
history = syncHistoryWithStore(history, Store.getStore());
const rootRoute = {
  path: '/',
  component: Main,
  indexRoute: {
    onEnter: (nextState, replace) => replace('/home'),
  },
  childRoutes: [
    ...routes,
    {
      path: '*',
      onEnter: (nextState, replace) => replace('/home'),
    },
  ],
};

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
render((<Provider store={Store.getStore()}>
  <Router history={history} routes={rootRoute} />
</Provider>), document.getElementById('main'));
