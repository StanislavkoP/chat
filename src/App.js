import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';

import PrivateRoute from './hoc/privateRoute';

import Chat from './containers/Chat';
import Auth from './containers/Auth/Auth';
import Profile from './containers/Profile/Profile';
import Layout from './hoc/Layout';
class App extends Component {

    render() {

            return (
                
                    <BrowserRouter>
                    <Layout>
                        <Switch>
                            <PrivateRoute path="/chat" component={Chat}/>
                            <PrivateRoute path="/profile" component={Profile}/>
                            <Route path="/auth" component={Auth}/>
                        </Switch>
                    </Layout>
                    </BrowserRouter>
                
            );
    }
}

export default App;
