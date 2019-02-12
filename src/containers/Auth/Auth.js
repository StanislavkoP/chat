import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../state/action/index'

import './Auth.css'

import GroupInputField from '../../components/UI/GroupInputField';

class Auth extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            registration: true
        }

        this.onSwitchAuth = this.onSwitchAuth.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onRegistration = this.onRegistration.bind(this);
    }

    onSwitchAuth () {
        this.setState((prevState) => {
            return {
                registration: !prevState.registration
            }
        })
    }

    onChangeInput (e) {
        console.log(e.target.name);
    }

    onRegistration (e) {
        e.preventDefault();
        this.props.onRegistration();
        console.log(this.props);
    }
    
    render () {
        const { registration } = this.state

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
                            ? <GroupInputField type="text" label="Name" name="userName" placeholder="Name" onChangeInput={ this.onChangeInput }/> 
                            : null
                        }
                        
                        <GroupInputField type="text" label="Email" name="userEmail" placeholder="Email" onChangeInput={ this.onChangeInput } />

                        <GroupInputField type="password" label="Password" name="userPassword" placeholder="Password" onChangeInput={ this.onChangeInput }/>

                        <button className="ui button primary" type="submit" onClick={this.onRegistration}>Submit</button>
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
    loading: state.loading
});

const mapDispatchToProps = (dispatch) => ({
    onRegistration: () => dispatch( actions.onRegistration() )
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth);