import React from 'react';
import Immutable from 'immutable';
import renderer from 'react-test-renderer';
import { ButtonBar } from '../../client/components/ButtonBar';

let course = Immutable.Map({
    "_id": "5859309f3188b5cbab814dde",
    "Id": 2216,
    "title": "Computer System Engineering",
    "authorName": "John Smith",
    "authorId": 2,
    "length": "10:10",
    "category": "Computer Science"
});

describe('COMPONENT > BUTTON BAR > Snapshot', () => {
    it('should capture the Snapshot of the button bar', () => {        
        const component = renderer.create(<ButtonBar course={course} />);
        const json = component.toJSON();
        expect(json).toMatchSnapshot();
    });
});