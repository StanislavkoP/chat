import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

PrivateRoute.propTypes = {
	isAuth: PropTypes.bool,
	Component: PropTypes.element,
}

function PrivateRoute ({component: Component, isAuth, ...rest}) {
	
	return (
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
	)

};

const mapStateToProps = state => ({
    isAuth: state.authReducer.isAuth
})

export default connect(mapStateToProps)(PrivateRoute)