import React from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'; 
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import jwt_decode from 'jwt-decode';

import * as actions from './state/action/index';
import authReducer from './state/reducer/auth';
import profileReducer from './state/reducer/profile';
import chatReducer from './state/reducer/chat';

import App from './App';

import './index.css';

const rootReducer = combineReducers({
    authReducer,
    profileReducer,
    chatReducer
});

const configurateStore = (initialState = {}) => {
    const middlewares = [
        thunk
    ];

    const enchansers = [
        applyMiddleware(...middlewares)
    ];

    const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(...enchansers)
    );

    return store;
}

const store = configurateStore({});

if (localStorage.jwtToken) {
    const decodedJwtToken = jwt_decode(localStorage.jwtToken);

    const currentTime = Date.now() / 1000;

    if (decodedJwtToken.exp < currentTime) {
        localStorage.removeItem('jwtToken')
        store.dispatch( actions.clearCurrentProfile() )
    
    } else {
        store.dispatch( actions.onLogInSuccess(decodedJwtToken) )
    }
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
