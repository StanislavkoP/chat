import * as actionTypes from '../action/actionTypes';

const initialState = {
    userData : {}
}

const getDataCurrentProfileSuccess = (state, action) => ({
    ...state,
    userData: action.userData
});

const updateDataCurrentProfileSuccess = (state, action) => ({
    ...state,
    userData: {
        ...state.userData,
        ...action.newDataUser
    }
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_DATA_CURRENT_PROFILE_SUCCESS : return getDataCurrentProfileSuccess(state, action);

        case actionTypes.UPDATE_DATA_CURRENT_PROFILE_SUCCESS : return updateDataCurrentProfileSuccess(state, action);

        default: return state;
    }

}

export default reducer;