import React, { PropTypes } from 'react';
import CourseListRow from './CourseListRow';

const CourseList = ({courses}) => {

    return (
        <div className='well'>
            <table className='table table-striped table-condensed'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Author Name</th>
                        <th>Length</th>
                        <th>Category</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {courses.get('coursesList').map((c, i) =>
                        <CourseListRow key={i} course={c} />
                    )}
                </tbody>
            </table>            
        </div>
    );
};

// CourseList.propTypes = {
//     courses: PropTypes.array.isRequired
// };

export default CourseList;