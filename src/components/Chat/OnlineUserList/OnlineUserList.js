import React from 'react';
import PropTypes from 'prop-types';

import OnlineUserItem from './OnlineUserItem/OnlineUserItem';

OnlineUserList.propTypes = {
    onlineUsers: PropTypes.array,
    idCurrentUser: PropTypes.string,
}

function OnlineUserList (props) {
    const {
        onlineUsers,
        idCurrentUser,

    } = props;

    return (
        <div className="online-users">
            <div className="ui feed users__list">
                {
                    onlineUsers.map(user => {
                        if (user.id === idCurrentUser) return null

                        return (
                            <OnlineUserItem
                                key={user.id}
                                
                                userName={ user.name }
                                userAvatar={ user.avatar }
                            />
                        )
                    })
                }
            </div>
        </div>
    )
};

export default OnlineUserList;