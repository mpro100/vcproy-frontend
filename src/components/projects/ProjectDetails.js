import React, { useState} from 'react';
import ProjectEditForm from './ProjectEditForm';

export default function ProjectDetails ({ project, onClose, onEdit, onDelete, reloadProjectsList }) {
     const [isEditing, setIsEditing] = useState(false);

     const handleEditSuccess = () => {
     // Lógica después de guardar en ProjectEditForm
          onClose(); // Cierra el componente ProjectDetails
          reloadProjectsList(); // Recarga la lista de proyectos en ProjectsList
     };

     const handleEditClick = () => {
     // edición del proyecto
           setIsEditing(true);
     };
          
     const handleDeleteClick = () => {
     // eliminación del proyecto
          onDelete(project.id);
     };

   return (
    <div className="project-details-wrapper">
      {isEditing ? (
        <ProjectEditForm
          project={project}
          onClose={() => setIsEditing(false)}
          onEditSuccess={handleEditSuccess}
        />
      ) : (
      <div className='project-details'>
          <div className='title-list'>
               <h2>Detalles del Proyecto</h2>
          </div>

          <div className='project-detail-wrapper'>
               <div className='project-detail-item'>
                    <strong>ID: </strong> {project.id}
               </div>
               <div className='project-detail-item'>
                    <strong>Código de Proyecto: </strong> {project.proy_cod}
               </div>
               <div className='project-detail-item'>
                    <strong>Nombre de Proyecto: </strong> {project.proy_name}
               </div>
               <div className='project-detail-item'>
                    <strong>Descripción del Proyecto: </strong> {project.proy_description}
               </div >
               <div className='project-detail-item'>
                    <strong>Cliente: </strong> {project.client}
               </div>
               <div className='project-detail-item'>
                    <strong>Fecha de Inicio: </strong> {project.start_date}
               </div>
               <div className='project-detail-item'>
                    <strong>Fecha de Finalización: </strong> {project.end_date}
               </div>
               <div className='project-detail-item'>
               <strong>Estado del Proyecto: </strong> {project.proy_state}
                    </div>
               <div className='project-detail-item'>
                    <strong>Responsable del Proyecto: </strong> {project.manager}
               </div>
          </div>

      <div className='btn-container'>
       <button className='btn-blue' onClick={onClose}>Cerrar Detalles</button>
        <button className='btn-blue' onClick={handleEditClick}>Editar Detalles</button>
        <button className='btn-orange' onClick={handleDeleteClick}>Eliminar Proyecto</button>
      </div>
    </div>
  )}
</div>
 );
}


