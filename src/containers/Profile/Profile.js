import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import settings from '../../defaultSettigs';

import * as actions from '../../state/action/index';

import './Profile.css'

export class Profile extends Component {


    componentDidMount () {
        this.props.getDataCurrentProfile()
    }

    render() {
        const { userData } = this.props;

        let avatarURL = settings.serverURI + userData.avatar;
        if ( userData.avatar === '' || (typeof userData.avatar === 'undefined') ) {
            avatarURL = settings.AVATAR_PLACEHOLDER;

        }

        return (
            <div className="profile">
                <div className="ui container">
                    <h1 style={{textAlign: 'center', marginTop: '20px'}} >Your profile</h1>
                    
                    <div className="ui five column centered grid">
                        <div className="column">
                            <div className="profile__avatar">
                                {
                                    <img src={ avatarURL } alt={userData.name}/>

                                }
                            </div>
                        </div>
                        <div className="column">
                            <p>Name: { userData.name }</p>
                            <p>Email: { userData.email }</p>
                        </div>
                    </div>

                    <div className="profile__button-container">
                        <Link className="ui primary button profile__button" to="/editprofile">Edit your profile</Link>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => ({
    userData: state.profileReducer.userData
});

const mapDispatchToProps = (dispatch) => ({
    getDataCurrentProfile : () => dispatch( actions.getDataCurrentProfile )

});

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

