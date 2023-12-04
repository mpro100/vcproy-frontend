import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import styled from 'styled-components';

import EditUserForm from './EditUserForm';
import RegisterForm from './RegisterForm';
import ConfirmationModal from '../modals/confirmationModal';




export default function UserListPage() {
  const [users, setUsers] = useState([]);

  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setEditing] = useState(false);
  const [isRegistering, setRegistering] = useState(false);

  useEffect(() => {
    // Obtener la lista de usuarios
    axios.get('https://vcproy-d66d8fc7ed40.herokuapp.com/userslist')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de usuarios:', error);
      });
  }, []);


  const handleEdit = (user) => {
    // Obtener el usuario seleccionado por ID
    setSelectedUser(user);
    setEditing(true);
    setRegistering(false);
  };

  const handleSave = (editedUser) => {
    // Guardar los cambios editados en el usuario
    console.log('Guardando cambios editados:', editedUser);
    // Actualizar lista de usuarios
    axios.get('https://vcproy-d66d8fc7ed40.herokuapp.com/userslist')
      .then(response => {
        setUsers(response.data);
        setEditing(false);
        setConfirmationMessage('Usuario editado y guardado correctamente');
        setShowConfirmationModal(true);

      })
      .catch(error => {
        console.error('Error al obtener la lista de usuarios después de editar:', error);
      });
  };

  const handleCancelEdit = () => {
    // Cancelar la edición y ocultar el formulario
    setEditing(false);
    setSelectedUser(null);

  };

  const handleDelete = (userId) => {
    // Realizar una solicitud al servidor para eliminar el usuario con el ID proporcionado
    axios.delete(`https://vcproy-d66d8fc7ed40.herokuapp.com/users/${userId}`)
      .then(response => {
        // Actualizar la lista de usuarios después de la eliminación
        setUsers(users.filter(user => user.id !== userId));
        setConfirmationMessage('Usuario eliminado correctamente');
        setShowConfirmationModal(true);
      })
      .catch(error => {
        console.error('Error al eliminar el usuario:', error);
      });
  };


  const handleRegister = () => {
    setRegistering(true);
    setEditing(false); 
  };


  const handleCancelRegister = () => {
  // Cancelar la edición y ocultar el formulario
    setRegistering(false);
  };

  const handleRegisterSuccess = () => {
    // Actualizar el estado después de un registro exitoso
    setRegistering(false);
    setConfirmationMessage('Usuario registrado con éxito');
    setShowConfirmationModal(true);
    // Volver a cargar la lista de usuarios 
        axios.get('https://vcproy-d66d8fc7ed40.herokuapp.com/userslist')
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.error('Error al obtener la lista de usuarios:', error);
        });
  
  };


  return (
    <div className='user-list-wrapper'> 
      {isEditing ? (
        <EditUserForm 
          user={selectedUser} 
          onSave={handleSave} 
          onCancel={handleCancelEdit} />
      ) : isRegistering ? (
        <RegisterForm onRegisterSuccess={handleRegisterSuccess} onCancel={handleCancelRegister} />
      ) : (
      <div className='user-cards'>
        <div className='button-container'>
          <button className='btn-blue' onClick={handleRegister}>Añadir nuevo usuario</button>
        </div>

        <div className='user-card'>
          <div className='column-title'>ID</div>
          <div className='column-title'>Username</div>
          <div className='column-title'>Contraseña</div>
        </div>

        {users.map(user => (
          <div key={user.id} className='user-card'>
            <div>{user.id}</div>
            <div>{user.username}</div>
            <div>{user.password}</div>
            <button className='btn-blue' onClick={() => handleEdit(user)}>Editar</button>
            <button className='btn-orange' onClick={() => handleDelete(user.id)}>Borrar</button>
          </div>
        ))}
        {isEditing && selectedUser && (
          <EditUserForm 
            user={selectedUser} 
            onSave={handleSave} 
            onCancel={handleCancelEdit} 
          />
          )}
          {showConfirmationModal && (
            <ConfirmationModal
              message={confirmationMessage}
              closeModal={() => setShowConfirmationModal(false)}
            />
          )}

      </div>
    ) }
    </div>
  );
}

