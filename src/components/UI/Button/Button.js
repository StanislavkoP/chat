import React from 'react';
import PropTypes from 'prop-types';

Button.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    clicked: PropTypes.func,
    children: PropTypes.string,
}

function Button (props) {
    const { 
        className,
        type,
        disabled,
        clicked 
    
    } = props;

    return (
        <button 
            className={ `ui button ${ className }` } 
            type={ type }
            disabled={ disabled }
            onClick={ clicked }
        > 
            { props.children } 
        </button>
    )
}

export default Button;
