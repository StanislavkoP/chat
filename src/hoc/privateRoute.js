import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

PrivateRoute.propTypes = {
	isAuth: PropTypes.bool,
	component: PropTypes.element,
}

const PrivateRoute = ({component: Component, isAuth, ...rest}) => (
	<Route 
		{...rest}
		
		render = { props => 
            isAuth === true
			?
				( <Component {...props}/> )
			:
                ( <Redirect to="/auth"/> )
            
		}
/>
);

const mapStateToProps = state => ({
    isAuth: state.authReducer.isAuth
})

export default connect(mapStateToProps)(PrivateRoute)