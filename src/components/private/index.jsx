import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const user = useSelector(state => state.user.user);
  console.log('User in private route: ', user);

  if (!user) {
    console.log('Not logged in, redirect to login. User:', user);
    return <Navigate to="/login" />;

  }

  console.log('Logged in, got to children. User: ', user);
  return <Outlet />;
};

export { PrivateRoute }

