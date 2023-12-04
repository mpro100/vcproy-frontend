import React, { useState, useEffect} from 'react';
import axios from 'axios';


const EditUserForm = ({ user, onSave, onCancel }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  useEffect(() => {
    if (user) {
      setEditedUser({ ...user });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = () => {
    axios.put(`https://vcproy-d66d8fc7ed40.herokuapp.com/usersedit/${editedUser.id}`, editedUser)
      .then(response => {
        onSave(editedUser);
      })
      .catch(error => {
        console.error('Error al actualizar el usuario:', error);
      });
  };


  return (
    <div className='form-container'>
      <div className='title-list'>
        <h2>Editar Usuario</h2>
      </div>
      
      <div className='form-base'>
        <label>
          Username:
          <input type="text"
            name="username"
            value={editedUser.username || ''}
            onChange={handleChange}
          />
        </label>

        <label>
          Password:
          <input type="text" 
            name="password" 
            value={editedUser.password || ''}
            onChange={handleChange} />
        </label>
      </div>
      
      <div className='btn-container'>
          <button className='btn-blue' onClick={handleSave}>Guardar</button>
          <button  className='btn-orange'onClick={onCancel}>Cancelar</button>
        </div>

    </div>
  );
};

export default EditUserForm;