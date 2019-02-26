import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Croper from 'cropperjs';

import settings from '../../defaultSettigs';
import { dataURItoBlob } from '../../utils';

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
            },
            avatar: '',
            isShowedCropPopup: false,
            isFormChanged: false,
        }

        this.fileInput = React.createRef();
        this.refAvatar = React.createRef();

        this.onChangeInput = this.onChangeInput.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.onCutAvatar = this.onCutAvatar.bind(this);
        this.onCancelEditAvatar = this.onCancelEditAvatar.bind(this);
    }

    static propTypes = {
        userData : PropTypes.object,
        
        getDataCurrentProfile: PropTypes.func,
        updateDataCurrentProfile: PropTypes.func,

    }

    static getDerivedStateFromProps (props, state) {
        const propUserDataHasFields = Object.keys(props.userData).length > 0

        if( propUserDataHasFields ) {

            let avatar = state.avatar;
            const userData = {}

            if ( state.controls.userName === '' ) {
                userData.userName = props.userData.name;

            }

            if ( state.avatar === '' ) {
                const imgPath = settings.serverURI + props.userData.avatar;
                avatar = imgPath;
            
            }

            return {
                ...state,
                controls: {
                    ...state.controls,
                    ...userData
                },
                avatar: avatar
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
            userPassword
        
        } = this.state.controls;
        
        let croppedImageBase64 = this._crop.getCroppedCanvas().toDataURL('image/jpeg');
        const userAvatar = dataURItoBlob(croppedImageBase64);

        const newUserData = new FormData()
        newUserData.append('name', userName);
        newUserData.append('password', userPassword)
        newUserData.append('avatar', userAvatar)

        this.props.updateDataCurrentProfile(newUserData);

        this.fileInput.value = '';
        this._crop.destroy();

        this.setState({isFormChanged: false})
    }

    onChangeInput (e) {
        const inputName = e.target.name;
        let inputValue = e.target.value;

        if(inputName === 'userAvatar') {
            inputValue = e.target.files[0];

            let reader = new FileReader();
            reader.readAsDataURL(inputValue);
            reader.onload = (e) => {

                this.refAvatar.current.setAttribute('src', e.target.result);

                this._crop = new Croper(this.refAvatar.current, {
                    zoomable: false,
                    aspectRatio: 16/9
                });
                this.setState({isShowedCropPopup : true})
            }

        return;

        }

        const updatedInput = {
            ...this.state.controls,
            [inputName]: inputValue,
        }

        this.setState({controls: updatedInput, isFormChanged: true});
    }

    onCancelEditAvatar () {
        this.refAvatar.current.setAttribute('src', settings.serverURI + this.props.userData.avatar);
        this.fileInput.value = '';
        this._crop.destroy();
        this.setState({isShowedCropPopup: false});

    }

    onCutAvatar () {
        this._crop.crop();
        let croppedImage = this._crop.getCroppedCanvas().toDataURL("image/png");
        
        this.fileInput.value = '';
        this.setState({avatar: croppedImage, isShowedCropPopup: false, isFormChanged: true})

    }


    render() {
        const { controls, isShowedCropPopup, isFormChanged } = this.state;
        const { loading } = this.props;
        
        return (
            <React.Fragment>
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
                                <img  src={ this.state.avatar } alt={ controls.userName } />
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
                                    refInput={ ref => this.fileInput = ref }
                                    type="file"
                                    label="Your avatar" 
                                    name="userAvatar"
                                    
                                    placeholder="Avatar"
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

                <div className={`ui modal edit-profile__showCrop ${ isShowedCropPopup ? "active" : ''}`}>
                    <div className="image content">
                        <img className="image" ref={this.refAvatar} src="" alt={ controls.userName }/>
                        <div className="description">
                            <Button
                                className={ `green profile__button ${ loading ? 'loading' : '' }` }
                                type="submit"
                                clicked={ this.onCutAvatar }
                            >
                                Cut
                            </Button>

                            <Button
                                className={ `negative profile__button ${ loading ? 'loading' : '' }` }
                                type="submit"
                                clicked={ this.onCancelEditAvatar }
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`ui dimmer modals page ${ isShowedCropPopup ? "active" : ''}`}></div>
    </React.Fragment>
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