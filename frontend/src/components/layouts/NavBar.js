import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN'
    }

    this.handleLogout = this.handleLogout.bind(this);
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

  render() {
    return (
      <div>
        {this.state.loggedInStatus === 'LOGGED_IN' ? (
          <>
            <NavLink to="/places">Lista Completa</NavLink>
            <NavLink to="/places/new">Adicionar novo role</NavLink>
            <NavLink to="my-places">Meus roles</NavLink>
            <NavLink to="#">Meus favoritos</NavLink>
            <NavLink to="/" onClick={this.handleLogout}>Logout</NavLink>
          </>

        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/registrer">Cadastre-se</NavLink>
          </>
        )}
      </div>
    )
  }
}

export default NavBar;
