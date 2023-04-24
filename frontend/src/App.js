import React, { Component } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home'
import Places from './components/Places'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {}
    }

    this.handleLogin = this.handleLogin.bind(this);

  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: 'LOGGED_IN',
      user: data.user
    })
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path='/'
              element={<Home handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />}
            />
            <Route
              exact
              path='/places'
              element={<Places loggedInStatus={this.state.loggedInStatus} />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}


