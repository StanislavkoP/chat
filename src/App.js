import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import './App.css';

import PrivateRoute from './hoc/privateRoute';

import FrontPage from './containers/FrontPage/FrontPage';
import Chat from './containers/Chat';
import Auth from './containers/Auth/Auth';
import Profile from './containers/Profile/Profile';
import EditProfile from './containers/EditProfile/EditProfile';
import Layout from './hoc/Layout';
import LogOut from './containers/LogOut/LogOut';

class App extends Component {

    render() {
        return (
            
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={FrontPage}/>
                            <PrivateRoute path="/chat" component={Chat}/>
                            <PrivateRoute path="/profile" component={Profile}/>
                            <PrivateRoute path="/editprofile" component={EditProfile}/>
                            <Route path="/auth" component={Auth}/>
                            <Route path="/logout" component={LogOut}/>
                            <Redirect to="/" />
                        </Switch>
                    </Layout>
                </BrowserRouter>
            
        );
    }
}

export default App;
