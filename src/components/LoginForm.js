import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoImg  from "../static/assets/images/logo-vcproy-G.jpg";



  const LoginForm = ({ setLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = () => {
      // Verifica que se hayan ingresado el nombre de usuario y la contraseña
      if (!username || !password) {
        setMessage('Por favor, complete todos los campos.');
        return;
      }
  
      // Realiza la solicitud de inicio de sesión
      axios.post('https://vcproy-d66d8fc7ed40.herokuapp.com/login', { username, password })
        .then(response => {
          setMessage(response.data.message);
          if (response.data.message === 'Login successful') {
            setMessage('Inicio de sesión exitoso. Redirigiendo...');
            setLoggedIn(true);
            navigate('/proyectos');
          } else {
            setMessage('Usuario y/o contraseña incorrectos. Por favor, verifique sus credenciales');
          }
        })
        .catch(error => {
          setMessage('Error durante el inicio de sesión.');
        });
    };

  return (
    <div className='form-container'>
      <div className='logoG-container' >
        <div 
          className="loginform-img-background"
          style={{
            backgroundImage: `url(${LogoImg})`,
            width:'300px',height: '94px',
          }}
         />
      </div>
      <div className='loginform'>  

        <div className='subtitulo'>
            Inicio de sesión
        </div>
            <label>Usuario</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            
            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          
            <div className='btn-container'>
              <button className='btn-blue' onClick={handleLogin}>Login</button>
            </div>
      </div>
      <div className='message'>
        <h3>{message}</h3>
      </div>
    </div>
    
  );
};

export default LoginForm;