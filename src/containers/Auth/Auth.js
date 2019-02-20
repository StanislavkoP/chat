import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom';
import * as actions from '../../state/action/index'

import './Auth.css'

import GroupInputField from '../../components/UI/GroupInputField';
import Button from '../../components/UI/Button/Button';
class Auth extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            controls : {
                userName: '',
                userEmail: '',
                userPassword: '',
            },
            registrationSwitcher: false,
            registrationSuccess: false,
            errors: {},
        }

        this.onSwitchAuth = this.onSwitchAuth.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    static propTypes = {
        isAuth: PropTypes.bool,
        loading: PropTypes.bool,
        errors: PropTypes.object,

        onRegistration: PropTypes.func,
        onLogIn: PropTypes.func,
    }

    static getDerivedStateFromProps (prevProps, prevState) {
        if ( Object.keys(prevState.errors).length === 0 && Object.keys(prevProps.errors).length > 0) {
            return {
                ...prevState,
                errors: prevProps.errors
            }
        }

        return null
        
    }

    onSwitchAuth () {
        this.setState((prevState) => {
            return {
                controls : {
                    userName: '',
                    userEmail: '',
                    userPassword: '',
                },
                registrationSwitcher: !prevState.registrationSwitcher,
                errors: {}
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

        if (this.state.registrationSwitcher) {
            this.props.onRegistration(userDataForRegistration)
                .then(() => {
                    this.setState((prevState) => {
                        return {
                            ...prevState,
                            registrationSuccess: true,
                            registrationSwitcher: false,
                        }
                    })
                })
            
        } else {
            this.props.onLogIn(userDataForLogIn, this.props.history)

        }
        
        
    }
    
    render () {
        const { registrationSwitcher, registrationSuccess, errors } = this.state;
        const { isAuth, loading } = this.props;

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
                            registrationSwitcher ? 'Registration' : 'Log In'
                        }
                    </h1>
                    <form className="ui form">
                        {
                            registrationSwitcher 
                            ? <GroupInputField 
                                type="text"
                                value={ this.state.controls.userName }
                                label="Name" 
                                name="userName" 
                                placeholder="Name"
                                inputWithError={true} 
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
                            inputWithError={true}
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
                            inputWithError={true}
                            error={errors} 
                            nameErrorField='password' 
                            onChangeInput={ this.onChangeInput }
                        />

                        <Button
                            className={ `primary ${ loading ? 'loading' : '' }` }
                            type="submit" 
                            disabled={ loading } 
                            clicked={ this.onSubmitForm }
                        >
                            Submit
                        </Button>

                        <Button
                            className="green"
                            type="button" 
                            disabled={ loading } 
                            clicked={ this.onSwitchAuth }
                        >
                            { 
                                !registrationSwitcher ? 'Registration' : 'Log In' 
                            }
                        </Button>

                    </form>

                    {
                        registrationSuccess ? 'Registration success' : null
                    }
                </div>
            </div>

        )
        
    }
};

const mapStateToProps = (state) => ({
    isAuth: state.authReducer.isAuth,
    loading: state.authReducer.loading,
    errors: state.authReducer.errors,
    registrationSuccess: state.authReducer.registrationSuccess,
});

const mapDispatchToProps = (dispatch) => ({
    onRegistration: (userData) => dispatch( actions.onRegistration(userData) ),
    onLogIn: (userData, withRouter) => dispatch( actions.onLogIn(userData, withRouter) )
})

export default connect(mapStateToProps, mapDispatchToProps)( withRouter(Auth));