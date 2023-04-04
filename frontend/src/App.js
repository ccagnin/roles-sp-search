import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/places")
      .then(response => setPlaces(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>Lista de lugares</h1>
      <ul>
        {places.map(place => (
          <li key={place.id}>
            <h2>{place.name}</h2>
            <p>{place.description}</p>
            <p>{place.location}</p>
            <p>{place.neighborhood}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
