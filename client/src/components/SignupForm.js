// src/components/SignupForm.js
import React, { useState } from 'react';
import { registerUser } from '../api/apiServices';
import { useNavigate, Link } from 'react-router-dom';

const SignupForm = () => {
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        password: '',
        role: 'consumer' // Default role
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await registerUser(userInfo);
            navigate('/login'); // Redirect to login page on successful signup
        } catch (error) {
            setError(error.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            <div>
                <label>Username:</label>
                <input type="text" name="username" value={userInfo.username} onChange={handleChange} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={userInfo.email} onChange={handleChange} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" value={userInfo.password} onChange={handleChange} required />
            </div>
            <div>
                <label>Role:</label>
                <select name="role" value={userInfo.role} onChange={handleChange}>
                    <option value="consumer">Consumer</option>
                    <option value="provider">Provider</option>
                </select>
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignupForm;
