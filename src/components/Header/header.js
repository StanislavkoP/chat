import React from 'react';
import {NavLink} from 'react-router-dom';

import './header.css';

function Header(props) {
    return (
        <header className="main-header">
            <div className="ui container">
                <nav className="main-header__nav">
                    <ul className="main-header__nav-list">
                        <li className="main-header__nav-item">
                            <NavLink className="main-header__nav-link" to="/profile" activeClassName="active">Profile</NavLink>
                        </li>
                        
                        <li className="main-header__nav-item">
                            <NavLink className="main-header__nav-link" to="/chat" activeClassName="active">Chat</NavLink>
                        </li>
                    </ul>  
                </nav>
            </div> 
        </header>
    )
}

export default Header;
