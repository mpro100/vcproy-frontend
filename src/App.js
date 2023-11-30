import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Modal from 'react-modal';

import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import ProjectsPage from './pages/ProjectsPage';
import UsersPage from './pages/UsersPage';
import Logout from './components/Logout';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/users/RegisterForm';
import EditUserForm from './components/users/EditUserForm';



import './styles/main.scss';

Modal.setAppElement('#root');

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  

  return (
  
    <div className="container">
      <Router>
        <div>
        {/* <Navbar /> */}
          {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} />}
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={<LoginForm setLoggedIn={setLoggedIn} />}
            />
            <Route 
              path="/usuarios" 
              element={isLoggedIn ? <UsersPage /> : <Navigate to="/login" />} />

            <Route 
              path="/register" 
              element={isLoggedIn ? <RegisterForm /> : <Navigate to="/login" />} />
            <Route 
              path="/editUser" 
              element={isLoggedIn ? <EditUserForm /> : <Navigate to="/login" />} />

            <Route
              path="/proyectos"
              element={isLoggedIn ? <ProjectsPage /> : <Navigate to="/login" />}
            />
            <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn} />} />
            {/* Manejar rutas no encontradas */}
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;