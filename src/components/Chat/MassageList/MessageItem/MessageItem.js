import React from 'react';
import PropTypes from 'prop-types';

import settings from '../../../../defaultSettigs';

import './MessageItem.css';

MessageItem.propTypes = {
    authorName: PropTypes.string,
    text: PropTypes.string,
    userAvatar: PropTypes.string,
    idAuthorMessage: PropTypes.string,
    idCurrentUser: PropTypes.string,

}

function MessageItem (props) {
    const {
        authorName,
        text,
        userAvatar,
        idAuthorMessage,
        idCurrentUser,

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
            <div className="messageList__item-avatar avatar">
                <img src={ avatar } alt={ authorName } />
            </div>
            <div className="content">
                <span className="author">{ authorName }</span>
                <div className="text">
                    { text }
                </div>
            </div>
        </div>
    )
};

export default MessageItem;