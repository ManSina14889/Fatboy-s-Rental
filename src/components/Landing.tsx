import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate(); // ✅ Use `useNavigate` for navigation

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">Rentals</h1>
          <p className="text-xl mb-8 text-gray-600">
            Scooters - Sports Bikes - Naked Bikes - Touring Bikes - Adventure Bikes
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/home")} // ✅ Navigate to `/home`
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              VIEW OUR MOTORBIKES
            </button>
            <button
              onClick={() => navigate("/earn")} // ✅ Navigate to "Earn With Us"
              className="bg-white text-black px-8 py-3 rounded-lg font-semibold border-2 border-black hover:bg-gray-100 transition-colors"
            >
              EARN WITH US
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="w-[300px] h-[600px] border-8 border-black rounded-[48px] p-4 relative">
            <div className="w-full h-1/2 rounded-lg mb-4 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80"
                alt="Harley-Davidson Iron 883"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-1/2 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80"
                alt="Ducati V4"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black rounded-b-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
