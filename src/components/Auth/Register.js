// Register.js
import React, { useState } from 'react';
import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Clear any existing token
            localStorage.removeItem('token'); 
            await axios.post(`${API_BASE_URL}/api/auth/register`, { username, email, password });
            alert('User registered successfully!');
        } catch (error) {
            console.error('Registration failed', error.response?.data || error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
