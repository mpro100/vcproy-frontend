import React from 'react';
import { Link } from 'react-router-dom';
import LogoImg  from "../static/assets/images/logo-vcproy-G.jpg";


export default function HomePage() {
     return (
      
      <div className='homepage'>
        <div className='logoG-container'> 
          <div className="homepage-img-background"
            style={{
              backgroundImage: `url(${LogoImg})`,
              width:'300px',height: '94px',
            }}
          />
        </div>
          <div className='subtitulo'>Bienvenido a nuestra aplicación</div>
          <div className='titulo'>Visualiza y crea Proyectos</div>
          <div className='subtitulo'>Por favor, inicia sesión:</div>
      
        <div>
          <Link to="/login">Iniciar Sesión</Link>
        </div>

    </div>
     );
}