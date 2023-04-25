import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

class Login extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      email: '',
      password: '',
      registrationErrors: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit (event) {
    const { email, password } = this.state;
    console.log('Login data', email, password)

    axios.post (
      'http://localhost:4000/sessions',
      {
        email: email,
        password: password
      },
      {withCredentials: true}
    )
    .then (response => {
      if (response.data.status === 'created') {
        console.log('Login successful', response.data);
        this.props.handleSuccessfulAuth(response.data);
        this.props.navigate('/places');
      }
    })
    .catch (error => {
      console.log ('login error', error);
    });
    event.preventDefault();
  }

  handleChange (event) {
    this.setState ({
      [event.target.name]: event.target.value,
    });
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            type='password'
            name='password'
            placeholder='Senha'
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <button type='submit'>Entrar</button>
        </form>
      </div>
    );
  }
}

const LoginWithNavigation = (props) => {
  const navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}

export default LoginWithNavigation;
