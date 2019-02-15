import React from 'react';

import settings from '../../../../defaultSettigs';

import './MessageItem.css';

function MessageListItem (props) {
    const {
        authorName,
        text,
        userAvatar,
        idAuthorMessage,
        idCurrentUser

    } = props;

    const isMessageFromCurrentUser = idAuthorMessage === idCurrentUser;
    
    let classForMessage = 'left';
    if ( isMessageFromCurrentUser ) {
        classForMessage = 'right';

    };

    let avatar = settings.serverURI + userAvatar;
    if (!userAvatar || userAvatar === '' ) {
        avatar = settings.AVATAR_PLACEHOLDER;

    };

    return (
        <div className={ `messageList__item comment ${classForMessage}` }>
            <a className="messageList__item-avatar avatar">
                <img src={ avatar } />
            </a>
            <div className="content">
                <a className="author">{ authorName }</a>
                <div className="text">
                    { text }
                </div>
            </div>
        </div>
    )
};

export default MessageListItem