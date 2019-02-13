import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import * as actions from '../../state/action/index'

import './Auth.css'

import GroupInputField from '../../components/UI/GroupInputField';

class Auth extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            controls : {
                userName: '',
                userEmail: '',
                userPassword: '',
            },
            registration: false,
            errors: {},
        }

        this.onSwitchAuth = this.onSwitchAuth.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    static getDerivedStateFromProps (props, state) {
        if(!state.errors) {
            return {
                ...state,
                errors: props.errors
            }
        } else {
            return null
        }
    }

    onSwitchAuth () {
        this.setState((prevState) => {
            return {
                registration: !prevState.registration
            }
        })
    }

    onChangeInput (e) {
        const inputName = e.target.name;
        const inputValue = e.target.value;

        const updatedInput = {
            ...this.state.controls,
            [inputName]: inputValue,
        }

        this.setState({controls: updatedInput})
    }

    onSubmitForm (e) {
        e.preventDefault();

        const {userName, userEmail, userPassword} = this.state.controls;

        const userDataForRegistration = {
            name: userName,
            email: userEmail,
            password: userPassword,
        }

        const userDataForLogIn = {
            email: userEmail,
            password: userPassword,
        }

        if (this.state.registration) {
            this.props.onRegistration(userDataForRegistration);

        } else {

            this.props.onLogIn(userDataForLogIn, this.props.history)
        }
        
        
    }
    
    render () {
        const { registration } = this.state;
        const { isAuth, errors } = this.props;

        if (isAuth) {
            return (
                <Redirect to="/" />
            )
        }

        return (
            <div className="ui container">
                <div className="auth">
                    <h1>
                        {
                            registration ? 'Registration' : 'Log In'
                        }
                    </h1>
                    <form className="ui form">
                        {
                            registration 
                            ? <GroupInputField 
                                type="text"
                                value={ this.state.controls.userName }
                                label="Name" 
                                name="userName" 
                                placeholder="Name"  
                                error={errors} 
                                nameErrorField='name' 
                                onChangeInput={ this.onChangeInput }
                            /> 
                            : null
                        }
                        
                        <GroupInputField 
                            type="text"
                            value={ this.state.controls.userEmail }
                            label="Email" 
                            name="userEmail" 
                            placeholder="Email" 
                            error={errors} 
                            nameErrorField='email' 
                            onChangeInput={ this.onChangeInput } 
                        />

                        <GroupInputField 
                            type="password"
                            value={ this.state.controls.userPassword }
                            label="Password" 
                            name="userPassword" 
                            placeholder="Password" 
                            error={errors} 
                            nameErrorField='password' 
                            onChangeInput={ this.onChangeInput }
                        />

                        <button className="ui button primary" type="submit" onClick={this.onSubmitForm}>Submit</button>
                        <button 
                            className="ui button green" 
                            type="button"
                            onClick={ this.onSwitchAuth }
                        >
                            {
                                !registration ? 'Registration' : 'Log In'
                            }
                        </button>

                    </form>
                </div>
            </div>

        )
        
    }
};

const mapStateToProps = (state) => ({
    isAuth: state.isAuth,
    loading: state.loading,
    errors: state.errors,
});

const mapDispatchToProps = (dispatch) => ({
    onRegistration: (userData) => dispatch( actions.onRegistration(userData) ),
    onLogIn: (userData, withRouter) => dispatch( actions.onLogIn(userData, withRouter) )
})

export default connect(mapStateToProps, mapDispatchToProps)( withRouter(Auth));