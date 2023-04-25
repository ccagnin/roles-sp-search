import React, { Component } from 'react';
import axios from 'axios';

class Places extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: []
    }
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

  render() {
    return (
      <div>
        {this.props.loggedInStatus === 'LOGGED_IN' ? (
          <div>
            <h1>Places found:</h1>
            <ul>
              {this.state.places?.map(place => <li key={place.id}>{place.name}</li>)}
            </ul>
          </div>
        ) : (
            <div>
              <h1>You need to log in!</h1>
            </div>
          )}
      </div>
    );
  }
}

export default Places;
