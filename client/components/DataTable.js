import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';

import ImmutableDataGrid from './ImmutableDataTable/index';
import CourseActions from '../actions/actionCreators';

class DataTable extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        let coursesList = this.props.courses.get('coursesList');

        let options = { 
            search: [{
                placeHolder: "Search By Title",
                keys: ['title'],
                querySearch: CourseActions.searchColumnsAsync                
            }],

            /*
                key: is the key for the item
                name: is the name of the column header
                serverSort: this will sort the list in the server and its expecting a async call to that method
                sortOrder: it could be ascending('asc') or descending('desc'). NOTE: It could be only in one column
            */            

            columns: [{
                key: 'Id',
                name: 'ID',
                // serverSort: CourseActions.sortCoursesInServerAsync,
                clientSort: CourseActions.sortCoursesInClient,
                sortOrder: 'asc'
            },
            {
                key: 'title',
                name: 'Title',
                // serverSort: CourseActions.sortCoursesInServerAsync,
                clientSort: CourseActions.sortCoursesInClient
            }]
        };

        /*
            columns: is the configuration of the columns and its name for the header
            dispatch: will pass the dispatch method for the grid to call the actions
            immutableData: will be the list to be displayed in an immutable format.
        */
        return (
            <div className='well'>
                <ImmutableDataGrid
                    options={options}
                    dispatch={this.props.dispatch}
                    immutableData={coursesList} />

            </div>
        );
    }
}


export default connect()(DataTable);