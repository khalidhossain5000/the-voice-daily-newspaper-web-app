import React from 'react';
import { Outlet } from 'react-router';
import NavBar from '../Pages/Shared/NavBar';

const AuthLayout = () => {
    return (
        <div>
            <header>
                <NavBar/>
            </header>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;