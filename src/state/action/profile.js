import axios from '../../axiosDefault';
import * as actionTypes from './actionTypes';


const getDataCurrentProfileSuccess = (userData) => ({
    type: actionTypes.GET_DATA_CURRENT_PROFILE_SUCCESS,
    userData
})

export const getDataCurrentProfile = dispatch => {
    axios({
        method: 'get',
        url: '/profile',
        headers: {'x-access-token': 'bearer ' + localStorage.jwtToken}
    })
    .then(response => {
        const userData = response.data.data;
        console.log(userData);
        dispatch( getDataCurrentProfileSuccess(userData) )

    })
    .catch(err => {
        console.log(err);
    })
};

const updateDataCurrentProfileSuccess = newDataUser => ({
    type: actionTypes.UPDATE_DATA_CURRENT_PROFILE_SUCCESS,
    newDataUser
});

export const updateDataCurrentProfile = newDataUser => dispatch => {
    console.log(newDataUser);
    debugger;
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
        console.log(response);
        dispatch( updateDataCurrentProfileSuccess(newDataUser) )

    })
    .catch(err => {
        console.log(err);
    })
};