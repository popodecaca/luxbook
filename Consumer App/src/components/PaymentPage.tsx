import React from 'react';
import { CreditCard, Smartphone, DollarSign } from 'lucide-react';
import { BookingData } from '../App';

interface PaymentPageProps {
  bookingData: BookingData;
  updateBookingData: (updates: Partial<BookingData>) => void;
}

const paymentMethods = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Pay securely with your credit or debit card',
    icon: CreditCard,
    popular: true
  },
  {
    id: 'zelle',
    name: 'Zelle',
    description: 'Quick bank-to-bank transfer',
    icon: DollarSign,
    popular: false
  },
  {
    id: 'venmo',
    name: 'Venmo',
    description: 'Pay with your Venmo account',
    icon: Smartphone,
    popular: false
  },
  {
    id: 'cashapp',
    name: 'Cash App',
    description: 'Send payment via Cash App',
    icon: Smartphone,
    popular: false
  }
];

export function PaymentPage({ bookingData, updateBookingData }: PaymentPageProps) {
  const calculateTotal = () => {
    let total = bookingData.selectedBoat?.price || 0;
    
    // Add extras
    const extrasPrice = Object.entries(bookingData.extras).reduce((sum, [extraName, isSelected]) => {
      if (!isSelected) return sum;
      
      const extraPrices: { [key: string]: number } = {
        'Champagne Service': 100,
        'Snorkeling Gear': 50,
        'Private Chef': 300,
        'Jet Ski Rental': 150,
        'On-board Masseuse': 250,
      };
      
      return sum + (extraPrices[extraName] || 0);
    }, 0);
    
    return total + extrasPrice;
  };

  const handlePaymentMethodSelect = (methodId: string) => {
    updateBookingData({ paymentMethod: methodId });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-6">Payment Method</h2>
      
      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-medium mb-3">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>{bookingData.selectedBoat?.name} ({bookingData.duration})</span>
            <span>${bookingData.selectedBoat?.price}</span>
          </div>
          
          {Object.entries(bookingData.extras).map(([extraName, isSelected]) => {
            if (!isSelected) return null;
            
            const extraPrices: { [key: string]: number } = {
              'Champagne Service': 100,
              'Snorkeling Gear': 50,
              'Private Chef': 300,
              'Jet Ski Rental': 150,
              'On-board Masseuse': 250,
            };
            
            const price = extraPrices[extraName] || 0;
            return (
              <div key={extraName} className="flex justify-between">
                <span>{extraName}</span>
                <span>${price}</span>
              </div>
            );
          })}
          
          <div className="border-t pt-2 font-semibold">
            <div className="flex justify-between">
              <span>Total</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-3">
        <h3 className="font-medium mb-3">Choose Payment Method</h3>
        
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <div
              key={method.id}
              onClick={() => handlePaymentMethodSelect(method.id)}
              className={`border rounded-lg p-4 cursor-pointer transition-all relative ${
                bookingData.paymentMethod === method.id
                  ? 'border-blue-500 border-2 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {method.popular && (
                <div className="absolute -top-2 left-4 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  Most Popular
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${
                  bookingData.paymentMethod === method.id 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium">{method.name}</h4>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
                
                {bookingData.paymentMethod === method.id && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {bookingData.paymentMethod && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            After clicking "Next", you'll be redirected to complete your payment securely.
          </p>
        </div>
      )}
    </div>
  );
}