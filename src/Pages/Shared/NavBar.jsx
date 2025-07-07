import React from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../Hooks/useAuth';


const NavBar = () => {
    const {user}=useAuth()
    const links=<>
    <li><NavLink>Home</NavLink></li>
    <li><NavLink>Add Articles</NavLink></li>
    <li><NavLink>Subscription</NavLink></li>
    <li><NavLink>DashBoard(C)</NavLink></li>
    <li><NavLink>My Articles</NavLink></li>
    <li><NavLink>Premium Articles(C)</NavLink></li>
    <li><NavLink><img src={user?.photoURL} className='w-12 h-12 rounded-full' alt="" /></NavLink></li>
    </>
    
   
    return (
        <div className='bg-red-300 flex items-center py-3'>
            <div className="links max-w-7xl mx-auto">
                <ul className='flex items-center gap-3'>
                    {
                    links
                }
                </ul>
            </div>
            <div className="auth max-w-7xl mx-auto">
                
                {
                    !user && <Link to='/auth/login' className='btn btn-md btn-success'>Login</Link>
                }
            </div>
        </div>
    );
};

export default NavBar;