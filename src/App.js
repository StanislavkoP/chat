import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css';

import Chat from './containers/Chat';
import Auth from './containers/Auth/Auth';


class App extends Component {
    render() {
            return (
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Chat}/>
                        <Route path="/auth" component={Auth}/>
                    </Switch>
                </BrowserRouter>
            );
    }
}

export default App;
