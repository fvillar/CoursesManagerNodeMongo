import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
// import the root reducer & default state
import rootReducer from './reducers/index';
import courseInitialState from './initialState/courseInitialState';
import authorInitialState from './initialState/authorInitialState';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const defaultState = Object.assign({}, courseInitialState, authorInitialState);

const store = createStore(rootReducer, defaultState, composeEnhancers(applyMiddleware(thunk)));
export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
    module.hot.accept('./reducers/', () => {
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    });
}

export default store;
