import React from 'react';
import PropTypes from 'prop-types';

import './header.css';

import Navigation from './Navigation/Navigation';

Header.propTypes = {
    isAuth: PropTypes.bool,

}

function Header (props) {
    const { isAuth } = props;

    return (
        <header className="main-header">
            <div className="ui container">
                <Navigation isAuth={isAuth}/>
            </div> 
        </header>
    )
}

export default Header;
