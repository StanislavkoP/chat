import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { socket } from '../Chat';

import * as actions from '../../state/action/index';

export class LogOut extends Component {
    static propTypes = {
        onLogOut: PropTypes.func
    }

    static propTypes = {
        onLogOut: PropTypes.func,

    }

    componentDidMount () {

        if (socket) {
            socket.emit('userDisconnected', this.props.user.id);
        }
        
        

        localStorage.removeItem('jwtToken');
        this.props.onLogOut();
        this.props.history.push('/');
        
    }

    render() {
        return (
            <div>
                LogOut
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.authReducer.user
})

const mapDispatchToProps = dispatch => ({
    onLogOut: () => dispatch( actions.clearCurrentProfile() ),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LogOut))
