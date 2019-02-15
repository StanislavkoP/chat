import React from 'react'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import Header from '../components/Header/header';



function Layout (props) {
    const {isAuth} = props;

    return (
        <React.Fragment>
            <Header isAuth={isAuth}/>
            { props.children }
        </React.Fragment>
    )
};

const mapStateToProps = state => ({
    isAuth: state.authReducer.isAuth
});

export default withRouter(connect(mapStateToProps)(Layout))
