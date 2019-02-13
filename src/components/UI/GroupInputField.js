import React from 'react';

import './GroupInputField.css'

function GroupInputField (props) {
    const {label, type, name, placeholder, error, nameErrorField, onChangeInput, userIsTyping} = props
    
    const nameFieldWithError = error[nameErrorField];
    
    const hasFieldError = nameFieldWithError ? true : false
    const classError = hasFieldError ? 'error': null;


    return (
        <div className={`field ${classError}`}>
            <label>{ label }</label>
            <input
                type={ type } 
                name={ name } 
                placeholder={ placeholder }
                onChange={ onChangeInput }
                onKeyPress={ userIsTyping } 
            />
            {
                hasFieldError
                ? <span className="errorMessage">{ nameFieldWithError.message }</span>
                : null
            }
            
        </div>
    )
}

export default GroupInputField;