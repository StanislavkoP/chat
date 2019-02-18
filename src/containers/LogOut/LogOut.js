import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../state/action/index';

export class LogOut extends Component {
    static propTypes = {
        onLogOut: PropTypes.func
    }

    static propTypes = {
        onLogOut: PropTypes.func,

    }

    componentDidMount () {
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

const mapDispatchToProps = dispatch => ({
    onLogOut: () => dispatch( actions.clearCurrentProfile() ),
})

export default connect(null, mapDispatchToProps)(withRouter(LogOut))
