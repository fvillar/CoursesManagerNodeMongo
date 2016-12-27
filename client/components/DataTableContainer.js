import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import CourseActions from '../actions/actionCreators';
import DataTable from './DataTable';

class DataTableContainer extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.dispatch(CourseActions.loadCoursesAsync());
    }

    render() {

        const {courses} = this.props;

        return (
            <div className="container">
                    <DataTable courses={courses} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        courses: state.courses
    };
}

export default connect(mapStateToProps)(DataTableContainer);
