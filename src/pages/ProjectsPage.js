import React from 'react';

import ProjectsList from '../components/projects/ProjectsList'


export default function ProjectPage() {

     return (
      <div>
        <div className='subtitulo' > 
          Visualiza, edita y elimina proyectos
        </div>
        <div>
          <ProjectsList />
        </div>
    </div>
     );
}