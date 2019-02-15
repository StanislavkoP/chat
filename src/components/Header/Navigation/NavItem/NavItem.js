import React from 'react';
import {NavLink} from 'react-router-dom';

import './NavItem.css';

function Navigation (props) {
    const { path } = props;

    return (
        <li className="main-header__nav-item">
            <NavLink 
                className="main-header__nav-link" 
                to={path}
                activeClassName="active"
            >
                { props.children }
            </NavLink>
        </li>
    )
}

export default Navigation;