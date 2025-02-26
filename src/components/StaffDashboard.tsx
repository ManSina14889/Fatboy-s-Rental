import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Bike, User, Calendar, MapPin, Clock, DollarSign, Phone, Mail, Shield, Search } from 'lucide-react';

// Import the Motorbike interface and motorbikes array from Home.tsx
// Update Motorbike interface
interface Motorbike {
  id: number;
  name: string;
  image: string;  // Keep only single image
  price: number;
  location: string;
  owner: string;
  category: 'Scooter' | 'Sport' | 'Naked' | 'Touring' | 'Adventure';
  manufacturer: string;
  engineCapacity: string;
  description: string;
}


  

interface BikeRequest {
  id: number;
  name: string;
  manufacturer: string;
  image: string;
  owner: {
    name: string;
    email: string;
  };
  category: string;
  engineCapacity: string;
  location: string;
  requestDate: string;
  price: number;
}

interface BikeOwner {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  totalBikes: number;
  rating: number;
  verificationStatus: 'Verified' | 'Pending' | 'Unverified';
  idNumber: string;
  bankDetails: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
}

interface Renter {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  licenseNumber: string;
  licenseExpiry: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  rentalHistory: {
    total: number;
    completed: number;
    cancelled: number;
  };
  rating: number;
  verificationStatus: 'Verified' | 'Pending' | 'Unverified';
}

interface RentalContract {
  id: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: 'Active' | 'Completed' | 'Cancelled';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  deposit: number;
  insurance: {
    provider: string;
    policyNumber: string;
    coverage: string;
  };
}

// Update only the ActiveRental interface
interface ActiveRental {
  id: string;
  bike: {
    id: number;
    manufacturer: string;
    model: string;
    image: string;
  };
  renter: {
    email: string;
  };
  contract: {
    startDate: string;
    endDate: string;
    totalAmount: number;
    status: string;
    deposit: number;
  };
}


function StaffDashboard() {
  const [showRequests, setShowRequests] = useState(false);
  const [showListedBikes, setShowListedBikes] = useState(false);
  const [showActiveRentals, setShowActiveRentals] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<BikeRequest | null>(null);
  const [selectedOwner, setSelectedOwner] = useState<BikeOwner | null>(null);
  const [selectedRenter, setSelectedRenter] = useState<Renter | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [bikeRequests, setBikeRequests] = useState<BikeRequest[]>([]);
  // Add these new states
  const [listedBikes, setListedBikes] = useState<Motorbike[]>([]);
  // Update the initial state to be an empty array
  const [activeRentals, setActiveRentals] = useState<ActiveRental[]>([]);
  
  // Update the fetch function to handle the response better
  useEffect(() => {
      const fetchActiveRentals = async () => {
          try {
              const response = await fetch('http://localhost:5004/rentals/active', {
                  credentials: 'include'
              });
              if (!response.ok) {
                  throw new Error('Failed to fetch active rentals');
              }
              const data = await response.json();
              // Ensure data is an array
              setActiveRentals(Array.isArray(data) ? data : []);
          } catch (error) {
              console.error('Error fetching active rentals:', error);
              setActiveRentals([]); // Set empty array on error
          }
      };
  
      fetchActiveRentals();
  }, []);

  // Keep your existing useEffect for pending requests
  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await fetch('http://localhost:5004/bikes/pending-requests', {
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch pending requests');
        }
        const data = await response.json();
        console.log('Fetched requests:', data); // Add this debug log
        setBikeRequests(data);
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    };
  
    fetchPendingRequests();
  }, []);

  // Add new useEffect for listed bikes
  useEffect(() => {
    const fetchListedBikes = async () => {
      try {
        const response = await fetch('http://localhost:5004/bikes/listed', {
          credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to fetch listed bikes');
        const data = await response.json();
        setListedBikes(data);
      } catch (error) {
        console.error('Error fetching listed bikes:', error);
      }
    };

    fetchListedBikes();
  }, []);

  // Add new useEffect for active rentals
  // Keep only this useEffect for active rentals
  useEffect(() => {
      const fetchActiveRentals = async () => {
          try {
              const response = await fetch('http://localhost:5004/rentals/active', {
                  credentials: 'include'
              });
              if (!response.ok) {
                  throw new Error('Failed to fetch active rentals');
              }
              const data = await response.json();
              console.log('Active rentals data:', data); // Add debug log
              setActiveRentals(Array.isArray(data) ? data : []);
          } catch (error) {
              console.error('Error fetching active rentals:', error);
              setActiveRentals([]);
          }
      };
  
      fetchActiveRentals();
  }, []);


  const handleOwnerClick = (owner: BikeOwner) => {
    setSelectedOwner(owner);
  };

  const handleRenterClick = (renter: Renter) => {
    setSelectedRenter(renter);
  };

  // Add these handlers before the return statement
const handleAccept = async (request: BikeRequest) => {
  try {
    const response = await fetch(`http://localhost:5004/bikes/approve/${request.id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error('Failed to approve bike');

    // Refresh the pending requests list
    const updatedRequests = bikeRequests.filter(req => req.id !== request.id);
    setBikeRequests(updatedRequests);

    // Refresh the listed bikes
    const listedResponse = await fetch('http://localhost:5004/bikes/listed', {
      credentials: 'include'
    });
    if (listedResponse.ok) {
      const data = await listedResponse.json();
      setListedBikes(data);
    }
  } catch (error) {
    console.error('Error approving bike:', error);
  }
};

const handleDeleteBike = async (bikeId: number) => {
  if (!window.confirm('Are you sure you want to delete this bike?')) {
    return;
  }

  try {
    const response = await fetch(`http://localhost:5004/bikes/delete/${bikeId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete bike');
    }

    // Remove the bike from the listed bikes
    setListedBikes(prevBikes => prevBikes.filter(bike => bike.id !== bikeId));
    
    // Remove the rental from active rentals if it exists
    setActiveRentals(prevRentals => prevRentals.filter(rental => rental.bike.id !== bikeId));
    
    alert('Bike deleted successfully');
  } catch (error) {
    console.error('Error deleting bike:', error);
    alert(error instanceof Error ? error.message : 'Failed to delete bike');
  }
};

const handleDeny = async (request: BikeRequest) => {
  try {
    const response = await fetch(`http://localhost:5004/bikes/requests/${request.id}/status`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: 'REJECTED'
      })
    });

    if (!response.ok) throw new Error('Failed to reject bike');

    // Remove the rejected request from the list
    const updatedRequests = bikeRequests.filter(req => req.id !== request.id);
    setBikeRequests(updatedRequests);
  } catch (error) {
    console.error('Error rejecting bike:', error);
  }
};

  const filteredListedBikes = listedBikes.filter(bike =>
    (bike?.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (bike?.manufacturer?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Staff Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage motorbike listings and rentals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div 
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => {
            setShowRequests(true);
            setShowListedBikes(false);
            setShowActiveRentals(false);
          }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Pending Requests</h2>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              {bikeRequests.length}
            </span>
          </div>
          <p className="mt-2 text-gray-600">Review new motorbike listing requests</p>
        </div>

        <div 
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => {
            setShowListedBikes(true);
            setShowRequests(false);
            setShowActiveRentals(false);
          }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Listed Bikes</h2>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {listedBikes.length}
            </span>
          </div>
          <p className="mt-2 text-gray-600">View all listed motorbikes</p>
        </div>

        <div 
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => {
            setShowActiveRentals(true);
            setShowRequests(false);
            setShowListedBikes(false);
          }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Active Rentals</h2>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              {activeRentals.length}
            </span>
          </div>
          <p className="mt-2 text-gray-600">Monitor ongoing rentals</p>
        </div>
      </div>

      {/* Pending Requests Section */}
      {showRequests && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Listing Requests</h2>
            <button
              onClick={() => setShowRequests(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            {bikeRequests.map((request) => (
              <div
                key={request.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={request.image}
                    alt={request.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{request.manufacturer} {request.name}</h3>
                        <span className="inline-block px-2 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded">
                          {request.category}
                        </span>
                      </div>
                      <p className="text-lg font-bold">${request.price}/day</p>
                    </div>

                    <div className="mt-2 space-y-1">
                      <div className="flex items-center text-gray-600">
                        <User className="w-4 h-4 mr-2" />
                        <span>{request.owner.name} ({request.owner.email})</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Bike className="w-4 h-4 mr-2" />
                        <span>{request.engineCapacity}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{request.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>Requested on {request.requestDate}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end space-x-4">
                      <button
                        onClick={() => handleDeny(request)}
                        className="flex items-center space-x-1 px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Deny</span>
                      </button>
                      <button
                        onClick={() => handleAccept(request)}
                        className="flex items-center space-x-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Accept</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Listed Bikes Section */}
      {showListedBikes && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Listed Bikes</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bikes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowListedBikes(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>
          </div>

          
          <div className="space-y-6">
            {filteredListedBikes.map((bike) => (
              <div
                key={bike.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{bike.manufacturer} {bike.name}</h3>
                        <span className="inline-block px-2 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded">
                          {bike.category}
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-lg font-bold">${bike.price}/day</p>
                        <button
                          onClick={() => handleDeleteBike(bike.id)}
                          className="flex items-center space-x-1 px-4 py-2 mt-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>

                    <div className="mt-2 space-y-1">
                      <div className="flex items-center text-gray-600">
                        <User className="w-4 h-4 mr-2" />
                        <span>{bike.owner}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Bike className="w-4 h-4 mr-2" />
                        <span>{bike.engineCapacity}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{bike.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Rentals Section */}
      {showActiveRentals && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Active Rentals</h2>
            <button
              onClick={() => setShowActiveRentals(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            {activeRentals.map((rental) => (
              <div
                key={rental.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={rental.bike.image}
                    alt={`${rental.bike.manufacturer} ${rental.bike.model}`}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {rental.bike.manufacturer} {rental.bike.model}
                        </h3>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <p className="text-sm text-gray-600">Total: ${rental.contract.totalAmount}</p>
                        <button
                          onClick={() => handleDeleteBike(rental.bike.id)}
                          className="flex items-center space-x-1 px-4 py-2 mt-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Renter Email</p>
                        <p className="text-blue-600">
                          {rental.renter.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Rental Period</p>
                        <p>{rental.contract.startDate} - {rental.contract.endDate}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Status</p>
                        <span className="inline-block px-2 py-1 text-sm font-medium text-green-600 bg-green-100 rounded">
                          {rental.contract.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600"></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Owner Details Modal */}
      {selectedOwner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">Owner Details</h2>
                <button
                  onClick={() => setSelectedOwner(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">{selectedOwner.name}</p>
                    <p className="text-sm text-gray-600">Member since {selectedOwner.joinDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <span>{selectedOwner.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <span>{selectedOwner.phone}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <span>{selectedOwner.address}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Bikes</p>
                    <p className="font-medium">{selectedOwner.totalBikes}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Rating</p>
                    <p className="font-medium">{selectedOwner.rating}/5.0</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Verification Status</p>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="font-medium">{selectedOwner.verificationStatus}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">ID Number</p>
                  <p className="font-medium">{selectedOwner.idNumber}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Bank Details</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <p><span className="text-gray-600">Account Name:</span> {selectedOwner.bankDetails.accountName}</p>
                    <p><span className="text-gray-600">Account Number:</span> {selectedOwner.bankDetails.accountNumber}</p>
                    <p><span className="text-gray-600">Bank:</span> {selectedOwner.bankDetails.bankName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Renter Details Modal */}
      {selectedRenter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold">Renter Details</h2>
                <button
                  onClick={() => setSelectedRenter(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium">{selectedRenter.name}</p>
                    <p className="text-sm text-gray-600">Rating: {selectedRenter.rating}/5.0</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-gray-600" />
                    <span>{selectedRenter.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-gray-600" />
                    <span>{selectedRenter.phone}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <span>{selectedRenter.address}</span>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">License Information</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <p><span className="text-gray-600">License Number:</span> {selectedRenter.licenseNumber}</p>
                    <p><span className="text-gray-600">Expiry Date:</span> {selectedRenter.licenseExpiry}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Emergency Contact</p>
                  <div className="bg-gray-50 p-3 rounded">
                    <p><span className="text-gray-600">Name:</span> {selectedRenter.emergencyContact.name}</p>
                    <p><span className="text-gray-600">Phone:</span> {selectedRenter.emergencyContact.phone}</p>
                    <p><span className="text-gray-600">Relationship:</span> {selectedRenter.emergencyContact.relationship}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Rental History</p>
                  <div className="grid grid-cols-3 gap-4 bg-gray-50 p-3 rounded">
                    <div>
                      <p className="text-gray-600">Total Rentals</p>
                      <p className="font-medium">{selectedRenter.rentalHistory.total}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Completed</p>
                      <p className="font-medium text-green-600">{selectedRenter.rentalHistory.completed}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Cancelled</p>
                      <p className="font-medium text-red-600">{selectedRenter.rentalHistory.cancelled}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Verification Status</p>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="font-medium">{selectedRenter.verificationStatus}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffDashboard;