import * as actionTypes from '../action/actionTypes';


const initialState = {
    user: null,
    isAuth: false,
    loading: false,
    errors: {}
}

const onRegistrationInit = (state, action) => ({
    ...state,
    loading: true,
    errors: {}
});

const onRegistrationSuccess = (state, action) => ({
    ...state,
    loading: false,
})

const onRegistrationFailed = (state, action) => ({
    ...state,
    loading: false,
    errors: action.errors,
})

const onLogInInit = (state, action) => ({
    ...state,
    loading: true,
    errors: {}
});

const onLogInSuccess = (state, action) => ({
    ...state,
    user: action.user,
    isAuth: true,
    loading: false,
});

const onLogInFailed = (state, action) => ({
    ...state,
    loading: false,
    errors: action.errors,
});

const clearCurrentProfile = (state, action) => ({
    ...state,
    user: null,
    isAuth: false,
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ON_REGISTRATION_INIT : return onRegistrationInit(state, action);
        case actionTypes.ON_REGISTRATION_SUCCESS : return onRegistrationSuccess(state, action);
        case actionTypes.ON_REGISTRATION_FAILED : return onRegistrationFailed(state, action);

        case actionTypes.ON_LOG_IN_INIT : return onLogInInit(state, action);
        case actionTypes.ON_LOG_IN_SUCCESS : return onLogInSuccess(state, action);
        case actionTypes.ON_LOG_IN_FAILED : return onLogInFailed(state, action);

        case actionTypes.CLEAR_CURRENT_PROFILE : return clearCurrentProfile(state, action);

        default: return state;
    }

}

export default reducer;