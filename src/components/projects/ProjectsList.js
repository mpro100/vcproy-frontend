import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectDetails from './ProjectDetails'; 
import ProjectCreate from './ProjectCreate';
import ConfirmationModal from '../modals/confirmationModal';

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isEditing, setEditing] = useState(false);
  const [isCreating, setCreating] = useState(false);

  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);



  useEffect(() => {
    // Solicitud al servidor para obtener la lista de proyectos
    axios.get('http://localhost:5000/projects')
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de proyectos:', error);
      });
  }, []);

  
  // *Editación Detalles proyecto seleccionado

  const reloadProjectsList = () => {
    // Para recargar la lista de proyectos después de editar
    axios.get('http://localhost:5000/projects')
      .then(response => {
        setProjects(response.data);
        setConfirmationMessage('Proyecto editado y guardado correctamente');
        setShowConfirmationModal(true);

      })
      .catch(error => {
        console.error('Error al obtener la lista de proyectos:', error);
      });
  };

  const handleProjectClick = (projectId) => {
    // Al hacer clic en el "Código de Proyecto", seleccionar el proyecto
    const selected = projects.find(project => project.id === projectId);
    setSelectedProject(selected);
  };

  const handleCloseDetails = () => {
    // Cancelar la edición 
    setSelectedProject(null);
  };

  const handleEdit = (project) => {
    // Abrir el formulario de edición al hacer clic en "Editar"
    setSelectedProject(project);
    setEditing(true);
  };

  const handleDelete = (projectId) => {
    // Eliminación del proyecto
    axios.delete(`http://localhost:5000/projects/${projectId}`)
      .then(response => {
        // Actualizar la lista de proyectos después de la eliminación
        setProjects(projects.filter(project => project.id !== projectId));
        setSelectedProject(null);
        setConfirmationMessage('Proyecto eliminado correctamente');
        setShowConfirmationModal(true);

      })
      .catch(error => {
        console.error('Error al eliminar el proyecto:', error);
      });
  };


  // *Crear proyecto nuevo

  const handleProjectCreate = () => {
    setCreating(true);
    setEditing(false); 
  };

  const handleProjectCreateSuccess = () => {
    // Nueva solicitud para actualizar la lista de proyectos
    axios.get('http://localhost:5000/projects')
      .then(response => {
        setProjects(response.data);
        setCreating(false);
        setConfirmationMessage('Proyecto nuevo creado correctamente');
        setShowConfirmationModal(true);

      })
      .catch(error => {
        console.error('Error al obtener la lista de proyectos después de crear uno nuevo:', error);
      });
  };


  const handleCancelCreate = () => {
    // Cancelar la creación y ocultar el formulario
      setCreating(false);
    };
  

  return (
    <div className='project-list-wrapper'>
      {selectedProject ? (
        <ProjectDetails 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)}
          reloadProjectsList={reloadProjectsList}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        ) : isCreating ? (
          <ProjectCreate  onCancel={handleCancelCreate} onProjectCreateSuccess={handleProjectCreateSuccess}/>
  
      ) : (
        
        <div className="projects-cards" >
          <div>
          <button className='btn-blue'onClick={handleProjectCreate} >Añadir Proyecto</button>
          </div>
         
          <div className="project-card">
            <div className='column-title'>ID</div>
            <div className='column-title'>Código del Proyecto</div>
            <div className='column-title'>Nombre del Proyecto</div>
          </div>

            {projects.map(project => (
              <div key={project.id} className="project-card">
                <div >{project.id}</div>
                <div className='text-link' onClick={() => handleProjectClick(project.id)} >
                   {project.proy_cod} </div>
                <div> {project.proy_name}</div>
              </div>
            ))}

          {showConfirmationModal && (
            <ConfirmationModal
              message={confirmationMessage}
              closeModal={() => setShowConfirmationModal(false)}
            />
          )}

        </div>
      )}
    </div>
  );
};