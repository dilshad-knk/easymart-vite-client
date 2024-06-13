import React, { useState } from 'react';
import { Outlet,useLocation,Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoginModal } from '../components/user/SignInUp';

function UserProtectedRoute() {
    const isUserAuthenticated = useSelector((state) => state.user.isUserAuthenticated);
    const location = useLocation();
    
    if (!isUserAuthenticated) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return <Outlet />;
}

export default UserProtectedRoute;
