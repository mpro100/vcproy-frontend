import React, { useState } from 'react';
import axios from 'axios';

export default function ProjectEditForm ({ project, onClose, onEditSuccess }) {
  const [editedProject, setEditedProject] = useState({
    proy_cod: project.proy_cod,
    proy_name: project.proy_name,
    proy_description:project.proy_description,
    client: project.client,
    start_date: project.start_date,
    end_date:project.end_date,
    proy_state: project.proy_state,
    manager: project.manager

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProject(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Guardar los cambios en el proyecto
    axios.put(`https://vcproy-d66d8fc7ed40.herokuapp.com/projects/${project.id}`, editedProject)
      .then(response => {
        console.log(response.data);
        onEditSuccess(); // Llama a la función de éxito en ProjectDetails
      })
      .catch(error => {
        console.error('Error al guardar los cambios:', error);
      });
  };

  return (
    <div className="form-container">
      <h2>Editar Proyecto</h2>
      <form className='project-edit-form'>
          <label>Código del Proyecto</label>
          <input
            type="text"
            name="proy_cod"
            value={editedProject.proy_cod}
            onChange={handleInputChange}
          />
          <label>Nombre del Proyecto</label>
          <input
            type="text"
            name="proy_name"
            value={editedProject.proy_name}
            onChange={handleInputChange}
          />
          <label>Descripción del Proyecto</label>
          <input
            type="text"
            name="proy_description"
            value={editedProject.proy_description}
            onChange={handleInputChange}
          />
          <label>Cliente</label>
          <input
            type="text"
            name="client"
            value={editedProject.client}
            onChange={handleInputChange}
          />
          <label>Fecha de inicio</label>
          <input
            type="text"
            name="start_date"
            value={editedProject.start_date}
            onChange={handleInputChange}
          />
          <label>Fecha de Finalización</label>
          <input
            type="text"
            name="end_date"
            value={editedProject.end_date}
            onChange={handleInputChange}
          />
          <label>Estado del Proyecto</label>
          <input
            type="text"
            name="proy_state"
            value={editedProject.proy_state}
            onChange={handleInputChange}
          />
          <label>Responsable del Proyecto</label>
          <input
            type="text"
            name="manager"
            value={editedProject.manager}
            onChange={handleInputChange}
          />
        <div className="btn-container">
          <button className='btn-blue' type="button" onClick={handleSave}>Guardar Cambios</button>
          <button className='btn-orange' type="button" onClick={onClose}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

