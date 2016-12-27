import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import coursesReducer from './coursesReducer';
import authorsReducer from './authorReducer';

const rootReducer = combineReducers({ 
    courses: coursesReducer, 
    authors: authorsReducer,
    routing: routerReducer 
});

export default rootReducer;
