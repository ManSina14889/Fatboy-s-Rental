import React, { useState } from 'react';
import { CheckCircle, XCircle, Bike, User, Calendar, MapPin, Clock, DollarSign, Phone, Mail, Shield, Star, Search } from 'lucide-react';

// Import the Motorbike interface and motorbikes array from Home.tsx
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

const motorbikes: Motorbike[] = [
  {
    id: 1,
    name: 'Iron 883',
    manufacturer: 'Harley-Davidson',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
    price: 75,
    location: 'Brooklyn, NY',
    rating: 4.8,
    reviews: 124,
    owner: 'John D.',
    category: 'Sport',
    engineCapacity: '883cc',
    power: '50 HP',
    weight: '564 lbs',
    fuelCapacity: '3.3 gallons',
    additionalImages: [
      'https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558980394-4c7c9299fe96?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Classic American cruiser with a powerful V-twin engine. Perfect for city rides and weekend cruising.'
  },
  {
    id: 2,
    name: 'Panigale V4',
    manufacturer: 'Ducati',
    image: 'https://cdn.bikedekho.com/processedimages/ducati/panigale-v4/source/panigale-v46756c46e25a7a.jpg',
    price: 90,
    location: 'Manhattan, NY',
    rating: 4.9,
    reviews: 89,
    owner: 'Mike R.',
    category: 'Sport',
    engineCapacity: '1103cc',
    power: '214 HP',
    weight: '381 lbs',
    fuelCapacity: '4.23 gallons',
    additionalImages: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The ultimate sports bike with cutting-edge technology and unmatched performance.'
  },
  {
    id: 3,
    name: 'PCX 150',
    manufacturer: 'Honda',
    image: 'https://thai.webike.net/news/wp-content/uploads/2016/04/1111.jpg',
    price: 45,
    location: 'Queens, NY',
    rating: 4.7,
    reviews: 156,
    owner: 'Sarah L.',
    category: 'Scooter',
    engineCapacity: '149cc',
    power: '13 HP',
    weight: '289 lbs',
    fuelCapacity: '2.1 gallons',
    additionalImages: [
      'https://images.unsplash.com/photo-1571325654970-60aa4a1e10ac?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572102882182-82320c87a092?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Efficient and stylish urban commuter with excellent fuel economy and smooth handling.'
  },
  {
    id: 4,
    name: 'MT-09',
    manufacturer: 'Yamaha',
    image: 'https://www.motorcyclenews.com/wp-images/283629/2024_yamaha_mt-09_y-amt_030.jpg',
    price: 80,
    location: 'Manhattan, NY',
    rating: 4.8,
    reviews: 92,
    owner: 'Alex K.',
    category: 'Naked',
    engineCapacity: '890cc',
    power: '117 HP',
    weight: '417 lbs',
    fuelCapacity: '3.7 gallons',
    additionalImages: [
      'https://images.unsplash.com/photo-1635073943212-f5f4786a7288?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1635073943212-f5f4786a7288?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Aggressive naked bike with thrilling performance and advanced electronics package.'
  },
  {
    id: 5,
    name: 'K1600GT',
    manufacturer: 'BMW',
    image: 'https://mcn-images.bauersecure.com/wp-images/4477/1440x960/bmw_k1600gt_01.jpg?mode=max&quality=90&scale=down',
    price: 150,
    location: 'Brooklyn, NY',
    rating: 4.9,
    reviews: 78,
    owner: 'Tom H.',
    category: 'Touring',
    engineCapacity: '1649cc',
    power: '160 HP',
    weight: '788 lbs',
    fuelCapacity: '7.0 gallons',
    additionalImages: [
      'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558980394-4c7c9299fe96?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Luxury touring motorcycle with supreme comfort and advanced features for long-distance travel.'
  },
  {
    id: 6,
    name: 'R1250GS',
    manufacturer: 'BMW',
    image: 'https://www.bmwmotorcyclesoftemecula.com/wp-content/uploads/2020/07/R1250gs.jpg',
    price: 120,
    location: 'Queens, NY',
    rating: 4.9,
    reviews: 103,
    owner: 'David M.',
    category: 'Adventure',
    engineCapacity: '1254cc',
    power: '136 HP',
    weight: '549 lbs',
    fuelCapacity: '5.3 gallons',
    additionalImages: [
      'https://images.unsplash.com/photo-1589318765667-8da49b2b6e23?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589318765667-8da49b2b6e23?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'The ultimate adventure motorcycle, capable of conquering any terrain while providing exceptional comfort.'
  }
];

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

interface ActiveRental {
  id: string;
  bike: {
    id: number;
    name: string;
    manufacturer: string;
    image: string;
    category: string;
    engineCapacity: string;
    location: string;
    price: number;
  };
  owner: BikeOwner;
  renter: Renter;
  contract: RentalContract;
}

const bikeRequests: BikeRequest[] = [
  {
    id: 1,
    name: 'Street Triple RS',
    manufacturer: 'Triumph',
    image: 'https://cdn.motor1.com/images/mgl/bgYW16/s3/2023-triumph-street-triple-rs---side-right.jpg',
    owner: {
      name: 'Michael Johnson',
      email: 'michael.j@example.com'
    },
    category: 'Naked',
    engineCapacity: '765cc',
    location: 'Manhattan, NY',
    requestDate: '2024-03-15',
    price: 85
  },
  {
    id: 2,
    name: 'Monster 1200',
    manufacturer: 'Ducati',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Ducati_Monster_1200s.jpg',
    owner: {
      name: 'Emily Wilson',
      email: 'emily.w@example.com'
    },
    category: 'Naked',
    engineCapacity: '1198cc',
    location: 'Brooklyn, NY',
    requestDate: '2024-03-14',
    price: 95
  }
];

const listedBikes = motorbikes; // Use the motorbikes array from Home.tsx

const activeRentals: ActiveRental[] = [
  {
    id: 'rent1',
    bike: {
      id: 7,
      name: 'Ninja 1000SX',
      manufacturer: 'Kawasaki',
      image: 'https://boymeetsbike.com/wp-content/uploads/2021/06/img_4507.jpg',
      category: 'Sport',
      engineCapacity: '1043cc',
      location: 'Brooklyn, NY',
      price: 110
    },
    owner: {
      id: 'own2',
      name: 'Jane Doe',
      email: 'jane.d@example.com',
      phone: '+1 (555) 123-4567',
      address: '456 Elm St, Brooklyn, NY',
      joinDate: '2023-02-15',
      totalBikes: 2,
      rating: 4.8,
      verificationStatus: 'Verified',
      idNumber: 'ID987654321',
      bankDetails: {
        accountName: 'Jane Doe',
        accountNumber: '****1234',
        bankName: 'Bank of America'
      }
    },
    renter: {
      id: 'rent2',
      name: 'Michael Smith',
      email: 'michael.s@example.com',
      phone: '+1 (555) 987-6543',
      address: '789 Oak St, Manhattan, NY',
      licenseNumber: 'L123456789',
      licenseExpiry: '2025-12-31',
      emergencyContact: {
        name: 'Sarah Smith',
        phone: '+1 (555) 246-8135',
        relationship: 'Spouse'
      },
      rentalHistory: {
        total: 10,
        completed: 9,
        cancelled: 1
      },
      rating: 4.7,
      verificationStatus: 'Verified'
    },
    contract: {
      id: 'con2',
      startDate: '2024-03-10',
      endDate: '2024-03-17',
      totalAmount: 770,
      status: 'Active',
      paymentStatus: 'Paid',
      deposit: 200,
      insurance: {
        provider: 'SafeRide Insurance',
        policyNumber: 'POL654321',
        coverage: 'Comprehensive'
      }
    }
  }
];

function StaffDashboard() {
  const [showRequests, setShowRequests] = useState(false);
  const [showListedBikes, setShowListedBikes] = useState(false);
  const [showActiveRentals, setShowActiveRentals] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<BikeRequest | null>(null);
  const [selectedOwner, setSelectedOwner] = useState<BikeOwner | null>(null);
  const [selectedRenter, setSelectedRenter] = useState<Renter | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAccept = (request: BikeRequest) => {
    console.log('Accepted request:', request);
    setSelectedRequest(null);
  };

  const handleDeny = (request: BikeRequest) => {
    console.log('Denied request:', request);
    setSelectedRequest(null);
  };

  const handleOwnerClick = (owner: BikeOwner) => {
    setSelectedOwner(owner);
  };

  const handleRenterClick = (renter: Renter) => {
    setSelectedRenter(renter);
  };

  const filteredListedBikes = listedBikes.filter(bike =>
    bike.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bike.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
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
                      <p className="text-lg font-bold">${bike.price}/day</p>
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
                      <div className="flex items-center text-gray-600">
                        <Star className="w-4 h-4 mr-2 text-yellow-400" />
                        <span>{bike.rating} ({bike.reviews} reviews)</span>
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
                    alt={rental.bike.name}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{rental.bike.manufacturer} {rental.bike.name}</h3>
                        <span className="inline-block px-2 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded">
                          {rental.bike.category}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">${rental.bike.price}/day</p>
                        <p className="text-sm text-gray-600">Total: ${rental.contract.totalAmount}</p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Owner</p>
                        <button
                          onClick={() => handleOwnerClick(rental.owner)}
                          className="text-blue-600 hover:underline"
                        >
                          {rental.owner.name}
                        </button>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Renter</p>
                        <button
                          onClick={() => handleRenterClick(rental.renter)}
                          className="text-blue-600 hover:underline"
                        >
                          {rental.renter.name}
                        </button>
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