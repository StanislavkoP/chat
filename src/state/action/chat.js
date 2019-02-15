import axios from '../../axiosDefault';
import * as actionTypes from './actionTypes';


const getLastMessagesSuccess = (messages) => ({
    type: actionTypes.GET_LAST_MESSAGES_SUCCESS,
    lastMessages: messages
});

export const getLastMessages = () => dispatch => {
    axios({
        method: 'get',
        url: '/messages',
        headers: {'x-access-token': 'bearer ' + localStorage.jwtToken}
    })
    .then(response => {
        const messages = response.data.messages;
        dispatch( getLastMessagesSuccess(messages) )

    })
    .catch(err => {
        console.log(err);
    })
};

export const addNewMessage = message => dispatch => {
    dispatch({
        type: actionTypes.ADD_NEW_MESSAGE,
        newMessage: message
    })
}