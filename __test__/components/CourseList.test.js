import React from 'react';
import { shallow } from 'enzyme';
import CourseList from '../../client/components/CourseList';
import Immutable from 'immutable';

function setup() {

    let courses = Immutable.Map({
        'coursesList': Immutable.List(
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
    });

    const enzymeWrapper = shallow(<CourseList courses={courses} />);

    return {
        enzymeWrapper
    };
}

describe('COMPONENT > COURSE LIST', () => {
    it('should render self and subcomponents', () => {
        const { enzymeWrapper } = setup();

        expect(enzymeWrapper.find('table').hasClass('table table-striped table-condensed')).toBe(true);

        let id = enzymeWrapper.find('tr').childAt(0);
        expect(id.type()).toEqual('th');
        expect(id.text()).toEqual('Id');

        let title = enzymeWrapper.find('tr').childAt(1);
        expect(title.type()).toEqual('th');
        expect(title.text()).toEqual('Title');

        let authorName = enzymeWrapper.find('tr').childAt(2);
        expect(authorName.type()).toEqual('th');
        expect(authorName.text()).toEqual('Author Name');

        let length = enzymeWrapper.find('tr').childAt(3);
        expect(length.type()).toEqual('th');
        expect(length.text()).toEqual('Length');

        let category = enzymeWrapper.find('tr').childAt(4);
        expect(category.type()).toEqual('th');
        expect(category.text()).toEqual('Category');

        // Subcomponents
        const CourseListRowProps = enzymeWrapper.find('CourseListRow').first().props();
        expect(CourseListRowProps.course).toEqual(Immutable.Map({
                    "_id": "5859309f3188b5cbab814dde",
                    "Id": 2216,
                    "title": "Computer System Engineering",
                    "authorName": "John Smith",
                    "authorId": 2,
                    "length": "10:10",
                    "category": "Computer Science"
                }));
    });

});