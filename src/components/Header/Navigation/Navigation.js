import React from 'react';
import PropTypes from 'prop-types';

import './Navigation.css';

import NavItem from './NavItem/NavItem';

Navigation.propTypes = {
    isAuth: PropTypes.bool,

}


function Navigation (props) {
    const { isAuth } = props;

    let routes = (
        <NavItem path="/auth">Log In</NavItem>
    );

    if (isAuth) {
        routes = (
            <React.Fragment>
                <NavItem path="/chat" >Chat</NavItem>
                <NavItem path="/profile">Profile</NavItem>
                <NavItem path="/logout">Log Out</NavItem>
            </React.Fragment>
        )
    }

    return (
        <nav className="main-header__nav">
            <ul className="main-header__nav-list">
                {
                    routes
                }
            </ul> 
        </nav>
    )
}

export default Navigation;


