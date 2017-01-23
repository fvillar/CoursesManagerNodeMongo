import { Home } from '../../client/components/Home';
import React from 'react';
import { shallow } from 'enzyme';
import CourseList from '../../client/components/CourseList';
import Immutable from 'immutable';

function setup() {
    const props = {
        courses: Immutable.Map({
            isLoading: false,
            coursesList: Immutable.List(
                [
                    Immutable.Map({
                        "_id": "5859309f3188b5cbab814dde",
                        "Id": 2216,
                        "title": "Computer System Engineering",
                        "authorName": "John Smith",
                        "authorId": 2,
                        "length": "10:10",
                        "category": "Computer Science"
                    }),
                    Immutable.Map({
                        "_id": "5859309f3188b5cbab814ddf",
                        "Id": 2217,
                        "title": "Introduction to Algorithms",
                        "authorName": "John Smith",
                        "authorId": 2,
                        "length": "10:10",
                        "category": "Computer Science"
                    })
                ])
        })
    };

    const enzymeWrapper = shallow(<Home {...props} />);

    return {
        props,
        enzymeWrapper
    };
}

describe('COMPONENT > HOME', () => {
    it('should render self and subcomponents', () => {
        const { enzymeWrapper } = setup();

        expect(enzymeWrapper.find('div').first().hasClass('container')).toBe(true);

        expect(enzymeWrapper.find('div').at(1).hasClass('jumbotron')).toBe(true);

        let jumbotronH1 = enzymeWrapper.find('div').at(1).childAt(0);
        expect(jumbotronH1.type()).toEqual('h1');
        expect(jumbotronH1.text()).toEqual('Courses Manager');

        // Subcomponents
        const CourseListProps = enzymeWrapper.find('CourseList').props();
        expect(CourseListProps.courses).toEqual(Immutable.Map({
            isLoading: false,
            coursesList: Immutable.List(
                [
                    Immutable.Map({
                        "_id": "5859309f3188b5cbab814dde",
                        "Id": 2216,
                        "title": "Computer System Engineering",
                        "authorName": "John Smith",
                        "authorId": 2,
                        "length": "10:10",
                        "category": "Computer Science"
                    }),
                    Immutable.Map({
                        "_id": "5859309f3188b5cbab814ddf",
                        "Id": 2217,
                        "title": "Introduction to Algorithms",
                        "authorName": "John Smith",
                        "authorId": 2,
                        "length": "10:10",
                        "category": "Computer Science"
                    })
                ])
        }));
    });

});