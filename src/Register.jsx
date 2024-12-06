import './Register.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phonenumber: '',
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
        
        // Passwords don't match check
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            console.log(formData);
            const response = await axios.post(`${apiUrl}/register/`, formData);
            if (response.status === 201) {
                alert("Registration successful!");
                navigate('/');  // Redirect to the login page
            } else {
                alert("Error during registration");
            }
        } catch (error) {
            console.log(error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-[#F8F9FD] to-[#f4f7fb]">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                <h1 className="text-3xl font-extrabold text-[#1089D3] text-center mb-6">Create an Account</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label className="block text-gray-600 font-semibold mb-2">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#12B1D1]"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-600 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#12B1D1]"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-600 font-semibold mb-2">Phone Number</label>
                        <input
                            type="text"
                            name="phonenumber"
                            value={formData.phonenumber}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#12B1D1]"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-600 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#12B1D1]"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#12B1D1]"
                        />
                    </div>
                    <div className="mb-4">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#1089D3] to-[#12B1D1] text-white font-bold py-3 rounded-lg shadow-md hover:scale-105 transition transform"
                        >
                            Register
                        </button>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-600">Already have an account?</p>
                        <Link to="/" className="text-[#0099ff] text-sm font-semibold hover:underline">
                            Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
