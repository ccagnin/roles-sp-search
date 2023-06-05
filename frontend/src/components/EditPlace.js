import React from 'react';
import PlaceForm from './layouts/PlaceForm';
import { useNavigate } from 'react-router-dom';

function EditPlace() {
  const navigate = useNavigate();

  function handleSave() {
    navigate('/my-places');
  }


  return (
    <div>
      <PlaceForm editMode={true} onSave={handleSave} />
    </div>
  );
}

export default EditPlace;
