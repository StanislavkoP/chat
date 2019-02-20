import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import settings from '../../defaultSettigs';

import * as actions from '../../state/action/index';

import './Profile.css'

export class Profile extends Component {

    static propTypes = {
        userData: PropTypes.object,

        getDataCurrentProfile: PropTypes.func,
    }

    componentDidMount () {
        this.props.getDataCurrentProfile()
    }

    render() {
        const { userData, loading, isError } = this.props;

        let avatarURL = settings.serverURI + userData.avatar;
        if ( userData.avatar === '' || (typeof userData.avatar === 'undefined') ) {
            avatarURL = settings.AVATAR_PLACEHOLDER;

        }

        let profileContent = (
                <div className="profile">
                    <div className="ui four column centered grid">
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
        )
        
        if (loading) {
            profileContent = (
                <div className="ui segment">
                    <div className="ui active dimmer">
                        <div className="ui text loader large">Loading</div>
                    </div>
                    <p></p>
                </div>
            )
        }

        if (isError) {
            profileContent = (
                <h2 style={{textAlign: 'center', color: 'red'}}>Something wrong</h2>
            )
        }

        return (
            <div className="ui container profile--wrap">
                <h1 style={{textAlign: 'center', marginTop: '20px'}} >Your profile</h1>
                { profileContent }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userData: state.profileReducer.userData,
    loading: state.profileReducer.loading,
    isError: state.profileReducer.isError
});

const mapDispatchToProps = (dispatch) => ({
    getDataCurrentProfile : () => dispatch( actions.getDataCurrentProfile )

});

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

