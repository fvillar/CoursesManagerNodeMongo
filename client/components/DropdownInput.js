import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Col } from 'react-bootstrap';

import CourseActions from '../actions/actionCreators';

// const CourseForm = (newCourse) => {
class DropDownInput extends Component {
    constructor(props, context) {
        super(props, context);
        this.isValid = false;
    }

    updateValue(value, index) {
        this.isValid = true;
        this.props.dispatch(CourseActions.updateCourseValue(value, index));
    }

    getValidationState() {
        if (!this.isValid) return;

        const { value } = this.props;

        if (value == 'Select an Author')
            return 'error';
        else
            return 'success';
    }

    render() {
        let optionValues = this.props.authors.map((author, i) =>
            <option key={i} value={author.get('Id')} >
                {author.get('firstName') + ' ' + author.get('lastName')}
            </option>
        );

        optionValues = optionValues.unshift(
            <option key={99999} defaultValue="" >Select an Author</option>
        );

        return (
            <FormGroup validationState={this.getValidationState()} >

                <Col componentClass={ControlLabel} sm={2}>
                    {_.capitalize(this.props.title)}<HelpBlock>*</HelpBlock>
                </Col>

                <Col sm={10}>
                    <FormControl className="form-control"
                        componentClass="select"
                        placeholder="Author"
                        onChange={(e) => this.updateValue(e.target.value, this.props.index)}
                        value={this.props.value}>

                        {optionValues}

                    </FormControl>
                </Col>
            </FormGroup>
        );
    }
}

export default connect()(DropDownInput);
