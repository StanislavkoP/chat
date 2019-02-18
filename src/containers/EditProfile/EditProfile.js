import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import settings from '../../defaultSettigs';

import * as actions from '../../state/action/index';

import GroupInputField from '../../components/UI/GroupInputField';

import './EditProfile.css';

export class EditProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            controls : {
                userName: '',
                userPassword: '',
                userAvatar: ''
            },
        }

        this.onChangeInput = this.onChangeInput.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    static propTypes = {
        userData : PropTypes.object,
        
        updateDataCurrentProfile: PropTypes.func,
        updateDataCurrentProfile: PropTypes.func,

    }

    static getDerivedStateFromProps (props, state) {
        const propUserDataHasFields = Object.keys(props.userData).length > 0

        if( propUserDataHasFields ) {

            const userData = {}

            if ( state.controls.userName === '' ) {
                userData.userName = props.userData.name;

            }

            if ( state.controls.userAvatar === '' ) {
                const imgPath = settings.serverURI + props.userData.avatar;
                userData.userAvatar = imgPath;
            
            }

            return {
                ...state,
                controls: {
                    ...state.controls,
                    ...userData
                }
            }
        }

        return null
    }

    componentDidMount () {
        if (Object.keys(this.props.userData).length === 0 ) {
            this.props.getDataCurrentProfile()
            
        }
    }

    onSubmitForm (e) {
        e.preventDefault();
        
        const { 
            userName,
            userAvatar,
            userPassword
        
        } = this.state.controls;

        const newUserData = new FormData()
        newUserData.append('name', userName);
        newUserData.append('password', userPassword)
        newUserData.append('avatar', userAvatar)

        this.props.updateDataCurrentProfile(newUserData)
    }

    onChangeInput (e) {
        const inputName = e.target.name;
        let inputValue = e.target.value;

        if(inputName === 'userAvatar') {
            inputValue = e.target.files[0];
            console.log(inputValue.name)
        }

        const updatedInput = {
            ...this.state.controls,
            [inputName]: inputValue,
        }

        this.setState({controls: updatedInput})
    }


    render() {
        const {controls} = this.state;
        
        return (
            <div className="ui container">
                <h1>Editing profile</h1>

                <form className="ui form">
                    <GroupInputField 
                        type="text"
                        value={ controls.userName }
                        label="Name" 
                        name="userName" 
                        placeholder="Name"  
                        onChangeInput={ this.onChangeInput }
                    /> 

                    <GroupInputField 
                        type="password"
                        value={ controls.userPassword }
                        label="Password" 
                        name="userPassword" 
                        placeholder="Password"
                        onChangeInput={ this.onChangeInput }
                    />

                    <GroupInputField 
                        type="file"
                        label="Your avatar" 
                        name="userAvatar" 
                        placeholder=""
                        onChangeInput={ this.onChangeInput }
                    />

                    <div className="edit-profile__avatar">
                        <img src={ controls.userAvatar } alt={ controls.userName } />
                    </div>

                    <button className="ui button green profile__button" type="submit" onClick={this.onSubmitForm}>Update</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userData: state.profileReducer.userData
})

const mapDispatchToProps = (dispatch) => ({
    getDataCurrentProfile : () => dispatch( actions.getDataCurrentProfile ),
    updateDataCurrentProfile : (newUserData) => dispatch( actions.updateDataCurrentProfile(newUserData) ),

});


export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)