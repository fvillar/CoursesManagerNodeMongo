import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ButtonToolbar, Button } from 'react-bootstrap';

import CourseActions from '../actions/actionCreators';
import { browserHistory } from 'react-router';


export class ButtonBar extends Component {
    constructor(props, context) {
        super(props, context);
    }

    onDeleteClick() {
        this.props.dispatch(CourseActions.deleteCourseAsync(this.props.course.get('Id')));
    }

    onUpdateClick() {
        this.props.dispatch(CourseActions.updateCourseContainer(this.props.course));
        browserHistory.push('/updateCourse');
    }


    render() {
        return (
            <ButtonToolbar>
                <Button bsStyle="info" onClick={() => this.onUpdateClick()}>Update</Button>
                <Button bsStyle="danger" onClick={() => this.onDeleteClick()} >Delete</Button>
            </ButtonToolbar>
        );
    }
}

// AddCourse.propTypes = {
//     courses: PropTypes.array.isRequired,
//     actions: PropTypes.object.isRequired
// };



export default connect()(ButtonBar);
