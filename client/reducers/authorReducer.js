import Immutable from 'immutable';
import _ from 'lodash';

import constants from '../constants/constants';
import authorInitialState from '../initialState/authorInitialState';

function authorsReducer(state = authorInitialState.authors, action) {
    switch (action.type) {

        case constants.LOAD_AUTHORS:
            state = state.updateIn(['authorList'], (a) => a = Immutable.fromJS(action.authors));
            return state;
        case constants.LOAD_AUTHOR:
            state = state.updateIn(['author'], (a) => a = Immutable.fromJS(action.author));
            return state;

        default:
            return state;
    }
}

export default authorsReducer;