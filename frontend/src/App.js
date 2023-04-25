import React, { Component } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
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

  checkLoginStatus() {
    axios.get('http://localhost:4000/logged_in', { withCredentials: true })
      .then(response => {
        if (response.data.logged_in && this.state.loggedInStatus === 'NOT_LOGGED_IN') {
          this.setState({
            loggedInStatus: 'LOGGED_IN',
            user: response.data.user
          })
        } else if (!response.data.logged_in && this.state.loggedInStatus === 'LOGGED_IN') {
          this.setState({
            loggedInStatus: 'NOT_LOGGED_IN',
            user: {}
          })
        }
      })
      .catch(error => {
        console.log('check login error', error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
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


