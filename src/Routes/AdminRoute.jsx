import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loading from '../Pages/Shared/Loading/Loading';
import useRole from '../Hooks/useRole';
import { Navigate, useLocation } from 'react-router';

const AdminRoute = ({children}) => {
    const {user,loading}=useAuth()
    const {role,roleLoading}=useRole()
const location = useLocation();
    if(loading || roleLoading) return <Loading/>
        if (!user || role !== 'admin') {
        return <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    }

    return children
};

export default AdminRoute;