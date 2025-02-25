import React, { useState, useEffect } from 'react';
import { Star, MapPin, Calendar, Search, X, User, Gauge, DollarSign, Fuel, Weight, Power } from 'lucide-react';

interface Motorbike {
  id: number;
  name: string;
  image: string;
  price: number;
  location: string;
  rating: number;
  reviews: number;
  owner: string;
  category: 'Scooter' | 'Sport' | 'Naked' | 'Touring' | 'Adventure';
  manufacturer: string;
  engineCapacity: string;
  power: string;
  weight: string;
  fuelCapacity: string;
  additionalImages: string[];
  description: string;
}

function Home() {
  
  const [motorbikes, setMotorbikes] = useState<Motorbike[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBike, setSelectedBike] = useState<Motorbike | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [rentalDays, setRentalDays] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(''); // State for error messages

  const categories = ['Scooter', 'Sport', 'Naked', 'Touring', 'Adventure'];

  // Automatically calculate the end date when start date or rental days change
  useEffect(() => {
    const fetchListedBikes = async () => {
      try {
        const response = await fetch('http://localhost:5004/bikes/listed', {
          credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to fetch listed bikes');
        const data = await response.json();
        console.log('Fetched bikes:', data); // Debug log
        setMotorbikes(data);
      } catch (error) {
        console.error('Error fetching listed bikes:', error);
      }
    };

    fetchListedBikes();
  }, []);

  const filteredMotorbikes = motorbikes.filter(motorbike => {
    const matchesSearch = motorbike.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         motorbike.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || motorbike.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const nextImage = () => {
    if (selectedBike) {
      setCurrentImageIndex((prev) => 
        prev === selectedBike.additionalImages.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedBike) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedBike.additionalImages.length - 1 : prev - 1
      );
    }
  };

  const handleBookNow = (bike: Motorbike) => {
    setSelectedBike(bike);
    setCurrentImageIndex(0);
  };

  const handleConfirmBooking = () => {
    // Validate inputs before proceeding
    if (rentalDays <= 0) {
      setError('Number of days must be greater than 0.');
      return;
    }
    if (!startDate || !endDate) {
      setError('Please select both start and end dates.');
      return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
      setError('End date must be after the start date.');
      return;
    }

    setError(''); // Clear any previous errors
    setShowBookingModal(false);
    setShowCheckoutModal(true);
  };

  const handleCheckout = () => {
    alert(`Booking confirmed for ${selectedBike?.name} for ${rentalDays} days.`);
    setShowCheckoutModal(false);
    setSelectedBike(null);
  };

  const calculateTotalCost = () => {
    if (selectedBike) {
      return selectedBike.price * rentalDays;
    }
    return 0;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Available Motorbikes</h1>
        <p className="mt-2 text-gray-600">Find your perfect ride from our trusted community of owners</p>
        
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="flex-grow max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search motorbikes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
        {filteredMotorbikes.map((motorbike) => (
          <div key={motorbike.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex">
              <div className="w-1/3">
                <img
                  src={motorbike.image}
                  alt={motorbike.name}
                  className="w-full h-32 md:h-72 object-cover"
                />
              </div>
              <div className="w-2/3 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{motorbike.manufacturer} {motorbike.name}</h3>
                    <span className="inline-block px-2 py-1 mt-1 text-sm font-medium text-gray-600 bg-gray-100 rounded">
                      {motorbike.category}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-black">${motorbike.price}/day</p>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{motorbike.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Star className="w-4 h-4 mr-2 text-yellow-400" />
                    <span>{motorbike.rating} ({motorbike.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Available Now</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Listed by {motorbike.owner}</p>
                    <button 
                      onClick={() => handleBookNow(motorbike)}
                      className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedBike && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{selectedBike.manufacturer} {selectedBike.name}</h2>
                <button
                  onClick={() => setSelectedBike(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                {/* Left side - Images */}
                <div className="md:w-1/2">
                  <div className="relative">
                    <img
                      src={selectedBike.additionalImages[currentImageIndex]}
                      alt={`${selectedBike.name} view ${currentImageIndex + 1}`}
                      className="w-full h-[400px] object-cover rounded-lg"
                    />
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                    >
                      →
                    </button>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {selectedBike.additionalImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-20 h-20 rounded-lg overflow-hidden ${
                          currentImageIndex === index ? 'ring-2 ring-black' : ''
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${selectedBike.name} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right side - Details */}
                <div className="md:w-1/2 space-y-6">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <User className="w-5 h-5" />
                    <span>Listed by {selectedBike.owner}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Gauge className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Engine</p>
                        <p className="font-medium">{selectedBike.engineCapacity}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Power className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Power</p>
                        <p className="font-medium">{selectedBike.power}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Weight className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Weight</p>
                        <p className="font-medium">{selectedBike.weight}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Fuel className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Fuel Capacity</p>
                        <p className="font-medium">{selectedBike.fuelCapacity}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-gray-600">{selectedBike.description}</p>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Rental Rate</p>
                        <p className="text-2xl font-bold">${selectedBike.price}/day</p>
                      </div>
                      <button
                        onClick={() => setShowBookingModal(true)}
                        className="bg-black text-white py-3 px-8 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Choose Number of Days Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Choose Rental Duration</h2>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">Number of Days</label>
                <input
                  type="number"
                  min="1"
                  value={rentalDays}
                  onChange={(e) => setRentalDays(Number(e.target.value))}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  readOnly // Make the end date read-only
                  className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-gray-100"
                />
              </div>

              <div className="text-right">
                <button
                  onClick={handleConfirmBooking}
                  className="bg-black text-white py-2 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-600">Motorcycle</p>
                <p className="font-medium">{selectedBike?.manufacturer} {selectedBike?.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Rental Duration</p>
                <p className="font-medium">{rentalDays} days</p>
              </div>

              <div>
                <p className="text-sm text-gray-600">Total Cost</p>
                <p className="text-2xl font-bold">${calculateTotalCost()}</p>
              </div>

              <div className="text-right">
                <button
                  onClick={handleCheckout}
                  className="bg-black text-white py-2 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Confirm and Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;