import React, { Component, PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import Immutable from 'immutable';

import CourseActions from '../../actions/actionCreators';

class ImmutableDataGrid extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState();
    }

    initialState() {
        return {
            columns: this.props.options.columns,
            // sortType: 'client' //server
        };
    }

    handleServerSort(method, key) {

        let sortOrder;
        this.state.columns.forEach((v, i) => {
            if (v.key === key) {
                if (!v.sortOrder) {
                    sortOrder = 'asc';
                    this.state.columns[i].sortOrder = 'asc';
                } else {
                    if (v.sortOrder == 'asc') {
                        sortOrder = 'desc';
                        this.state.columns[i].sortOrder = 'desc';
                    } else {
                        sortOrder = 'asc';
                        this.state.columns[i].sortOrder = 'asc';
                    }
                }
            } else {
                delete this.state.columns[i].sortOrder;
            }
        });

        this.props.dispatch(method({ key: key, order: sortOrder }));

        this.setState(this.state);

    }

    handleClientSort(key) {

        let sortOrder;
        this.state.columns.forEach((v, i) => {
            if (v.key === key) {
                if (!v.sortOrder) {
                    sortOrder = 'asc';
                    this.state.columns[i].sortOrder = 'asc';
                } else {
                    if (v.sortOrder == 'asc') {
                        sortOrder = 'desc';
                        this.state.columns[i].sortOrder = 'desc';
                    } else {
                        sortOrder = 'asc';
                        this.state.columns[i].sortOrder = 'asc';
                    }
                }
            } else {
                delete this.state.columns[i].sortOrder;
            }
        });

        this.props.dispatch(CourseActions.sortCoursesInClient(key, sortOrder));

        this.setState(this.state);
    }

    renderHead() {
        
        let columns = this.state.columns.map((v, i) => {
            let sortIcon = '';

            if (v.sortOrder) {
                if (v.sortOrder == 'asc') {
                    sortIcon = '↑';
                } else {
                    sortIcon = '↓';
                }
            }

            if (v.serverSort) {
                return <th style={{ cursor: 'pointer' }}
                    onClick={(i) => this.handleServerSort(v.serverSort, v.key)}
                    key={i}>

                    {v.name} {sortIcon}

                </th>;
            } else if (v.clientSort) {
                return <th style={{ cursor: 'pointer' }}
                    key={i}
                    onClick={(i) => this.handleClientSort(v.key)}>

                    {v.name} {sortIcon}

                </th>;
            } else {
                return <th key={i}> {v.name} </th>;
            }
        });

        return (
            <thead>
                <tr>
                    {columns}
                </tr>
            </thead>
        );
    }

    renderRows() {

        let rows = this.props.immutableData.map((r, i) => {
            let dataCells = this.props.options.columns.map((d, index) => {
                return <td key={index}>{r.get(d.key)}</td>;
            });
            return <tr key={i}>{dataCells}</tr>;
        });

        return (
            <tbody>
                {rows}
            </tbody>
        );
    }

    render() {
        return (
            <Table striped bordered condensed hover>
                {this.renderHead()}
                {this.renderRows()}
            </Table>
        );
    }

}

//export default connect()(ImmutableDataGrid);

export default ImmutableDataGrid;