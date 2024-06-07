import React from 'react';
import {Navigate} from 'react-router-dom';


function ProtectedRoute({isadminAuthenticated,children}) {

  
    if (!isadminAuthenticated){
        return <Navigate to='/admin-login' />
    }
  
    return children
}

export default ProtectedRoute