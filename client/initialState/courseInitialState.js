import Immutable from 'immutable';

export default {
    courses: Immutable.fromJS({
        coursesList: [],
        isLoading: true,
        activePage: 1,
        count: 0,
        coursesPerPage: 5,
        course: [
            {
                key: 'Id',
                value: null,
                title: 'ID',
                type: 'text',
                dataType: 'number',
                validationException: '',
                required: true,
                enable: false
            },
            {
                key: 'title',
                value: '', title: 'Title',
                type: 'text',
                dataType: 'string',
                validationException: '',
                required: true,
                enable: true
            },
            {
                key: 'authorId',
                value: '', title: 'Author',
                type: 'dropdown',
                dataType: 'number',
                validationException: '',
                required: true,
                enable: true
            },
            {
                key: 'category',
                value: '', title: 'Category',
                type: 'text',
                dataType: 'string',
                validationException: '',
                required: true,
                enable: true
            },
            {
                key: 'length',
                value: '', title: 'Length',
                type: 'text',
                dataType: 'number',
                validationException: ':',
                required: true,
                enable: true
            }
        ]
    })
};