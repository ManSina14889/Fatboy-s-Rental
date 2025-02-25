import React, { useState } from 'react';
import { ClipboardCheck, Shield, DollarSign, X } from 'lucide-react';

function EarnWithUs() {
  const [showAddBikeModal, setShowAddBikeModal] = useState(false); // State to control the modal
  const [manufacturer, setManufacturer] = useState(''); // State for manufacturer
  const [model, setModel] = useState(''); // State for bike model
  const [category, setCategory] = useState(''); // State for bike category
  const [engineCapacity, setEngineCapacity] = useState(''); // State for engine capacity
  const [price, setPrice] = useState(''); // State for rental price
  const [location, setLocation] = useState(''); // State for bike location
  const [description, setDescription] = useState(''); // State for bike description

  const manufacturers = ['BMW', 'Kawasaki', 'Honda', 'Yamaha', 'Ducati', 'Harley-Davidson']; // List of manufacturers
  const categories = ['Scooter', 'Sport', 'Naked', 'Touring', 'Adventure']; // List of categories

  // Add images state at the top with other state declarations
  const [images, setImages] = useState<FileList | null>(null);
  
  // Update handleAddBikeRequest function
  const handleAddBikeRequest = async () => {
    if (!manufacturer || !model || !category || !engineCapacity || !price || !location || !description) {
      alert('Please fill out all fields.');
      return;
    }
  
    try {
      // Create the request data matching backend field names
      const bikeData = {
        manufacturer,
        model,
        category,
        engine_capacity: engineCapacity,
        price_per_day: parseInt(price),
        location,
        description,
        image_url: 'placeholder' // Temporary until image upload is implemented
      };
  
      const response = await fetch('http://localhost:5004/bikes/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(bikeData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit bike request');
      }
  
      alert('Your bike request has been submitted successfully and is pending approval.');
      
      // Reset form and close modal
      setManufacturer('');
      setModel('');
      setCategory('');
      setEngineCapacity('');
      setPrice('');
      setLocation('');
      setDescription('');
      setShowAddBikeModal(false);
    } catch (error) {
      console.error('Error submitting bike request:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit bike request. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Earn Money with Your Motorcycle</h1>
          <p className="text-xl text-gray-600">Join our community of lenders and start earning money by sharing your motorcycle</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
              <ClipboardCheck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Simple Process</h3>
            <p className="text-gray-600">Submit your motorcycle details and wait for admin approval to start earning</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
            <p className="text-gray-600">We verify all renters and provide insurance coverage for your peace of mind</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Flexible Earnings</h3>
            <p className="text-gray-600">Set your own prices and availability to maximize your earnings</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                1
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-2">Submit Your Request</h3>
                <p className="text-gray-600">Fill out the motorcycle details form with information about your bike, including photos and specifications.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                2
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-2">Admin Review</h3>
                <p className="text-gray-600">Our team will review your application to ensure it meets our quality and safety standards.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                3
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-2">Get Listed</h3>
                <p className="text-gray-600">Once approved, your motorcycle will be listed on our platform and available for rent.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowAddBikeModal(true)}
            className="bg-black text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Request to Add Bike
          </button>
        </div>

        {/* Modal */}
        {showAddBikeModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add Bike Details</h2>
                <button
                  onClick={() => setShowAddBikeModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
          
              <div className="space-y-6">
                {/* Manufacturer */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Manufacturer</label>
                  <select
                    value={manufacturer}
                    onChange={(e) => setManufacturer(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="">Select Manufacturer</option>
                    {manufacturers.map((mfg) => (
                      <option key={mfg} value={mfg}>
                        {mfg}
                      </option>
                    ))}
                  </select>
                </div>
          
                {/* Model */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Model</label>
                  <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter bike model"
                  />
                </div>
          
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
          
                {/* Engine Capacity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Engine Capacity</label>
                  <input
                    type="text"
                    value={engineCapacity}
                    onChange={(e) => setEngineCapacity(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter engine capacity (e.g., 883cc)"
                  />
                </div>
          
                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price per Day ($)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter rental price"
                  />
                </div>
          
                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter bike location"
                  />
                </div>
          
                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter bike description"
                    rows={3}
                  />
                </div>
          
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Upload Bike Images</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setImages(e.target.files)}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </div>
          
                {/* Confirm Button */}
                <div className="text-right">
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to submit this request?')) {
                        handleAddBikeRequest();
                      }
                    }}
                    className="bg-black text-white py-2 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                  >
                    Confirm Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EarnWithUs;