import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { browserHistory } from 'react-router';
import { ButtonToolbar, Button } from 'react-bootstrap';

import TextInput from './TextInput.js';
import DropDownInput from './DropdownInput.js';
import CourseActions from '../actions/actionCreators';

class CourseForm extends Component {
    constructor(props, context) {
        super(props, context);

        this.formButtonLabel = 'Add Course';
        this.formForAdd = true;
    }

    handleSubmit() {
        let course = {};
        this.props.newCourse.forEach((i) => {
            if (i.get('value') != null) {
                return course[i.get('key')] = i.get('value');
            }
        });

        if (this.formForAdd) {
            this.props.dispatch(CourseActions.addCourseAsync(course));
        } else {
            this.props.dispatch(CourseActions.updateCourseAsync(course));
        }

        browserHistory.push('/');
    }

    onCancel() {
        browserHistory.push('/');
    }

    isValid(fields) {
        let isValid = fields.every((v) => {

            if (v.get('key') != 'Id') {
                if (v.get('value') == '') {
                    return false;
                }
            }
            return true;
        });

        return isValid;
    }

    displaySaveButton(newCourse) {

        if (this.isValid(newCourse)) {

            return (<Button type="submit"
                className="btn btn-primary"
                onClick={() => this.handleSubmit()}>

                {this.formButtonLabel}

            </Button>);
        } else {
            return (<Button disabled type="submit"
                className="btn btn-primary"
                onClick={() => this.handleSubmit()}>

                {this.formButtonLabel}

            </Button>);
        }
    }

    render() {

        const inputFields = this.props.newCourse.map((v, i) => {
            if (v.get('key') == 'Id') {

                if (v.get('value') != null) {
                    this.formButtonLabel = 'Update Course';
                    this.formForAdd = false;
                }
            }

            if (v.get('value') != null && v.get('type') == 'text') {
                                
                return <TextInput
                    title={v.get('title')}
                    value={v.get('value')}
                    key={i}
                    index={i}
                    required={v.get('required')}
                    dataType={v.get('dataType')}
                    enable={!v.get('enable')} />;
            }

            if (v.get('value') != null && v.get('type') == 'dropdown') {
                return <DropDownInput
                    authors={this.props.authors}
                    title={v.get('title')}
                    value={v.get('value')}
                    key={i}
                    index={i} />;
            }
        });

        return (
            <div className="form-horizontal">

                {inputFields}

                <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <ButtonToolbar>

                            {this.displaySaveButton(this.props.newCourse)}

                            <Button
                                className="btn btn-danger"
                                onClick={() => this.onCancel()}>
                                Cancel
                        </Button>
                        </ButtonToolbar>
                    </div>
                </div>

            </div>
        );
    }
}

export default connect()(CourseForm);
