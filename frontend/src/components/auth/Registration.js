import React from 'react';
import axios from 'axios';

class Registration extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      first_name: '',
      last_name: '',
      registrationErrors: '',
    };

    this.handleSubmit = this.handleSubmit.bind (this);
    this.handleChange = this.handleChange.bind (this);
  }

  handleSubmit (event) {
    const {email, password, password_confirmation, first_name, last_name} = this.state;

    axios.post (
      'http://localhost:4000/registrations',
      {
        user: {
          email: email,
          password: password,
          password_confirmation: password_confirmation,
          first_name: first_name,
          last_name: last_name,
        },
      },
      {withCredentials: true}
    )
    .then (response => {
      if (response.data.status === 'created') {
        this.props.handleSuccessfulAuth (response.data);
      }
    })
    .catch (error => {
      console.log ('registration error', error);
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
          <input
            type='password'
            name='password_confirmation'
            placeholder='Confirmação de Senha'
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />
          <input
            type='text'
            name='first_name'
            placeholder='Nome'
            value={this.state.first_name}
            onChange={this.handleChange}
            required
          />
          <input
            type='text'
            name='last_name'
            placeholder='Sobrenome'
            value={this.state.last_name}
            onChange={this.handleChange}
            required
          />
          <button type='submit'>Cadastre-se</button>
        </form>
      </div>
    );
  }
}

export default Registration;
