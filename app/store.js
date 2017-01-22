import { createStore, combineReducers } from 'redux';

let Store = null;
let reducers = {};

export default {
  init(middleware = null) {
    if (!Store) {
      // some enhancer will trigger actions at the creation process,
      // so set update reducers right now.
      Store = createStore(combineReducers(reducers), middleware);
    } else {
      throw new Error('Store should only be init once!');
    }
  },

  getStore() {
    return Store;
  },

  addReducers(rs, nestKey) {
    if (nestKey) {
      const nestedReducers = reducers[nestKey] || {};
      reducers[nestKey] = combineReducers(Object.assign(nestedReducers, rs));
    } else {
      reducers = Object.assign(reducers, rs);
    }

    if (Store) {
      Store.replaceReducer(combineReducers(reducers));
    }
  },
};
