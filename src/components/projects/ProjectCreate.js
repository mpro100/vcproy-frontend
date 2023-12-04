import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

const ProjectCreate = ({ onProjectCreateSuccess, onCancel }) => {
  const [proy_cod, setProyCod] = useState('');
  const [proy_name, setProyName] = useState('');
  const [proy_description, setProyDescription] = useState('');
  const [client, setClient] = useState('');
  const [start_date, setStartDate] = useState(new Date());
  const [end_date, setEndDate] = useState(new Date());
  const [proy_state, setProyState] = useState('En Progreso');
  const [manager, setManager] = useState('');
  const [message, setMessage] = useState('');

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  

  const handleCreateProject = () => {
    const formattedStartDate = format(start_date, 'dd/MM/yyyy');
    const formattedEndDate = format(end_date, 'dd/MM/yyyy');

    if (!proy_cod || !proy_name || !proy_description || !client || !start_date || !end_date || !proy_state || !manager) {
      setMessage('Por favor, complete todos los campos.');
      return;
    }

    // Realizar la solicitud para crear un nuevo proyecto
    axios.post('https://vcproy-d66d8fc7ed40.herokuapp.com/project_new', {
      proy_cod,
      proy_name,
      proy_description,
      client,
      start_date: formattedStartDate,
      end_date: formattedEndDate,
      proy_state,
      manager,
    })
    .then(response => {
      setMessage(response.data.message);
      if (response.data.message === 'codigo de proyecto en uso') {
        setMessage('El código de proyecto ya está en uso. Por favor, elija otro código.');
      } else if (response.data.message === 'Proyecto creado correctamente') {
        setMessage('Proyecto creado correctamente');
        onProjectCreateSuccess();
      }
    })
    .catch(error => {
      setMessage('Error durante la creación del proyecto.');
    });
  };

  return (
    <div className='form-container'>
        <div className='title-list'>
           <h2>Añadir Nuevo Proyecto</h2>
        </div>
      <form className='project-create-form'> 
        <label>Código del Proyecto:</label>
        <input type='text' value={proy_cod} onChange={(e) => setProyCod(e.target.value)} />

        <label>Nombre del Proyecto:</label>
        <input type='text' value={proy_name} onChange={(e) => setProyName(e.target.value)} />

        <label>Descripción del Proyecto:</label>
        <input type='text' value={proy_description} onChange={(e) => setProyDescription(e.target.value)} />

        <label>Cliente:</label>
        <input type='text' value={client} onChange={(e) => setClient(e.target.value)} />

        <label>Fecha de Inicio:</label>
        
        <DatePicker
          showIcon
          selected={start_date}
          onChange={handleStartDateChange}
          dateFormat="dd/MM/yyyy"
          utcOffset={new Date().getTimezoneOffset()}
        />

        <label>Fecha de Finalización:</label>
        <DatePicker
          showIcon
          selected={end_date}
          onChange={handleEndDateChange}
          dateFormat="dd/MM/yyyy"
          utcOffset={new Date().getTimezoneOffset()}
        />

        <label>Estado del Proyecto:</label>
        <select value={proy_state} onChange={(e) => setProyState(e.target.value)}>
          <option value='En Progreso'>En Progreso</option>
          <option value='Completado'>Completado</option>
          <option value='Cancelado'>Cancelado</option>
        </select>

        <label>Responsable del Proyecto:</label>
        <input type='text' value={manager} onChange={(e) => setManager(e.target.value)} />
      </form>

      <div className='btn-container'>
        <button className='btn-blue' onClick={handleCreateProject}>Guardar</button>
        <button className='btn-orange' onClick={onCancel}>Cancelar</button>
      </div>

      <div className='message'>
        <h3>{message}</h3>
      </div>
    </div>
  );
};

export default ProjectCreate;