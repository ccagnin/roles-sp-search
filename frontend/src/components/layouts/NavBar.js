import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN'
    }

    this.handleLogout = this.handleLogout.bind(this);
    // this.logoutAndRedirect = this.logoutAndRedirect.bind(this);
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loggedInStatus !== this.props.loggedInStatus) {
      this.checkLoginStatus();
    }
  }

  checkLoginStatus() {
    axios.get('http://localhost:4000/logged_in', { withCredentials: true })
      .then(response => {
        if (response.data.logged_in && this.state.loggedInStatus === 'NOT_LOGGED_IN') {
          this.setState({
            loggedInStatus: 'LOGGED_IN'
          })
        } else if (!response.data.logged_in && this.state.loggedInStatus === 'LOGGED_IN') {
          this.setState({
            loggedInStatus: 'NOT_LOGGED_IN'
          })
        }
      })
      .catch(error => {
        console.log('check login error', error);
      });
  }

  handleLogout() {
    const { handleLogout } = this.props;
    handleLogout();
  }

  // logoutAndRedirect() {
  //   this.handleLogout();
  //   this.props.navigate('/');
  // }

  render() {
    return (
      <div>
        {this.state.loggedInStatus === 'LOGGED_IN' ? (
          <Link to="/" onClick={this.handleLogout}>Logout</Link>
        ) : (
          <a href="http://localhost:4000/login">Login</a>
        )}
      </div>
    )
  }
}

export default NavBar;
