import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppContainer from './components/AppContainer';
import Home from './components/Home';
import CourseContainer from './components/CourseContainer';
import AboutUs from './components/AboutUs';
import DataTableContainer from './components/DataTableContainer';

export default (
    <Route path="/" component={AppContainer}>
        <IndexRoute component={Home} />
        <Route path="dataTable" component={DataTableContainer} />
        <Route path="addCourse" component={CourseContainer} />
        <Route path="updateCourse" component={CourseContainer} />
        <Route path="aboutUs" component={AboutUs} />
    </Route>
);