import Immutable from 'immutable';

export default {
    courses: Immutable.fromJS({
        coursesList: [],
        course: [
            { key: 'Id', value: null, title: 'ID', type: 'text', dataType: 'number', required: true, enable: false},
            { key: 'title', value: '', title: 'Title', type: 'text', dataType: 'string', required: true, enable: true },
            { key: 'authorId', value: '', title: 'Author', type: 'dropdown', dataType: 'number', required: true, enable: true },
            { key: 'category', value: '', title: 'Category', type: 'text', dataType: 'string', required: true, enable: true },
            { key: 'length', value: '', title: 'Length', type: 'text', dataType: 'number', required: true, enable: true}
        ]
    })
};