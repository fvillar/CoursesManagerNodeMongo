import axios from 'axios';
import _ from 'lodash';

import Constants from '../constants/constants';
import courseInitialState from '../initialState/courseInitialState';

// const base = 'http://app.viomedia.com/courses/api';

/* eslint-disable no-console */

let searchId = '';
let searchArray = [];

class CourseActions {

    static loadCourses(courses) {
        return {
            type: Constants.LOAD_COURSES,
            courses: courses
        };
    }

    static resetAddCourse() {
        return {
            type: Constants.RESET_ADD_COURSE
        };
    }

    static deleteCourse(course) {
        return {
            type: Constants.DELETE_COURSE,
            course: course
        };
    }

    static updateCourseValue(value, index) {
        return {
            type: Constants.UPDATE_COURSE_VALUE,
            value: value,
            index: index
        };
    }

    static updateCourseContainer(currentCourse) {
        return {
            type: Constants.UPDATE_COURSE_CONTAINER,
            currentCourse: currentCourse
        };
    }

    static loadAuthors(authors) {
        return {
            type: Constants.LOAD_AUTHORS,
            authors: authors
        };
    }

    static loadAuthor(author) {
        return {
            type: Constants.LOAD_AUTHOR,
            author: author
        };
    }

    static sortCoursesInClient(sortColumn, sortOrder) {
        return {
            type: Constants.SORT_COURSES_CLIENT,
            sortColumn: sortColumn,
            sortOrder: sortOrder
        };
    }

    static setCourseIsLoading(bool) {
        return {
            type: Constants.SET_COURSE_ISLOADING,
            value: bool
        };
    }

    static coursesCount(num) {
        return {
            type: Constants.COURSES_COUNT,
            count: num
        };
    }

    static updateActivePage(num) {
        return {
            type: Constants.UPDATE_ACTIVE_PAGE,
            page: num
        };
    }

    // =============================================== //
    // =============== ASYNC CALLS =================== //
    // =============================================== //

    static loadCoursesAsync() {

        return function (dispatch) {
            axios.get('/api/courses')
                .then(function (response) {
                    dispatch(CourseActions.loadCourses(response.data));
                    dispatch(CourseActions.setCourseIsLoading(false));
                })
                .catch(function (response) {
                    console.log('Error in loadCoursesAsync ' + response);
                });
        };
    }

    static filterUsersInServerAsync(data) {
        return function (dispatch) {
            let queryUrl = '';
            let isSorting = false;

            if (data['sort']) {
                isSorting = true;
                queryUrl += `sortColumn=${data['sort'].key}&sortOrder=${data['sort'].order}`;
            }

            if (data['search'] && data['search'].length == 0)
                data['search'] = undefined;

            if (data['search']) {

                if (data['search'].value != '') {

                    if (isSorting)
                        queryUrl += '&';

                    // Build the search query for the queryURL
                    queryUrl += 'search=';
                    _.forEach(data['search'], (query) => {
                        if (!_.isEmpty(query))
                            queryUrl += '$(';
                        _.forEach(query.keys, (val) => {
                            if (_.last(query.keys) == val)
                                queryUrl += val + '*' + query.value + ')';
                            else
                                queryUrl += val + ',';
                        });
                    });

                    if (queryUrl.slice(-1) == '=') {
                        queryUrl = queryUrl.replace('search=', '');
                    }

                    let limit;
                    _.forEach(data['search'], (query) => {
                        if (query.limit != undefined) {
                            limit = query.limit;
                            return;
                        }
                    });

                    if (limit)
                        queryUrl += `&limit=${limit}`;

                    if (queryUrl.slice(-1) == '&') {
                        queryUrl = queryUrl.slice(0, -1);
                    }

                }
            }

            // If the search array is empty, create a new batch id
            if (searchArray.length == 0) {
                searchId = new Date().getTime().toString();
            }
            searchArray.push({ queryUrl: queryUrl, id: searchId, page: data.page });

            // At callback we will process and display the changes
            searchEvent((response) => {

                dispatch(CourseActions.coursesCount(response.data.count));
                if (response.data.count <= courseInitialState.courses.get('coursesPerPage'))
                    dispatch(CourseActions.updateActivePage(1));
                dispatch(CourseActions.loadCourses(response.data.courses));
                dispatch(CourseActions.setCourseIsLoading(false));

            });
        };
    }

    static addCourseAsync(course) {

        return function (dispatch) {

            axios.post('api/courses', course)
                .then(function () {
                    dispatch(CourseActions.loadCoursesAsync());
                })
                .catch(function (response) {
                    console.log('Error in addCourse ' + response);
                });
        };
    }

    static updateCourseAsync(course) {

        return function (dispatch) {
            axios.put(`api/courses/${course.Id}`, course)
                .then(function () {
                    dispatch(CourseActions.loadCoursesAsync());
                })
                .catch(function (response) {
                    console.log('Error in updateCourseAsync ' + response);
                });
        };
    }

    static deleteCourseAsync(courseId) {

        return function (dispatch) {

            axios.delete(`api/courses/${courseId}`)
                .then(function (response) {
                    dispatch(CourseActions.deleteCourse(response.data));
                })
                .catch(function (response) {
                    console.log('Error in deleteCourseAsync ' + response);
                });
        };
    }

    static loadAuthorsAsync() {

        return function (dispatch) {
            axios.get('api/authors')
                .then(function (response) {
                    dispatch(CourseActions.loadAuthors(response.data));
                })
                .catch(function (response) {
                    console.log('Error in loadAuthorsAsync ' + response);
                });
        };
    }

    static loadAuthorAsync(authorId) {

        return function (dispatch) {
            axios.get(`api/authors/${authorId}`)
                .then(function (response) {
                    dispatch(CourseActions.loadAuthor(response.data));
                })
                .catch(function (response) {
                    console.log('Error in loadAuthorAsync ' + response);
                });
        };
    }
}

/*
 *  Function created to only show the last result set requested by the user
 *  If thre is an extra time from the server, to serve for our request and
 *  there is a subsequent request, it will only show the latter 
 */
function searchEvent(callback) {

    searchArray.forEach((v, i) => {

        if (!v.ran) {
            searchArray[i].ran = true;

            axios.get(`api/courses/filter/${v.page}?${v.queryUrl}`)
                .then(function (response) {
                    // just thelatest response from server will sent via the dispatcher
                    if (searchArray.length - 1 == i && searchId == v.id) {
                        searchArray = [];
                        callback(response);
                    }
                })
                .catch(function (response) {
                    console.log('Error in filterUsersInServerAsync > searchEvent ' + response);
                });
        }
    });
}

export default CourseActions;