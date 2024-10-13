import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isLoggedIn }) => {
  return <div>{isLoggedIn ? <Outlet /> : <Navigate to='/' />}</div>;
};

export default PrivateRoute;
