import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/authContext';

const PrivateRoute = ({ children, roles }) => {
    // const user=localStorage.getItem('user')
    const role = localStorage.getItem('role');
    if (!role) {
        return <Navigate to="/" />
    }
    if (roles && !roles.includes(role)) {
        return <Navigate to="/home" />
    }
    return children;
};

export default PrivateRoute;
