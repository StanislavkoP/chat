import React from 'react';

import './GroupInputField.css'

function GroupInputField (props) {
    const {
        value, label, type, name, placeholder, inputWithError, error, nameErrorField, onChangeInput, userIsTyping} = props
    
    let classError = '';
    let hasFieldError = false;
    let nameFieldWithError = null;

    if( inputWithError ) {
        nameFieldWithError = error[nameErrorField];
        hasFieldError = nameFieldWithError ? true : false
        classError = hasFieldError ? 'error': null;
    
    }
    
    return (
        <div className={`field ${classError}`}>
            <label>{ label }</label>
            <input
                type={ type } 
                name={ name }
                value={value} 
                placeholder={ placeholder }
                onChange={ onChangeInput }
                onKeyPress={ userIsTyping } 
            />
            {
                hasFieldError && inputWithError
                ? <span className="errorMessage">{ inputWithError ? nameFieldWithError.message : null }</span>
                : null
            }
            
        </div>
    )
}

export default GroupInputField;