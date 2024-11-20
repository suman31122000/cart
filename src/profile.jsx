import React from 'react';
import { Navigate,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
const apiUrl = import.meta.env.VITE_API_URL;


const ProfilePage = () => {
    const navigate=useNavigate();
  const token = sessionStorage.getItem('accessToken'); 
  
  if (!token) {
    navigate('/'); 
  }

  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user`, {
          headers: {
            "Authorization": "Bearer " + sessionStorage.getItem('accessToken')
          }
        });
        setData(response.data);  
      } catch (err) {
        throw err;
      }
    };

    fetchData();  
  }, []);  


  const user = {
    name: `${data.user}`,
    image: 'https://via.placeholder.com/150',
    email: `${data.email}`,
    address: '123 Main Street, City, Country',
    walletBalance: '$150.00',
    orderHistory: [
      { id: 1, item: 'Product A', price: '$50.00', date: '2024-11-01' },
      { id: 2, item: 'Product B', price: '$100.00', date: '2024-11-05' },
    ],
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken'); 
    localStorage.removeItem('refreshToken'); 
   navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center space-x-6">
          <img
            src={user.image}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-gray-300"
          />
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Address</h2>
          <p className="text-gray-600">{user.address}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Wallet Balance</h2>
          <p className="text-gray-600">{user.walletBalance}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Order History</h2>
          <ul className="space-y-4">
            {user.orderHistory.map((order) => (
              <li key={order.id} className="flex justify-between items-center border-b py-2">
                <div>
                  <p className="font-semibold">{order.item}</p>
                  <p className="text-gray-600">Date: {order.date}</p>
                </div>
                <p className="text-gray-600">{order.price}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
