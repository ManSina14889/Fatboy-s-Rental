import React from 'react';
import { Shield, Clock, CreditCard, ThumbsUp, Users, HeartHandshake } from 'lucide-react';

interface LearnMoreProps {
  onRentalsClick: () => void;
}

function LearnMore({ onRentalsClick }: LearnMoreProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Our Service</h1>
          <p className="text-xl text-gray-600">Discover why Fatboy's Rental is the best choice for your motorbike rental needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
            <p className="text-gray-600">All rentals are insured and we verify all users for your safety and peace of mind</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Flexible Rentals</h3>
            <p className="text-gray-600">Rent by the day, week, or month with easy pickup and return options</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Payments</h3>
            <p className="text-gray-600">Secure payment processing with multiple payment options available</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">Why Choose Us?</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <ThumbsUp className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-2">Quality Assurance</h3>
                <p className="text-gray-600">All motorbikes on our platform undergo regular maintenance checks and must meet our strict quality standards.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-2">Community-Driven</h3>
                <p className="text-gray-600">Join our community of motorbike enthusiasts and share your passion for riding with others.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                <HeartHandshake className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Our dedicated support team is always ready to assist you with any questions or concerns.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg mb-6">Join thousands of satisfied riders who trust Fatboy's Rental for their motorbike adventures.</p>
          <button 
            onClick={onRentalsClick}
            className="bg-white text-black py-3 px-8 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Browse Motorbikes
          </button>
        </div>
      </div>
    </div>
  );
}

export default LearnMore;