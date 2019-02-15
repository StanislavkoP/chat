import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

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