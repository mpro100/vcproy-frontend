import React from 'react';

import UserListPage from '../components/users/UsersList';


export default function UsersPage() {

     return (
      <div>
        <div className='subtitulo' > 
          Visualiza, edita y elimina usuarios
        </div>
        <div>
          <UserListPage />
        </div>
    </div>
     );
}