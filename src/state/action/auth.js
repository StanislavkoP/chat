import * as actionTypes from './actionTypes';
import axios from '../../axiosDefault';
import jwt_decode from 'jwt-decode';

const onRegistrationInit = () => ({
    type: actionTypes.ON_REGISTRATION_INIT
});

const onRegistrationSuccess = () => ({
    type: actionTypes.ON_REGISTRATION_SUCCESS
})

const onRegistrationFailed = (errors) => ({
    type: actionTypes.ON_REGISTRATION_FAILED,
    errors
})

export const onRegistration = (userData) => dispatch => {
    dispatch( onRegistrationInit() );
    console.log(userData)
    axios
        .post('/registration', userData)
        .then(data => {
            //TODO: check this late
            if(!data) {
                return
            }

            const isRegistered = data.status === 200
            
            if(isRegistered) {
                console.log('Registered success');
                dispatch( onRegistrationSuccess() );
            }
        })
        .catch(err => {
            const response = err.response;
            console.log(response);

            const isNotValidatedFields = response.status === 400;

            if(isNotValidatedFields) {
                const errors = response.data.errors;
                dispatch( onRegistrationFailed(errors) );

            }
            
        })

    
};

const onLogInInit = () => ({
    type: actionTypes.ON_LOG_IN_INIT
});

export const onLogInSuccess = (decodedJwtToken) => {
    const {_id, email, name, avatar} = decodedJwtToken.profile;

    return {
        type: actionTypes.ON_LOG_IN_SUCCESS,
        user: {
            id: _id,
            name,
            email,
            avatar,
        }
    }
}

const onLogInFailed = (errors) => ({
    type: actionTypes.ON_LOG_IN_FAILED,
    errors
})

export const onLogIn = (userData, withRouter) => dispatch => {
    dispatch( onLogInInit() );
    
    axios
        .post('/authentication', userData)
        .then(response => {
            const jwtToken = response.data.token;
            const decodedJwtToken = jwt_decode(jwtToken)

            localStorage.setItem('jwtToken', jwtToken);

            dispatch( onLogInSuccess(decodedJwtToken) )
            
            withRouter.push('/chat')

        })
        .catch(err => {
            console.log(err)
            const response = err.response;
            const errors = response.data.errors;
            
            dispatch( onLogInFailed(errors) )

            console.log(response);
        })
};

export const clearCurrentProfile = () => ({
    type: actionTypes.CLEAR_CURRENT_PROFILE
})