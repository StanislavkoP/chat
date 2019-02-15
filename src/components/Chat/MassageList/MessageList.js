import React from 'react'

import MessageItem from './MessageItem/MessageItem';

function MessageList (props) {
    const {
        messageListRef,
        messages,
        idCurrentUser

    } = props;

    return (
        <div ref={ messageListRef } className="ui comments messageList">
            {
                messages.map(message => (
                    <MessageItem
                        key={ message._id }
                        authorName={ message.author }
                        text={ message.text }
                        userAvatar={ message.avatar }
                        idAuthorMessage={ message.authorId }
                        idCurrentUser={ idCurrentUser }
                    />
                ))
            }
        </div>
    )
}

export default MessageList;
