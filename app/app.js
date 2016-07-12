import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import RouteLoader from './route-loader';
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
                <IndexRoute component={RouteLoader} />
                <Route path="dashboard" component={RouteLoader} />
                <Route path="profile" component={RouteLoader}>
                    <Route path="/user/:userId" component={RouteLoader} />
                </Route>
                <Route path="users/:id" component={RouteLoader} />
                <Route path="*" component={RouteLoader} />
            </Route>
        </Router>
    </Provider>
), document.getElementById('main'));
