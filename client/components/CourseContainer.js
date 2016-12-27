import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import CourseForm from './CourseForm';
import CourseActions from '../actions/actionCreators';

class CourseContainer extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.dispatch(CourseActions.loadAuthorsAsync());
    }

    render() {
        return (
            <div className="container">
                <CourseForm newCourse={this.props.courses.get('course')}
                    authors={this.props.authors.get('authorList')} />
            </div>
        );
    }
}

// AddCourse.propTypes = {
//     courses: PropTypes.array.isRequired,
//     actions: PropTypes.object.isRequired
// };

function mapStateToProps(state) {

    return {
        courses: state.courses,
        authors: state.authors
    };
}

export default connect(mapStateToProps)(CourseContainer);
