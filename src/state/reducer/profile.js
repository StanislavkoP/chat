import * as actionTypes from '../action/actionTypes';

const initialState = {
    userData : {},
    isError: false,
    loading: true
}

const getDataCurrentProfileInit = (state, action) => ({
    ...state,
    loading: true,
});

const getDataCurrentProfileSuccess = (state, action) => ({
    ...state,
    userData: action.userData,
    loading: false,
});

const getDataCurrentProfileFailed = (state, action) => ({
    ...state,
    isError: true,
    loading: false,
});

const updateDataCurrentProfileInit = (state, action) => ({
    ...state,
    loading: true,
});

const updateDataCurrentProfileSuccess = (state, action) => ({
    ...state,
    userData: {
        ...state.userData,
        ...action.newDataUser
    },
    loading: false,
    isError: false,
});

const updateDataCurrentProfileFailed = (state, action) => ({
    ...state,
    isError: true,
    loading: false,
    
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_DATA_CURRENT_PROFILE_INIT : return getDataCurrentProfileInit(state, action);
        case actionTypes.GET_DATA_CURRENT_PROFILE_SUCCESS : return getDataCurrentProfileSuccess(state, action);
        case actionTypes.GET_DATA_CURRENT_PROFILE_FAILED : return getDataCurrentProfileFailed(state, action);
        
        case actionTypes.UPDATE_DATA_CURRENT_PROFILE_INIT : return updateDataCurrentProfileInit(state, action);
        case actionTypes.UPDATE_DATA_CURRENT_PROFILE_SUCCESS : return updateDataCurrentProfileSuccess(state, action);
        case actionTypes.UPDATE_DATA_CURRENT_PROFILE_FAILED : return updateDataCurrentProfileFailed(state, action);

        default: return state;
    }

}

export default reducer;