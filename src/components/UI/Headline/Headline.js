import React from 'react';
import PropTypes from 'prop-types';

import './Headline.css';

Headline.propTypes = {
    typeHeadline: PropTypes.string,
    className: PropTypes.string,
}

function Headline (props) {
    const {
        typeHeadline,
        className,
        
    } = props;

    return React.createElement(
            typeHeadline,
            {
                className: `headline ${ className }`
            },
            props.children
        )
}

export default Headline;
