// src/components/LoginForm.js
import React, { useState } from 'react';
import { loginUser } from '../api/apiServices';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            // Attempt to log in
            const response = await loginUser(credentials.email, credentials.password);
            // Check if login was successful and token was received
            if (response.token) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role); // Save user role

                // Conditional navigation based on user role
                if (response.role === 'provider') {
                    navigate('/dashboard'); // Navigate to the provider dashboard
                } else {
                    navigate('/'); // Navigate to a different page for consumers or other roles
                }
            } else {
                setError('Login failed. Please try again.'); // Handle cases where login fails
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false); // Ensure loading state is reset
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" value={credentials.email} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" value={credentials.password} onChange={handleChange} required />
            </div>
            <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
    );
};

export default LoginForm;
