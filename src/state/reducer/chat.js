import * as actionTypes from '../action/actionTypes';

const initialState = {
    messages : []
}

const getLastMessagesSuccess = (state, action) => ({
    ...state,
    messages: action.lastMessages
});

const addNewMessage = (state, action) => ({
    ...state,
    messages: [
        ...state.messages,
        action.newMessage
    ]
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_LAST_MESSAGES_SUCCESS : return getLastMessagesSuccess(state, action);

        case actionTypes.ADD_NEW_MESSAGE : return addNewMessage(state, action)

        default: return state;
    }

}

export default reducer;