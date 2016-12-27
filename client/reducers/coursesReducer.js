import Immutable from 'immutable';
import _ from 'lodash';

import constants from '../constants/constants';
import courseInitialState from '../initialState/courseInitialState';

function coursesReducer(state = courseInitialState.courses, action) {
    switch (action.type) {

        case constants.LOAD_COURSES:
            state = state.updateIn(['coursesList'], (l) => l = Immutable.fromJS(action.courses));
            return state;

        case constants.UPDATE_COURSE_VALUE:
            state = state.updateIn(['course', action.index, 'value'], (v) => v = action.value);
            return state;

        case constants.RESET_ADD_COURSE:
            state = state.set('course', courseInitialState.courses.get('course'));
            return state;

        case constants.DELETE_COURSE:
            let stateJS = state.toJS();
            let courseIndex = _.findLastIndex(stateJS.coursesList, { Id: action.course.Id });
            return state.deleteIn(['coursesList', courseIndex]);

        case constants.UPDATE_COURSE_CONTAINER:
            /*THIS POPULATE THE COURSE DETAIL*/
            //get defaultState course item as a template for the update obj
            state = state.set('course', courseInitialState.courses.get('course'));
            //Set every item from the course to defaultState-like obj
            state = state.update('course', (course) =>
                course = state.get('course').map((field) => {                    

                    return Immutable.Map({
                        key: field.get('key'),
                        value: action.currentCourse.get(field.get('key')),
                        title: field.get('title'),
                        type: field.get('type'),
                        enable: !field.get('enable'),
                        dataType: field.get('dataType'),
                        required: field.get('required'),
                    });
                }));
            return state;

        case constants.SORT_COURSES_CLIENT:
            if (action.sortOrder == 'asc') {
                state = state.set('coursesList', state.get('coursesList').sort(
                    (a, b) => {
                        if (isNaN(a.get(action.sortColumn))
                            && isNaN(b.get(action.sortColumn))) {
                            return a.get(action.sortColumn).localeCompare(b.get(action.sortColumn));
                        }
                        else{
                            return a.get(action.sortColumn) - b.get(action.sortColumn);
                        }
                    }));
            }
            else {
                state = state.set('coursesList', state.get('coursesList').sort(
                    (a, b) => b.get('title').localeCompare(a.get('title'))
                ));
            }
            return state;

        default:
            return state;
    }
}

export default coursesReducer;