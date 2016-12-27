import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { browserHistory, Link } from 'react-router';

const navbarMenu = () => {
    function onHomeClick() {
        browserHistory.push('/');
    }

    function onAddClick() {
        browserHistory.push('/addCourse');
    }

    function onAboutUsClick() {
        browserHistory.push('/aboutUs');
    }

    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <span onClick={() => onHomeClick()}>Course Manager</span>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <NavItem eventKey={1} onClick={() => onHomeClick()} >Home</NavItem>
                <NavItem eventKey={2} onClick={() => onAddClick()} >Add</NavItem>
                <NavItem eventKey={3} onClick={() => onAboutUsClick()} >About Us</NavItem>
            </Nav>
        </Navbar>
    );
};

export default navbarMenu;
