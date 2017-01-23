import reducer from '../../client/reducers/authorReducer';
import constants from '../../client/constants/constants';
import Immutable from 'immutable';
import * as matchers from 'jest-immutable-matchers';

describe('REDUCER > AUTHOR', () => {
    beforeEach(function () {
        jest.addMatchers(matchers);
    });

    it('should return the authors initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqualImmutable(
            Immutable.fromJS(
                {
                    authorList: [],
                    author: {}
                })
            );
    });

    it('should handle LOAD_AUTHORS', () => {
        let expectedAuthorsList = Immutable.List([Immutable.Map({
            _id: '585d39410a1903c4fa47ec2e',
            Id: 1,
            firstName: 'Cory',
            lastName: 'House',
            Courses: null
        })]);

        expect(
            reducer(undefined, {
                type: constants.LOAD_AUTHORS,
                authors: [{
                    _id: '585d39410a1903c4fa47ec2e',
                    Id: 1,
                    firstName: 'Cory',
                    lastName: 'House',
                    Courses: null
                }]
            })
        ).toEqualImmutable(
            Immutable.Map(
                {
                    author: Immutable.Map(),
                    authorList: expectedAuthorsList
                })
            );
    });

});