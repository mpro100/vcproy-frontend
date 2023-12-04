import React, { useState } from 'react';
import axios from 'axios';


const RegisterForm = ({onCancel, onRegisterSuccess}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');


  const handleRegister = () => {
    if (!username || !password || !confirmPassword) {
      setMessage('Por favor, complete todos los campos.');
      return;
    }
    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.', );
      return;
    }
    // Realiza la solicitud de registro
    axios.post('https://vcproy-d66d8fc7ed40.herokuapp.com/register', { username, password })
    .then(response => {
        setMessage(response.data.message);
        if (response.data.message === 'Usuario registrado con éxito') {
          setMessage ('Usuario registrado con éxito');
          onRegisterSuccess();
  }
    })
    .catch(error => {
      setMessage('Error durante el registro.');
    });
};

  return (
    <div className='form-container'>
      <div className='title-list'>
        <h2>Añadir nuevo usuario</h2>
      </div>

      <div className="registerform">
        <label>Usuario</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          
        <label>Contraseña</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          
        <label>Confirmar Contraseña</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>

      <div className='btn-container'>
        <button className='btn-blue' onClick={handleRegister}>Registrar</button>
        <button  className='btn-orange'onClick={onCancel}>Cancelar</button>
      </div>
      
      <div className='message'>
        <h3>{message}</h3> 
      </div>
    </div>
    
  );
};

export default RegisterForm;

