import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const isAuthenticated = !!localStorage.getItem('token');
    // Placeholder for user role check - adjust based on your implementation
    const userRole = localStorage.getItem('userRole');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole'); // Assuming you store the user role in local storage
        navigate('/login'); // Or navigate to the homepage
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/listings">Listings</Link></li>
                {isAuthenticated && (
                    <>
                        <li><Link to="/profile">Profile</Link></li>
                        {userRole === 'provider' && <li><Link to="/provider-dashboard">Provider Dashboard</Link></li>}
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                )}
                {!isAuthenticated && (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
