import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import RouteLoaderContainer from './route-loader-container';
import { Provider } from 'react-redux';
import Main from './main';
import Store from './store';

Store.addReducers({
    routing: routerReducer,
});

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, Store.getStore());

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
render((
    <Provider store={Store.getStore()}>
        <Router history={history}>
            <Route path="/" component={Main}>
                <IndexRoute component={RouteLoaderContainer} />
                <Route path="dashboard" component={RouteLoaderContainer} />
                <Route path="profile" component={RouteLoaderContainer}>
                    <Route path="/user/:userId" component={RouteLoaderContainer} />
                </Route>
                <Route path="users/:id" component={RouteLoaderContainer} />
                <Route path="*" component={RouteLoaderContainer} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('main'));
