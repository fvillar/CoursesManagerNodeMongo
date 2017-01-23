import React from 'react';
import { shallow } from 'enzyme';
import CourseListRow from '../../client/components/CourseListRow';
import Immutable from 'immutable';
import renderer from 'react-test-renderer';
import { createStore } from 'redux';
import { ButtonBar } from '../../client/components/ButtonBar';

//import store from '../../client/store';
//import CourseInitialState from '../../client/initialState/courseInitialState';

let course = Immutable.Map({
    "_id": "5859309f3188b5cbab814dde",
    "Id": 2216,
    "title": "Computer System Engineering",
    "authorName": "John Smith",
    "authorId": 2,
    "length": "10:10",
    "category": "Computer Science"
});

describe('COMPONENT > COURSE LIST ROW', () => {
    it('should render a row with 5 text values and 1 button bar', () => {

        const enzymeWrapper = shallow(<CourseListRow key={1} course={course} />);

        expect(enzymeWrapper.type()).toEqual('tr');

        let id = enzymeWrapper.childAt(0);
        expect(id.type()).toEqual('td');
        expect(id.text()).toEqual('2216');

        let title = enzymeWrapper.childAt(1);
        expect(title.type()).toEqual('td');
        expect(title.text()).toEqual('Computer System Engineering');

        let authorName = enzymeWrapper.childAt(2);
        expect(authorName.type()).toEqual('td');
        expect(authorName.text()).toEqual('John Smith');

        let length = enzymeWrapper.childAt(3);
        expect(length.type()).toEqual('td');
        expect(length.text()).toEqual('10:10');

        let category = enzymeWrapper.childAt(4);
        expect(category.type()).toEqual('td');
        expect(category.text()).toEqual('Computer Science');

        let button = enzymeWrapper.childAt(5);
        expect(category.type()).toEqual('td');

        // Subcomponents
        const ButtonProps = button.childAt(0).props();
        expect(ButtonProps.course).toEqual(course);
    });
});

describe('COMPONENT > COURSE LIST ROW > Snapshot', () => {
    it('should capture the Snapshot of the Course List Row', () => {
        jest.mock('../../client/components/ButtonBar', () => 'ButtonBar');
        
        
        const component = renderer.create(<CourseListRow key={1} course={course} />);
        const json = component.toJSON();
        expect(json).toMatchSnapshot();
    });
});

