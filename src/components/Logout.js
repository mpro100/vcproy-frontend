import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = ({ setLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Realiza la solicitud de cierre de sesión
    axios.get('http://localhost:5000/logout')
      .then(response => {
        if (response.data.message === 'Cierre de sesión exitoso') {
          setLoggedIn(false);
          // Redirige al usuario a la página de inicio después del cierre de sesión
          navigate('/');
        }
      })
      .catch(error => {
        console.error('Error durante el cierre de sesión:', error);
      });
  }, [navigate, setLoggedIn]);

  return (
    <div>
      <p>Cerrando sesión...</p>
    </div>
  );
};

export default Logout;