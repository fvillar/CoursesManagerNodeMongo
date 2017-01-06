import React, { Component, PropTypes } from 'react';
import { Table, FormControl, Pagination } from 'react-bootstrap';
import Immutable from 'immutable';

import CourseActions from '../../actions/actionCreators';
import courseInitialState from '../../initialState/courseInitialState';

class ImmutableDataGrid extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState();
        this.filterQuery = {
            page: this.state.page
        };
    }

    initialState() {
        return {
            columns: this.props.options.columns,
            search: (this.props.options.search || undefined),
            page: 1
        };
    }

    filter(data) {
        switch (data.type) {
            case 'sort':
                this.filterQuery['sort'] = {
                    key: data.key,
                    order: data.order
                };
                break;
            case 'search':
                this.filterQuery['search'] = {
                    keys: data.keys,
                    value: data.value
                };
                break;
            case 'paging':
                this.filterQuery['page'] = data.pageNum;
                break;
            default:
                break;
        }

        this.props.dispatch(this.props.options.filter(this.filterQuery));
    }

    handleServerSort(key) {

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

        this.filter({ key: key, order: sortOrder, type: 'sort' }); 

        this.setState(this.state);

    }

    handleClientSort(method, key) {

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

        this.props.dispatch(method(key, sortOrder));

        this.setState(this.state);
    }

    search(i, value) {
        this.filter({ keys: this.state.search[i].keys, value: value, type: 'search' });
    }

    renderSearchFilters() {

        if (!this.state.search) {
            return <span></span>;
        }

        return this.state.search.map((v, i) => {
            return <div key={i} style={{ paddingBottom: '10px', paddingRight: '10px', float: 'left' }}>
                <FormControl onKeyUp={(e) => this.search(i, e.target.value)}
                    style={{ width: '200px' }}
                    type="text" placeholder={v.placeHolder} />
            </div>;
        });
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
                    onClick={() => this.handleServerSort(v.key)}
                    key={i}>

                    {v.name} {sortIcon}

                </th>;
            } else if (v.clientSort) {
                return <th style={{ cursor: 'pointer' }}
                    key={i}
                    onClick={(i) => this.handleClientSort(v.clientSort, v.key)}>

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

    handlePageSelect(pageNum) {
        this.filter({ pageNum: pageNum, type: 'paging' });
        this.setState({ page: pageNum });
    }

    render() {
        let totalNumRecords = this.props.listLength;
        let itemsPerPage = courseInitialState.courses.get('coursesPerPage');
        let totalPages = Math.ceil(totalNumRecords / itemsPerPage);
       
        return (
            <div>
                {this.renderSearchFilters()}
                <Table condensed hover>
                    {this.renderHead()}
                    {this.renderRows()}
                </Table>
                <Pagination
                    style={{ float: 'right', marginTop: '-10px', paddingRight: '13px' }}
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    bsSize="medium"
                    items={totalPages}
                    maxButtons={5}
                    activePage={this.state.page}
                    onSelect={(e) => this.handlePageSelect(e)} />
            </div>
        );
    }
}

//export default connect()(ImmutableDataGrid);

export default ImmutableDataGrid;