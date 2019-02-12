import React from 'react';

function GroupInputField (props) {
    const {label, type, name, placeholder, onChangeInput} = props

    return (
        <div className="field">
            <label>{ label }</label>
            <input
                type={ type } 
                name={ name } 
                placeholder={ placeholder }
                onChange={ onChangeInput } 
            />
         </div>
    )
}

export default GroupInputField;