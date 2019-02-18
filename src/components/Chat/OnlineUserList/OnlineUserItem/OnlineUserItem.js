import React from 'react';
import PropTypes from 'prop-types';

import settings from '../../../../defaultSettigs';

OnlineUserItem.propTypes = {
    userName: PropTypes.string,
    userAvatar: PropTypes.string,
}

function OnlineUserItem (props) {
    const {
        userName,
        userAvatar

    } = props;

    let avatar = settings.serverURI + userAvatar;
    if (!userAvatar || userAvatar === '' ) {
        avatar = settings.AVATAR_PLACEHOLDER;

    }

    return (
        <div className="event users_item">
            <div className="label">
                <img src={ avatar } alt={ userName } />
            </div>
            <div className="content">
                { userName }
            </div>
        </div>
    )
}

export default OnlineUserItem;