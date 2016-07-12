import { createStore, combineReducers } from 'redux';
let Reducers = require('./reducers');

const Store = createStore(() => {});

export default {
    getStore() {
        return Store;
    },

    addReducers(reducers) {
        Reducers = Object.assign(Reducers, reducers);
        Store.replaceReducer(combineReducers(Reducers));
    },
};
