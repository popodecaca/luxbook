import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BookingData } from '../App';

interface GuestCountPageProps {
  bookingData: BookingData;
  updateBookingData: (updates: Partial<BookingData>) => void;
}

export function GuestCountPage({ bookingData, updateBookingData }: GuestCountPageProps) {
  const handleGuestCountChange = (value: string) => {
    if (value === '13+') {
      const guestCount = 14; // Use 14 to indicate 13+ for backend processing
      updateBookingData({ guestCount });
    } else {
      const guestCount = parseInt(value);
      updateBookingData({ guestCount });
    }
  };

  const getDisplayValue = () => {
    if (bookingData.guestCount === 0) return '';
    if (bookingData.guestCount >= 14) return '13+';
    return bookingData.guestCount.toString();
  };

  const getDisplayText = () => {
    if (bookingData.guestCount >= 14) return '13+ guests (inquiry required)';
    if (bookingData.guestCount > 1) return `${bookingData.guestCount} guests`;
    if (bookingData.guestCount === 1) return '1 guest';
    return '';
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-6">How many guests?</h2>
      
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Number of Guests
        </label>
        
        <Select 
          value={getDisplayValue()}
          onValueChange={handleGuestCountChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select number of guests" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 guest</SelectItem>
            <SelectItem value="2">2 guests</SelectItem>
            <SelectItem value="3">3 guests</SelectItem>
            <SelectItem value="4">4 guests</SelectItem>
            <SelectItem value="5">5 guests</SelectItem>
            <SelectItem value="6">6 guests</SelectItem>
            <SelectItem value="7">7 guests</SelectItem>
            <SelectItem value="8">8 guests</SelectItem>
            <SelectItem value="9">9 guests</SelectItem>
            <SelectItem value="10">10 guests</SelectItem>
            <SelectItem value="11">11 guests</SelectItem>
            <SelectItem value="12">12 guests</SelectItem>
            <SelectItem value="13">13 guests</SelectItem>
            <SelectItem value="13+">13+ Inquire</SelectItem>
          </SelectContent>
        </Select>

        {bookingData.guestCount > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              {bookingData.guestCount >= 14 
                ? "Perfect! For 13+ guests, we'll need to discuss special arrangements. Our team will contact you to ensure the best experience."
                : `Perfect! We'll prepare the yacht for ${getDisplayText()}.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}