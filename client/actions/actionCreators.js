import axios from 'axios';

import Constants from '../constants/constants';

const base = 'http://app.viomedia.com/courses/api';

/* eslint-disable no-console */

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

            if (data['search']) {
                if (data['search'].value != '') {
                    if (isSorting)
                        queryUrl += '&';

                    queryUrl += `searchColumn=${data['search'].keys[0]}&searchValue=${data['search'].value}`;
                }
            }

            axios.get(`api/courses/filter/${data.page}?${queryUrl}`)
                .then(function (response) {
                    console.log('res', response.data);
                    
                    dispatch(CourseActions.coursesCount(response.data.count));
                    dispatch(CourseActions.loadCourses(response.data.courses));
                    dispatch(CourseActions.setCourseIsLoading(false));
                })
                .catch(function (response) {
                    console.log('Error in filterUsersInServerAsync ' + response);
                });
        };

        // return function (dispatch) {
        //     axios.get(`/api/courses/filter/${data.key}/${data.order}`)
        //         .then(function (response) {
        //             dispatch(CourseActions.loadCourses(response.data));
        //         })
        //         .catch(function (response) {
        //             console.log('Error in loadCoursesAsync ' + response);
        //         });
        // };
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

export default CourseActions;