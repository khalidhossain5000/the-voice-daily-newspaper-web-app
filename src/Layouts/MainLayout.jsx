import React from 'react';
import NavBar from '../Pages/Shared/NavBar';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div>
            <header>
                <NavBar></NavBar>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>
                
            </footer>
        </div>
    );
};

export default MainLayout;