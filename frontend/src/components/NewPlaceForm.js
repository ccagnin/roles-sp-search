import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


class NewPlaceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      place_type: '',
      description: '',
      location: '',
      neighborhood: '',
      comments: '',
      user_id: props.user_id
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState ({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const {name, place_type, description, location, neighborhood, comments, user_id} = this.state;
    const { handleNewPlace, navigate } = this.props;

    axios.post (
      'http://localhost:4000/places/',
      {
        place: {
          name: name,
          place_type: place_type,
          description: description,
          location: location,
          neighborhood: neighborhood,
          comments: comments,
          user_id: user_id
        },
      },
      {withCredentials: true}
    )
    .then (response => {
      if (response.data.status === 'created') {
        handleNewPlace(response.data.place);
        navigate('/my-places');
        console.log('Novo local adicionado:', response.data.place);
      }
    })
    .catch (error => {
      console.log ('registration error', error);
    });
    event.preventDefault();
  }

  render() {
    const {name, place_type, description, location, neighborhood, comments} = this.state;
    const { loggedInStatus } = this.props;

    if (loggedInStatus !== 'LOGGED_IN') {
      return (
        <div>
          <h1>You need to log in!</h1>
        </div>
      )
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value={name}
            onChange={this.handleChange}
            required
          />
          <input
            type='text'
            name='place_type'
            placeholder='Type'
            value={place_type}
            onChange={this.handleChange}
            required
          />
          <input
            type='text'
            name='description'
            placeholder='Description'
            value={description}
            onChange={this.handleChange}
            required
          />
          <input
            type='text'
            name='location'
            placeholder='Location'
            value={location}
            onChange={this.handleChange}
            required
          />
          <input
            type='text'
            name='neighborhood'
            placeholder='Neighborhood'
            value={neighborhood}
            onChange={this.handleChange}
            required
          />
          <input
            type='text'
            name='comments'
            placeholder='Comments'
            value={comments}
            onChange={this.handleChange}
            required
          />
          <button type='submit'>Add Place</button>
        </form>
      </div>
    )
  }
}

const NewPlaceFormNav = (props) => {
  const navigate = useNavigate();
  return <NewPlaceForm {...props} navigate={navigate} />
}

export default NewPlaceFormNav;
