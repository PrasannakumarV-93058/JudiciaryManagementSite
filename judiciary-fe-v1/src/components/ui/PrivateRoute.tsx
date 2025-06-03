import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = sessionStorage.getItem('jwtToken');
  const userRole = sessionStorage.getItem('currentUserRole');
  // Get the role from the current URL
  const urlRole = window.location.pathname.split('/')[2];

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If the role in the URL does not match the logged-in user's role, redirect to their dashboard
  if (userRole && urlRole && userRole !== urlRole) {
    return <Navigate to={`/dashboard/${userRole}`} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
