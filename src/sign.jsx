import './sign.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Nextbtn from './utils/nextbtn';
const apiUrl = import.meta.env.VITE_API_URL;

const Sign = () => {
    const navigate = useNavigate();
    const [formdata, setFormdata] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input
        if (formdata.username === '' || formdata.email === '' || formdata.password === '') {
            alert("Please fill all the fields");
            return;
        }

        try {
            const response = await axios.post(`${apiUrl}/login/`, formdata);
            //    const response=await axios.post(`/api/login/`, formdata);

            if (response.status === 200) {
                const { accessToken, refreshToken} = response.data;
                sessionStorage.setItem('accessToken', accessToken);
                sessionStorage.setItem('refreshToken', refreshToken);
                navigate('/products');  
            } else {
                alert("Error during login");
            }
        } catch (error) {
            console.log(error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div>
        <div><div id="sign" className="flex justify-center items-center min-h-screen bg-gradient-to-t from-[#F8F9FD] to-[#f4f7fb]">
            <div className="max-w-sm w-full bg-white rounded-2xl p-8 shadow-lg">
                <h1 className="text-center text-3xl font-extrabold text-[#1089D3] mb-6">Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formdata.username}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-[#12B1D1] shadow-md text-gray-950"
                            placeholder="Username"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formdata.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-[#12B1D1] shadow-md text-gray-950"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formdata.password}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-[#12B1D1] shadow-md text-gray-950"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#1089D3] to-[#12B1D1] text-white font-bold py-3 rounded-lg shadow-md hover:scale-105 transition transform"
                        >
                            Sign In
                        </button>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-600">Doesn't have an account? </p>
                        <Link to="/register" className="text-[#0099ff] text-sm font-semibold hover:underline">
                            Register
                        </Link>
                    </div>
                </form>
            
            </div>
            <Nextbtn />
        </div>
        </div>
        
        
        </div>
    );
};

export default Sign;
