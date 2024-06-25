import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/authContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const { user } = useAuth();

    return (
        <Route
            {...rest}
            element={user ? <Component /> : <Navigate to="/" replace />}
        />
    );
};

export default PrivateRoute;
