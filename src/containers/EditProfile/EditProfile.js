import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import settings from '../../defaultSettigs';

import * as actions from '../../state/action/index';

import GroupInputField from '../../components/UI/GroupInputField';
import Button from '../../components/UI/Button/Button';
import Headline from '../../components/UI/Headline/Headline';

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
            isFormChanged: false,
        }

        this.onChangeInput = this.onChangeInput.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    static propTypes = {
        userData : PropTypes.object,
        
        getDataCurrentProfile: PropTypes.func,
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

        this.props.updateDataCurrentProfile(newUserData);

        this.setState({isFormChanged: false})
    }

    onChangeInput (e) {
        const inputName = e.target.name;
        let inputValue = e.target.value;

        if(inputName === 'userAvatar') {
            inputValue = e.target.files[0];

        }

        const updatedInput = {
            ...this.state.controls,
            [inputName]: inputValue,
        }

        this.setState({controls: updatedInput, isFormChanged: true});
    }


    render() {
        const { controls, isFormChanged } = this.state;
        const { loading } = this.props;
        
        return (
            <div className="ui container">

                <Headline
                    typeHeadline="h1"
                    className="center white"
                >
                    Edit your profile
                </Headline>

                <div className="edit-profile">
                    <div className="ui three column centered grid">

                        <div className="column">
                            <div className="edit-profile__avatar">
                                <img src={ controls.userAvatar } alt={ controls.userName } />
                            </div>
                        </div>

                        <div className="column">
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
                                
                                <Button
                                    className={ `green profile__button ${ loading ? 'loading' : '' }` }
                                    type="submit"
                                    clicked={ this.onSubmitForm }
                                    disabled={ !isFormChanged }
                                >
                                    Update
                                </Button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userData: state.profileReducer.userData,
    loading: state.profileReducer.loading,
})

const mapDispatchToProps = (dispatch) => ({
    getDataCurrentProfile : () => dispatch( actions.getDataCurrentProfile ),
    updateDataCurrentProfile : (newUserData) => dispatch( actions.updateDataCurrentProfile(newUserData) ),

});


export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)