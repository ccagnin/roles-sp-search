import React, { Component } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Home from './components/Home'
import Places from './components/Places'
import Navbar from './components/layouts/NavBar'
import NewPlaceForm from './components/NewPlaceForm'
import UserPlaces from './components/UserPlaces'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {}
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleNewPlace = this.handleNewPlace.bind(this);


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

  handleLogout() {
    axios.delete('http://localhost:4000/logout', { withCredentials: true })
      .then(response => {
        this.setState({
          loggedInStatus: 'NOT_LOGGED_IN',
          user: {}
        })
        this.checkLoginStatus();
      })
      .catch(error => {
        console.log('logout error', error);
      })
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: 'LOGGED_IN',
      user: data.user
    })
  }

  handleNewPlace(data) {
    this.setState({
      places: data.places
    })
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar loggedInStatus={this.state.loggedInStatus} handleLogout={this.handleLogout} />
            <Routes>
              <Route
                exact
                path='/'
                element={<Home handleLogin={this.handleLogin} handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} />}
              />
              <Route
                exact
                path='/places'
                element={<Places handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />}
              />
              <Route
                exact
                path='/places/new'
                element={<NewPlaceForm handleNewPlace={this.handleNewPlace} user_id={this.state.user.id} loggedInStatus={this.state.loggedInStatus} />}
              />
              <Route
                exact
                path='/my-places'
                element={<UserPlaces loggedInStatus={this.state.loggedInStatus} user_id={this.state.user.id} />}
              />
            </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
