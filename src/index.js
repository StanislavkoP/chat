import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'; 
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import authReducer from './state/reducer/auth';

import App from './App';

import './index.css';

const rootReducer = authReducer;

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

console.log(store.getState());


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
