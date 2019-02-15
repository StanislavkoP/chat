import React from 'react';

import './header.css';

import Navigation from './Navigation/Navigation';

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
