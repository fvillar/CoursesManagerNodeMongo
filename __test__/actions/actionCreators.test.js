import axios from 'axios';
import moxios from 'moxios'; //https://github.com/mzabriskie/moxios
import sinon from 'sinon';
import { equal } from 'assert';

import actions from '../../client/actions/actionCreators';
import constants from '../../client/constants/constants';


describe('ACTIONS', () => {

    it('should create an action to set is loading equals true', () => {
        const value = true;
        const expectedAction = {
            type: constants.SET_COURSE_ISLOADING,
            value
        };
        expect(actions.setCourseIsLoading(value)).toEqual(expectedAction);
    });

    it('should create an action to set is loading equals false', () => {
        const value = false;
        const expectedAction = {
            type: constants.SET_COURSE_ISLOADING,
            value
        };
        expect(actions.setCourseIsLoading(value)).toEqual(expectedAction);
    });

});

describe('ASYNC ACTIONS', () => {

    it('creates LOAD_COURSES when loadCoursesAsync has been done', (done) => {

        beforeEach(function () {
            // import and pass your custom axios instance to this method
            moxios.install();
        });

        afterEach(function () {
            // import and pass your custom axios instance to this method
            moxios.uninstall();
        });

        moxios.withMock(() => {
            let mockResponse = sinon.spy();
            axios.get('/api/courses').then(mockResponse);
            moxios.wait(() => {
                let request = moxios.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response:
                    [{
                        "_id": "5859309f3188b5cbab814dde",
                        "Id": 2216,
                        "title": "Computer System Engineering",
                        "authorName": "John Smith",
                        "authorId": 2,
                        "length": "10:10",
                        "category": "Computer Science"
                    },
                    {
                        "_id": "5859309f3188b5cbab814ddf",
                        "Id": 2217,
                        "title": "Introduction to Algorithms",
                        "authorName": "John Smith",
                        "authorId": 2,
                        "length": "10:10",
                        "category": "Computer Science"
                    }]
                }).then((response) => {
                    let list = [{
                        "_id": "5859309f3188b5cbab814dde",
                        "Id": 2216,
                        "title": "Computer System Engineering",
                        "authorName": "John Smith",
                        "authorId": 2,
                        "length": "10:10",
                        "category": "Computer Science"
                    },
                    {
                        "_id": "5859309f3188b5cbab814ddf",
                        "Id": 2217,
                        "title": "Introduction to Algorithms",
                        "authorName": "John Smith",
                        "authorId": 2,
                        "length": "10:10",
                        "category": "Computer Science"
                    }];
                    equal(list.length, response.data.length);

                    equal(list[0]._id, response.data[0]._id);
                    equal(list[0].Id, response.data[0].Id);
                    equal(list[0].title, response.data[0].title);
                    equal(list[0].authorName, response.data[0].authorName);
                    equal(list[0].authorId, response.data[0].authorId);
                    equal(list[0].category, response.data[0].category);

                    equal(list[1]._id, response.data[1]._id);
                    equal(list[1].Id, response.data[1].Id);
                    equal(list[1].title, response.data[1].title);
                    equal(list[1].authorName, response.data[1].authorName);
                    equal(list[1].authorId, response.data[1].authorId);
                    equal(list[1].category, response.data[1].category);

                    done();
                });
            });
        });
    });
});