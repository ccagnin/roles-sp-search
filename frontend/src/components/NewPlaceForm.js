import React from 'react';
import { useNavigate } from 'react-router-dom';
import PlaceForm from './layouts/PlaceForm';


function NewPlaceForm() {
  const navigate = useNavigate();

  function handleSave() {
    navigate('/my-places');
  }

  return (
    <div>
      <PlaceForm onSave={handleSave} />
    </div>
  );
}

export default NewPlaceForm;
