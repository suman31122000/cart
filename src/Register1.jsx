import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register1 = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert("Registration successful!");
            } else {
                alert("Error during registration");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div id='Register'>
            <div id='heading'>
                <h1>Register</h1>
            </div>
            <div className='form-box'>
                <form onSubmit={handleSubmit}>
                    <div className='input-box'>
                        <label>Username</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                    </div>
                    <div className='input-box'>
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className='input-box'>
                        <label>Phone Number</label>
                        <input type="number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                    </div>
                    <div className='input-box'>
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className='input-box'>
                        <label>Confirm Password</label>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                    </div>
                    <div className='input-box'>
                        <button type="submit">Register</button>
                        <h1>I have an account</h1>
                        <Link to="/Sign">Sign</Link >
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register1;