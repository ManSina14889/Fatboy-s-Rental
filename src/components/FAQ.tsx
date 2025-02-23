import React from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQProps {
  navigateToContact: () => void; // Function to navigate to the Contact Us page
}

function FAQ({ navigateToContact }: FAQProps) {
  const [openQuestion, setOpenQuestion] = React.useState<number | null>(null);

  const faqs = [
    {
      question: "What do I need to rent a motorcycle?",
      answer: "To rent a motorcycle, you need a valid motorcycle license, be at least 21 years old, and provide a valid ID and credit card. Insurance coverage is mandatory and included in the rental price."
    },
    {
      question: "How does the insurance work?",
      answer: "All rentals include comprehensive insurance coverage. This covers damage to the motorcycle and third-party liability. However, there is a deductible that varies based on the motorcycle model."
    },
    {
      question: "What happens if I need to cancel my reservation?",
      answer: "Cancellations made 48 hours before the rental start date receive a full refund. Cancellations within 48 hours are subject to a one-day rental fee charge."
    },
    {
      question: "Is there a mileage limit?",
      answer: "Most rentals include 150 miles per day. Additional mileage is charged at $0.50 per mile. Unlimited mileage packages are available for longer rentals."
    },
    {
      question: "What happens if the motorcycle breaks down?",
      answer: "We provide 24/7 roadside assistance for all rentals. In case of a breakdown, contact our emergency support line, and we'll either repair the motorcycle or provide a replacement."
    },
    {
      question: "Can I rent a motorcycle in one location and return it to another?",
      answer: "Yes, one-way rentals are possible between our locations. Additional fees may apply and must be arranged in advance."
    },
    {
      question: "What is the fuel policy?",
      answer: "All motorcycles are provided with a full tank of fuel. You should return the motorcycle with a full tank, or a refueling fee will be charged."
    },
    {
      question: "Do you provide riding gear?",
      answer: "We offer helmets complimentary with all rentals. Additional gear like jackets, gloves, and boots are available for rent at an extra cost."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="w-10 h-10 text-black" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">Find answers to common questions about our motorcycle rental service</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
              >
                <span className="font-semibold text-lg text-gray-900">{faq.question}</span>
                {openQuestion === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>
              {openQuestion === index && (
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Still have questions? Feel free to{' '}
            <button
              onClick={navigateToContact}
              className="text-black font-semibold hover:underline"
            >
              contact us
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FAQ;