import * as actionTypes from '../action/actionTypes';


const initialState = {
    isAuth: false,
    loading: false
}

const onRegistretionInit = (state, action) => ({
    ...state,
    loading: !state.loading
});

const reducer = (state = initialState, action) => {
    console.log(initialState);
    switch (action.type) {
        case actionTypes.ON_REGISTRATION_INIT : return onRegistretionInit(state, action);
        default: return state;
    }

}

export default reducer;