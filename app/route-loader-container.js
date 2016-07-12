import React from 'react';
import Store from './store';
import { connect } from 'react-redux';
import RouteLoader from './route-loader';

function routeComponentHandler(com) {
    // add prefix to avoid naming conflict
    const pageName = `page_${com.pageName}`;

    // set up reducer
    if (com.reducer) {
        Store.addReducers({
            [pageName]: com.reducer,
        });
    }

    // transform to container component
    return connect(
        // every page component can only see their own state
        com.mapStateToProps ? state => {
            return com.mapStateToProps(state[pageName]);
        } : null,
        com.mapDispatchToProps
    )(com.default || com);
}

// wrapper RouteLoader, so that it does not need to know anything about Redux
export default function (props) {
    return <RouteLoader {...props} handleComponent={routeComponentHandler} />;
}
