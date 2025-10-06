import React from 'react';
import { Switch } from './ui/switch';
import { BookingData } from '../App';

interface AddExtrasPageProps {
  bookingData: BookingData;
  updateBookingData: (updates: Partial<BookingData>) => void;
}

const extras = [
  {
    name: 'Champagne Service',
    price: 100,
    description: 'Premium champagne service throughout your charter'
  },
  {
    name: 'Snorkeling Gear',
    price: 50,
    description: 'Professional snorkeling equipment for all guests'
  },
  {
    name: 'Private Chef',
    price: 300,
    description: 'Personal chef to prepare gourmet meals onboard'
  },
  {
    name: 'Jet Ski Rental',
    price: 150,
    description: 'High-performance jet ski rental per hour',
    priceUnit: 'hour'
  },
  {
    name: 'On-board Masseuse',
    price: 250,
    description: 'Professional massage therapy during your trip'
  }
];

export function AddExtrasPage({ bookingData, updateBookingData }: AddExtrasPageProps) {
  const handleExtraToggle = (extraName: string, checked: boolean) => {
    const newExtras = {
      ...bookingData.extras,
      [extraName]: checked
    };
    updateBookingData({ extras: newExtras });
  };

  const calculateExtrasTotal = () => {
    return extras.reduce((total, extra) => {
      if (bookingData.extras[extra.name]) {
        return total + extra.price;
      }
      return total;
    }, 0);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-6">Add Extras</h2>
      
      <div className="space-y-4">
        {extras.map((extra) => (
          <div key={extra.name} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium">{extra.name}</h3>
                <span className="text-black font-semibold">
                  ${extra.price}{extra.priceUnit ? `/${extra.priceUnit}` : ''}
                </span>
              </div>
              <p className="text-sm text-gray-600">{extra.description}</p>
            </div>
            
            <div className="ml-4">
              <Switch
                checked={bookingData.extras[extra.name] || false}
                onCheckedChange={(checked) => handleExtraToggle(extra.name, checked)}
              />
            </div>
          </div>
        ))}
      </div>

      {calculateExtrasTotal() > 0 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium text-black">Extras Total:</span>
            <span className="font-semibold text-black">${calculateExtrasTotal()}</span>
          </div>
        </div>
      )}
    </div>
  );
}