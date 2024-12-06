import React from 'react';
import { Navigate,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Editbutton from './utils/edit.button.jsx';
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
        const response = await axios.get(`${apiUrl}/user/`, {
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

  console.log(data);
  const user = {
    name: `${data.user}`,
    image: `${data.profileimage}`,
    email: `${data.email}`,
    address: `${data.address}`,
    walletBalance: '$150.00',
    orderHistory: [
      { id: 1, item: 'Product A', price: '$50.00', date: '2024-11-01' },
      { id: 2, item: 'Product B', price: '$100.00', date: '2024-11-05' },
    ],
  };

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken'); 
    sessionStorage.removeItem('refreshToken'); 
   navigate('/');
  };

  const updateFileName=async(event)=>{
    const file = event.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append('image', file);
     axios.post(`/api/profileimage`, formData, {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem('accessToken')
      }
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-center space-x-6">
          <div>
          <img
            src={user.image}
            className="w-32 h-32 rounded-full border-4 border-gray-300"
          />
          <form>
    <label for="file-upload" class="custom-file-upload" className=' absolute top-40 left-36 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded'>
        Edit
    </label>
    <input type="file" id="file-upload" accept="image/*" style={{ display: 'none' }} onChange={updateFileName} />
    </form>

          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="mt-8">
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Address</h2>
          <div className="flex justify-between items-center w-full">
  <p className="text-gray-600">{user.address}</p>
  <Editbutton />
</div>

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
