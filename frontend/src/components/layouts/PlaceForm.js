import React from 'react';
import axios from 'axios';

class PlaceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      place_type: '',
      description: '',
      location: '',
      neighborhood: '',
      comments: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.editMode && this.props.placeId) {
      axios.get(`http://localhost:4000/places/${this.props.placeId}`)
        .then(response => {
          const place = response.data;
          this.setState({
            name: place.name,
            place_type: place.place_type,
            description: place.description,
            location: place.location,
            neighborhood: place.neighborhood,
            comments: place.comments
          });
        })
        .catch(error => {
          console.log('get place error', error);
        });
    }
  }


  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, place_type, description, location, neighborhood, comments } = this.state;
    if (this.props.editMode) {
      axios.put(`http://localhost:4000/places/${this.props.placeId}`, {
        name,
        place_type,
        description,
        location,
        neighborhood,
        comments
      }, { withCredentials: true })
        .then(response => {
          console.log(response);
          this.props.onSave();
        })
        .catch(error => {
          console.log('update place error', error);
        });
    } else {
      axios.post('http://localhost:4000/places', {
        name,
        place_type,
        description,
        location,
        neighborhood,
        comments
      }, { withCredentials: true })
        .then(response => {
          console.log(response);
          this.props.onSave();
        })
        .catch(error => {
          console.log('add place error', error);
        });
    }
  }

  onSave() {
    const { name, place_type, description, location, neighborhood, comments } = this.state;
    if (this.props.editMode) {
      axios.put(`http://localhost:4000/places/${this.props.placeId}`, {
        name,
        place_type,
        description,
        location,
        neighborhood,
        comments
      }, { withCredentials: true })
        .then(response => {
          console.log(response);
          if (this.props.onSave) {
            this.props.onSave();
          }
        })
        .catch(error => {
          console.log('update place error', error);
        });
    } else {
      axios.post('http://localhost:4000/places', {
        name,
        place_type,
        description,
        location,
        neighborhood,
        comments
      }, { withCredentials: true })
        .then(response => {
          console.log(response);
          if (this.props.onSave) {
            this.props.onSave();
          }
        })
        .catch(error => {
          console.log('add place error', error);
        });
    }
  }

  render() {
    const { name, place_type, description, location, neighborhood, comments } = this.state;
    const buttonText = this.props.editMode ? 'Save Changes' : 'Add Place';
    const formTitle = this.props.editMode ? 'Edit Place' : 'Add Place';

    return (
      <div>
        <h1>{formTitle}</h1>
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
          />
          <button type='submit'>{buttonText}</button>
        </form>
      </div>
    );
  }
}

export default PlaceForm;
