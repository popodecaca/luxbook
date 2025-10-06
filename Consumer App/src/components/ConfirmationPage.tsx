import React from 'react';
import { Check, Calendar, Clock, Users, Ship } from 'lucide-react';
import { Button } from './ui/button';
import { BookingData } from '../App';

interface ConfirmationPageProps {
  bookingData: BookingData;
}

export function ConfirmationPage({ bookingData }: ConfirmationPageProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return 'Not selected';
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const calculateEndTime = () => {
    if (!bookingData.selectedTime || !bookingData.duration) return '';
    
    const [time, period] = bookingData.selectedTime.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    const durationHours = parseInt(bookingData.duration.split(' ')[0]);
    
    let startHour = hours;
    if (period === 'PM' && hours !== 12) startHour += 12;
    if (period === 'AM' && hours === 12) startHour = 0;
    
    const endHour = startHour + durationHours;
    const endPeriod = endHour >= 12 ? 'PM' : 'AM';
    const displayHour = endHour > 12 ? endHour - 12 : endHour === 0 ? 12 : endHour;
    
    return `${displayHour}:${minutes.toString().padStart(2, '0')} ${endPeriod}`;
  };

  const calculateTotalPrice = () => {
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

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl mb-2">Payment Confirmed!</h2>
        <p className="text-gray-600">Your booking is confirmed and payment has been processed</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-4">Booking Summary</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-600" />
            <div>
              <p className="font-medium">Date</p>
              <p className="text-sm text-gray-600">{formatDate(bookingData.selectedDate)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-gray-600" />
            <div>
              <p className="font-medium">Time</p>
              <p className="text-sm text-gray-600">
                {bookingData.selectedTime} - {calculateEndTime()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Ship className="w-5 h-5 text-gray-600" />
            <div>
              <p className="font-medium">Yacht</p>
              <p className="text-sm text-gray-600">{bookingData.selectedBoat?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-gray-600" />
            <div>
              <p className="font-medium">Guests</p>
              <p className="text-sm text-gray-600">
                {bookingData.guestCount >= 10 ? '10+' : bookingData.guestCount} guest{bookingData.guestCount === 1 ? '' : 's'}
              </p>
            </div>
          </div>

          {Object.entries(bookingData.extras).some(([_, selected]) => selected) && (
            <div className="border-t pt-4">
              <p className="font-medium mb-2">Extras</p>
              <div className="space-y-1">
                {Object.entries(bookingData.extras).map(([extraName, isSelected]) => 
                  isSelected && (
                    <p key={extraName} className="text-sm text-gray-600">• {extraName}</p>
                  )
                )}
              </div>
            </div>
          )}

          {bookingData.paymentMethod && (
            <div className="border-t pt-4">
              <p className="font-medium mb-2">Payment Method</p>
              <p className="text-sm text-gray-600 capitalize">
                {bookingData.paymentMethod === 'card' ? 'Credit/Debit Card' : bookingData.paymentMethod}
              </p>
            </div>
          )}
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg">Total Price</span>
            <span className="font-semibold text-lg text-blue-600">${calculateTotalPrice().toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mt-4">
          <p className="text-sm text-blue-700 font-medium">Booking Reference</p>
          <p className="text-blue-600 font-mono">REF-123456</p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-600 mb-6">
        <p>A confirmation email has been sent to {bookingData.contactInfo.email}</p>
        <p className="mt-1">Please save your booking reference for your records.</p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1">
          Download Receipt
        </Button>
        <Button className="flex-1 blue-button-hover">
          View Booking Details
        </Button>
      </div>
    </div>
  );
}