import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { BookingData } from '../App';

interface ContactInfoPageProps {
  bookingData: BookingData;
  updateBookingData: (updates: Partial<BookingData>) => void;
}

export function ContactInfoPage({ bookingData, updateBookingData }: ContactInfoPageProps) {
  const handleContactInfoChange = (field: keyof BookingData['contactInfo'], value: string | boolean) => {
    const newContactInfo = {
      ...bookingData.contactInfo,
      [field]: value
    };
    updateBookingData({ contactInfo: newContactInfo });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-6">Contact Information</h2>
      
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            value={bookingData.contactInfo.fullName}
            onChange={(e) => handleContactInfoChange('fullName', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={bookingData.contactInfo.phone}
            onChange={(e) => handleContactInfoChange('phone', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={bookingData.contactInfo.email}
            onChange={(e) => handleContactInfoChange('email', e.target.value)}
          />
        </div>

        <div className="flex items-start space-x-2 pt-4">
          <Checkbox
            id="terms"
            checked={bookingData.contactInfo.agreedToTerms}
            onCheckedChange={(checked) => 
              handleContactInfoChange('agreedToTerms', checked === true)
            }
          />
          <Label htmlFor="terms" className="text-sm leading-relaxed">
            I agree to the <span className="text-blue-600 underline cursor-pointer">Terms & Conditions</span> and <span className="text-blue-600 underline cursor-pointer">Cancellation Policy</span>
          </Label>
        </div>

        {!bookingData.contactInfo.agreedToTerms && (
          <p className="text-sm text-red-600">
            Please agree to the terms and conditions to continue.
          </p>
        )}
      </div>
    </div>
  );
}