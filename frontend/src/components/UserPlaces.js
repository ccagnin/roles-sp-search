import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

class UserPlaces extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      places: []
    }
  }

  componentDidMount() {
    console.log('user id:', this.props.user_id);
    axios.get('http://localhost:4000/places', { withCredentials: true })
    .then(response => {
      console.log(response.data);
      const userPlaces = response.data.filter(place => place.user_id === this.props.user_id);
      this.setState({ places: userPlaces });
      console.log('user places', userPlaces)
    })
    .catch(error => {
      console.log('get places error', error);
    })
  }

  handleEdit(placeId) {
    const { navigate } = this.props;
    navigate(`/places/${placeId}/edit`);
  }

  handleDelete(placeId) {
    axios.delete(`http://localhost:4000/places/${placeId}`, { withCredentials: true })
    .then(response => {
      const updatedPlaces = this.state.places.filter(place => place.id !== placeId);
      this.setState({ places: updatedPlaces });
    })
    .catch(error => {
      console.log('delete place error', error);
    })
  }

  render() {
    return (
      <div>
        <h1>Meus roles</h1>
        <ul>
          {this.state.places.map(place => (
            <li key={place.id}>
              {place.name}
              <button onClick={() => this.handleEdit(place.id)}>Editar</button>
              <button onClick={() => this.handleDelete(place.id)}>Apagar</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const UserPlacesNav = (props) => {
  const { user_id } = props;
  const navigate = useNavigate();
  return <UserPlaces user_id={user_id} navigate={navigate} />;
};

export default UserPlacesNav;
