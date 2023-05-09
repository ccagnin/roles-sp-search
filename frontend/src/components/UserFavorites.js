import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

class FavoritePlaces extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritePlaces: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/users/favorites', { withCredentials: true })
    .then(response => {
      console.log(response.data);
      this.setState({ favoritePlaces: response.data });
    })
    .catch(error => {
      console.log('get favorite places error', error);
    })
  }

  handleDelete(placeId) {
    axios.delete(`http://localhost:4000/places/${placeId}/favorite`, { withCredentials: true })
    .then(response => {
      const updatedFavoritePlaces = this.state.favoritePlaces.filter(place => place.id !== placeId);
      this.setState({ favoritePlaces: updatedFavoritePlaces });
    })
    .catch(error => {
      console.log('delete favorite place error', error);
    })
  }

  render() {
    return (
      <div>
        <h1>Meus lugares favoritos</h1>
        <ul>
          {this.state.favoritePlaces.map(place => (
            <li key={place.id}>
              {place.name}
              <button onClick={() => this.handleDelete(place.id)}>Desfavoritar</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default FavoritePlaces;
