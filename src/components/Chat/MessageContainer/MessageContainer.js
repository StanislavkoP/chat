import React from 'react';
import PropTypes from 'prop-types';

import MessageList from '../MassageList/MessageList';
import MessageControls from '../MessageControls/MessageControls';

MessageContainer.propTypes = {
    messageListRef: PropTypes.func,
    messages: PropTypes.array,
    idCurrentUser: PropTypes.string,
    anotherUser: PropTypes.object,
    userMessage: PropTypes.string,

    onChangeInput: PropTypes.func,
    sendMessage: PropTypes.func,

}

function MessageContainer (props) {
    const {
        messageListRef,
        messages,
        idCurrentUser,
        anotherUser,
        userMessage,

        onChangeInput,
        sendMessage,
    
    } = props;

    return (
        <div className="messageList-container">
                                
            <MessageList
                messageListRef={ messageListRef }
                messages={ messages }
                idCurrentUser={ idCurrentUser }
            />


            <div className="messageList-container__typing">
                {
                    anotherUser.isTypingMessage
                    ? <span>{ anotherUser.userName } is typing</span>
                    : null
                }
            </div>

            <MessageControls
                userMessage={ userMessage }
                onChangeInput={ onChangeInput }
                sendMessage={ sendMessage }
            />

        </div>
    )
}

export default MessageContainer;
