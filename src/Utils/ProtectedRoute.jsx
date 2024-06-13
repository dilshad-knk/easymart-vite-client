import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute() {
    const isSellerAuthenticated = useSelector((state) => state.seller.isSellerAuthenticated);
    const location = useLocation();

    if (!isSellerAuthenticated) {
        return <Navigate to="/sellers/signin" state={{ from: location }} replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
