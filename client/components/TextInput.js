import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Col } from 'react-bootstrap';

import CourseActions from '../actions/actionCreators';

// const CourseForm = (newCourse) => {
class TextInput extends Component {
    constructor(props, context) {
        super(props, context);

        this.isLoading = true;
    }

    componentDidMount() {
        this.isLoading = false;
    }

    updateValue(value, index) {
        this.props.dispatch(CourseActions.updateCourseValue(value, index));
    }

    getValidationState() {
        //TODO: if there is a number only
        if (this.isLoading) return;

        const length = this.props.value.length;

        if (length > 0)
            if(this.props.dataType == 'number' && isNaN(this.props.value))
                return 'error';
            else
                return 'success';
        else if (length <= 0)
            return 'error';
    }

    render() {        
        if (this.props.required) {
            return (
                <FormGroup validationState={this.getValidationState()} >

                    <Col componentClass={ControlLabel} sm={2}>
                        {_.capitalize(this.props.title)}<HelpBlock>*</HelpBlock>
                    </Col>

                    <Col sm={10}>
                        <FormControl
                            type="text"
                            onChange={(e) => this.updateValue(e.target.value, this.props.index)}
                            value={this.props.value}
                            placeholder={_.capitalize(this.props.title)} />
                    </Col>
                </FormGroup>
            );
        } else {
            return (
                <FormGroup>

                    <Col componentClass={ControlLabel} sm={2}>
                        {_.capitalize(this.props.title)}
                    </Col>

                    <Col sm={10}>
                        <FormControl
                            type="text"
                            onChange={(e) => this.updateValue(e.target.value, this.props.index)}
                            value={this.props.value}
                            placeholder={_.capitalize(this.props.title)} />
                    </Col>
                </FormGroup>
            );
        }
    }
}

export default connect()(TextInput);
