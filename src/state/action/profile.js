import axios from '../../axiosDefault';
import * as actionTypes from './actionTypes';

const getDataCurrentProfileInit = (userData) => ({
    type: actionTypes.GET_DATA_CURRENT_PROFILE_INIT,
})

const getDataCurrentProfileSuccess = (userData) => ({
    type: actionTypes.GET_DATA_CURRENT_PROFILE_SUCCESS,
    userData
});

const getDataCurrentProfileFailed = () => ({
    type: actionTypes.GET_DATA_CURRENT_PROFILE_FAILED,
})

export const getDataCurrentProfile = dispatch => {
    dispatch( getDataCurrentProfileInit() )

    axios({
        method: 'get',
        url: '/profile',
        headers: {'x-access-token': 'bearer ' + localStorage.jwtToken}
    })
    .then(response => {
        const userData = response.data.data;

        dispatch( getDataCurrentProfileSuccess(userData) )

    })
    .catch(err => {
        console.log(err);
        dispatch( getDataCurrentProfileFailed() )
    })
};

const updateDataCurrentProfileInit = () => ({
    type: actionTypes.UPDATE_DATA_CURRENT_PROFILE_INIT,
});

const updateDataCurrentProfileSuccess = newDataUser => ({
    type: actionTypes.UPDATE_DATA_CURRENT_PROFILE_SUCCESS,
    newDataUser
});

const updateDataCurrentProfileFailed = () => ({
    type: actionTypes.UPDATE_DATA_CURRENT_PROFILE_FAILED,
});

export const updateDataCurrentProfile = newDataUser => dispatch => {
    dispatch( updateDataCurrentProfileInit() )

    axios({
        method: 'put',
        url: '/profile',
        headers: {
            'x-access-token': 'bearer ' + localStorage.jwtToken,
            'Content-Type': 'form-data'
        },
        data: newDataUser

    })
    .then(response => {

        dispatch( updateDataCurrentProfileSuccess(newDataUser) )

    })
    .catch(err => {
        console.log(err);
        dispatch( updateDataCurrentProfileFailed() )
    })
};