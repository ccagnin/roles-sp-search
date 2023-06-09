import React, { Component } from 'react';
import axios from 'axios';
import Login from './auth/Login';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Places extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: []
    }

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);

  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.getPlaces();
    // this.props.history.push("/places");
  }

  componentDidMount() {
    axios.get('http://localhost:4000/logged_in', { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          this.getPlaces();
        } else {
          this.props.history.push("/login");
        }
      })
      .catch(error => {
        console.log('check login error', error);
        this.props.history.push("/login");
      })
  }

  getPlaces() {
    axios.get('http://localhost:4000/places', { withCredentials: true })
      .then(response => {
        this.setState({ places: response.data });
      })
      .catch(error => console.log(error))
  }

  handleFavoriteClick(placeId) {
    axios.post(`http://localhost:4000/places/${placeId}/favorite`, {}, { withCredentials: true })
      .then(response => {
        if (response.data.favorited) {
          const updatedPlaces = this.state.places.map(place => {
            if (place.id === placeId) {
              return { ...place, favorited: true };
            } else {
              return place;
            }
          });
          this.setState({ places: updatedPlaces });
        } else {
          const updatedPlaces = this.state.places.map(place => {
            if (place.id === placeId) {
              return { ...place, favorited: false };
            } else {
              return place;
            }
          });
          this.setState({ places: updatedPlaces });
        }
      })
      .catch(error => console.log(error));
  }



  render() {
    return (
      <div>
        {this.props.loggedInStatus === 'LOGGED_IN' ? (
          <div>
            <h1>Places found:</h1>
            <ul>
              {this.state.places?.map(place =>
                <li key={place.id}>{place.name} | {place.description} |
                <FontAwesomeIcon
                    icon={faHeart}
                    className={`heart-icon ${place.favorited ? 'favorited' : ''}`}
                    onClick={() => this.handleFavoriteClick(place.id)}
                  />
                </li>
              )}
            </ul>
          </div>
        ) : (
            <div>
              <h1>You need to log in!</h1>
              <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
            </div>
          )}
      </div>
    );
  }
}

export default Places;
