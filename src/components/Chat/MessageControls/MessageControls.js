import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../UI/Button/Button';

MessageControls.propTypes = {
    userMessage: PropTypes.string,

    onChangeInput: PropTypes.func,
    sendMessage: PropTypes.func,
}

function MessageControls (props) {
    const {
        userMessage,

        onChangeInput,
        sendMessage,

    } = props;

    return (
        <form className="messageControls form ui">
            <div className="field messageControls__text">
                <label>Text message:</label>
                <textarea
                    className="messageControls__text-field messageControls__text-field--area"
                    type="text" 
                    name="userMessage" 
                    value={ userMessage }
                    placeholder="Message"
                    onChange={ onChangeInput }
                ></textarea>
            </div>

            <Button
                className="primary messageControls__btn"
                type="submit"
                clicked={ sendMessage }
            >
                Send
            </Button>
        </form>
    )
}

export default MessageControls;
