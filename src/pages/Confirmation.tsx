
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Download, Home, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

const ConfirmationPage = () => {
  const orderId = `TX-${Math.floor(Math.random() * 1000000)}`;
  const orderDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Thank You for Your Purchase!</h1>
          <p className="text-gray-600">
            Your order has been confirmed and your tickets are ready.
          </p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Order Number</p>
                <p className="font-medium">{orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{orderDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium">Credit Card (•••• 1234)</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium text-green-600">Confirmed</p>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Ticket Information</h2>
            <p className="mb-4">
              Your e-tickets have been emailed to your registered email address. You can also download them below.
            </p>
            
            <div className="bg-concert-purple/5 border border-concert-purple/20 rounded-lg p-4 mb-6">
              <div className="flex items-start">
                <Ticket className="w-5 h-5 text-concert-purple mr-3 mt-0.5" />
                <div>
                  <p className="font-medium">Important Information</p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• Please arrive at least 30 minutes before the event starts</li>
                    <li>• Bring a valid ID for verification</li>
                    <li>• Your tickets will be checked at the entrance</li>
                    <li>• Follow venue rules and guidelines for a smooth experience</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <Button className="w-full bg-concert-purple hover:bg-purple-700">
              <Download className="w-5 h-5 mr-2" />
              Download E-Tickets
            </Button>
          </div>
        </div>
        
        <div className="text-center">
          <Link to="/">
            <Button variant="outline">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ConfirmationPage;
