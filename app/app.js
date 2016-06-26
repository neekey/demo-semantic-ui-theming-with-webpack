import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import RouteLoader from './route-loader';

import Main from './main';

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
render((
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <IndexRoute component={RouteLoader} />
            <Route path="dashboard" component={RouteLoader} />
            <Route path="profile" component={RouteLoader}>
                <Route path="/user/:userId" component={RouteLoader} />
            </Route>
            <Route path="*" component={RouteLoader} />
        </Route>
    </Router>

), document.getElementById('main'));
