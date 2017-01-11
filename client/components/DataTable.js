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
        let totalNumRecords = this.props.courses.get('count');

        let options = { 
            /* Function that will provide the list with the applied filter (sort, paging, search) */
            filter: CourseActions.filterUsersInServerAsync,
            /*
                keys: is the array of keys where the search is going to be performed 
                placeHolder: is the place holder for the search box
            */
            search: [{
                placeHolder: 'Search By Title/Category',
                keys: ['title','category'],
                value: ''
            }],
            /*
                searchLimit: an array of the number of expected number of results to return
                NOTE: This always need to be set when setting up the search
             */
            searchLimit: [5,10],

            /*
                key: is the key for the item
                name: is the name of the column header
                serverSort: this will sort the list in the server and its expecting a async call to that method
                sortOrder: it could be ascending('asc') or descending('desc'). NOTE: It could be only in one column
            */            

            columns: [{
                key: 'Id',
                name: 'ID',
                serverSort: true,
                // clientSort: CourseActions.sortCoursesInClient,
                sortOrder: 'asc'
            },
            {
                key: 'title',
                name: 'Title',
                serverSort: true,
                // clientSort: CourseActions.sortCoursesInClient
            },
            {
                key: 'authorName',
                name: 'Author Name',
                serverSort: true,
                // clientSort: CourseActions.sortCoursesInClient
            },
            {
                key: 'length',
                name: 'Length',
                serverSort: true,
                // clientSort: CourseActions.sortCoursesInClient
            },
            {
                key: 'category',
                name: 'Category',
                serverSort: true,
                // clientSort: CourseActions.sortCoursesInClient
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
                    immutableData={coursesList} 
                    listLength={totalNumRecords} />

            </div>
        );
    }
}


export default connect()(DataTable);