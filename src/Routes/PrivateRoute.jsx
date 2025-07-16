import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Pages/Shared/Loading/Loading';

const PrivateRoute = ({children}) => {
    // const {user}=useAuth()
    // if(!user) return <Navigate to='/'></Navigate>

    // return children
    const location=useLocation();

    const {user,loading}=useAuth();

    if(loading) return <Loading/>

    if(user && user.email) return children
    
    return <Navigate to="/auth/login" state={{from:location.pathname}} replace ></Navigate>
};

export default PrivateRoute;