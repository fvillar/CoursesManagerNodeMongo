import React, { PropTypes } from 'react';

import ButtonBar from './ButtonBar';

const CourseListRow = ({course}) => {
    return (
        <tr>
            <td>{course.get('Id')}</td>
            <td>{course.get('title')}</td>
            <td>{course.get('authorName')}</td>
            <td>{course.get('length')}</td>
            <td>{course.get('category')}</td>
            <td><ButtonBar course={course} /></td>
        </tr>
    );
};

CourseListRow.propTypes = {
    course: PropTypes.object.isRequired
};

export default CourseListRow;