import * as actionTypes from './actionTypes';

export const onRegistration = () => dispatch => {
    dispatch({type: actionTypes.ON_REGISTRATION_INIT})
};