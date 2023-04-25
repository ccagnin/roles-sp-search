import React from 'react';

const Places = props => {
  return (
    <div>
      <h1>Places</h1>
      <h1>Status: {props.loggedInStatus}</h1>
    </div>
  );
}

export default Places;
