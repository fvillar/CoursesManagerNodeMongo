import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { browserHistory } from 'react-router';

import CourseActions from '../actions/actionCreators';
import CourseList from './CourseList';
import CourseContainer from './CourseContainer';

class Home extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        setTimeout(() => {
            this.props.dispatch(CourseActions.setCourseIsLoading(true));
            this.props.dispatch(CourseActions.loadCoursesAsync());
        }, 3000);
    }

    onAddClick() {
        this.props.dispatch(CourseActions.resetAddCourse());
        browserHistory.push('/addCourse');
    }

    onTableClick() {
        browserHistory.push('/dataTable');
    }

    render() {

        const {courses} = this.props;

        if (courses.get('isLoading'))
            return (<div class="bookshelf_wrapper">
            <h1>loading...</h1>
                <ul class="books_list">
                    <li class="book_item first"></li>
                    <li class="book_item second"></li>
                    <li class="book_item third"></li>
                    <li class="book_item fourth"></li>
                    <li class="book_item fifth"></li>
                    <li class="book_item sixth"></li>
                </ul>
                <div class="shelf"></div>
            </div>);
        else
            return (
                <div className="container">
                    <div className="jumbotron">
                        <h1>Courses Manager</h1>
                        <div style={{ float: 'right' }}>
                            <ButtonToolbar>
                                <Button bsStyle="primary"
                                    className="glyphicon glyphicon-plus"
                                    onClick={() => this.onAddClick()}>
                                    Add
                            </Button>
                                <Button bsStyle="primary"
                                    className="glyphicon glyphicon-th-list"
                                    onClick={() => this.onTableClick()}>
                                    DataTable
                            </Button>
                            </ButtonToolbar>
                        </div>
                    </div>
                    <div>
                        <CourseList courses={courses} />
                    </div>
                </div>
            );
    }
}

// CoursesPage.propTypes = {
//     courses: PropTypes.array.isRequired
// };

function mapStateToProps(state) {
    return {
        courses: state.courses
    };
}

export default connect(mapStateToProps)(Home);
