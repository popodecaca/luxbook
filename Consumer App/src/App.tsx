import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Check, MessageSquare } from 'lucide-react';
import { Button } from './components/ui/button';
import { DateTimePage } from './components/DateTimePage';
import { GuestCountPage } from './components/GuestCountPage';
import { SelectBoatPage } from './components/SelectBoatPage';
import { AddExtrasPage } from './components/AddExtrasPage';
import { ContactInfoPage } from './components/ContactInfoPage';
import { PaymentPage } from './components/PaymentPage';
import { ConfirmationPage } from './components/ConfirmationPage';
import { BookingAssistant } from './components/BookingAssistant';
import exampleImage from 'figma:asset/eb0ad27336f4e848fd4bc93a66da4b0dfdcf3a87.png';
import circuitAILogo from 'figma:asset/7ab125ca836ac1c4cd9690ec92d4972c47fe5dce.png';

export interface BookingData {
  selectedDate: Date | null;
  selectedTime: string;
  duration: string;
  guestCount: number;
  selectedBoat: {
    name: string;
    size: string;
    price: number;
    description: string;
    images: string[];
  } | null;
  extras: {
    [key: string]: boolean;
  };
  contactInfo: {
    fullName: string;
    phone: string;
    email: string;
    agreedToTerms: boolean;
  };
  paymentMethod: string;
}

const pageNames = [
  "Date & Time",
  "Guest Count", 
  "Select Boat",
  "Add Extras",
  "Contact Info",
  "Payment",
  "Confirmation"
];

export default function App() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [bookingData, setBookingData] = useState<BookingData>({
    selectedDate: null,
    selectedTime: '10:00 AM',
    duration: '4 hours',
    guestCount: 0,
    selectedBoat: null,
    extras: {
      'Champagne Service': false,
      'Snorkeling Gear': false,
      'Private Chef': false,
      'Jet Ski Rental': false,
      'On-board Masseuse': false,
    },
    contactInfo: {
      fullName: '',
      phone: '',
      email: '',
      agreedToTerms: false,
    },
    paymentMethod: '',
  });

  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...updates }));
  };

  const nextPage = () => {
    if (currentPage < 6) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
    setIsAssistantOpen(false);
    setCurrentPage(0);
  };

  const canProceed = () => {
    switch (currentPage) {
      case 0: // Date & Time
        return bookingData.selectedDate && bookingData.selectedTime && bookingData.duration;
      case 1: // Guest Count
        return bookingData.guestCount > 0;
      case 2: // Select Boat
        return bookingData.selectedBoat !== null;
      case 3: // Add Extras
        return true; // Optional page
      case 4: // Contact Info
        return bookingData.contactInfo.fullName && 
               bookingData.contactInfo.phone && 
               bookingData.contactInfo.email && 
               bookingData.contactInfo.agreedToTerms;
      case 5: // Payment
        return bookingData.paymentMethod !== '';
      case 6: // Confirmation
        return true;
      default:
        return false;
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return <DateTimePage bookingData={bookingData} updateBookingData={updateBookingData} />;
      case 1:
        return <GuestCountPage bookingData={bookingData} updateBookingData={updateBookingData} />;
      case 2:
        return <SelectBoatPage bookingData={bookingData} updateBookingData={updateBookingData} />;
      case 3:
        return <AddExtrasPage bookingData={bookingData} updateBookingData={updateBookingData} />;
      case 4:
        return <ContactInfoPage bookingData={bookingData} updateBookingData={updateBookingData} />;
      case 5:
        return <PaymentPage bookingData={bookingData} updateBookingData={updateBookingData} />;
      case 6:
        return <ConfirmationPage bookingData={bookingData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Main content */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl mb-4 text-gray-800">Luxury Yacht Charters</h1>
          <p className="text-xl text-gray-600 mb-8">Experience the ultimate maritime adventure</p>
        </div>
      </div>

      {/* Book Now Button */}
      <Button
        onClick={() => setIsOverlayOpen(true)}
        className="fixed bottom-6 right-6 blue-button-hover text-white px-8 py-4 text-lg rounded-2xl shadow-lg z-40"
      >
        Book Now
      </Button>

      {/* Booking Overlay */}
      {isOverlayOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-white rounded-lg shadow-xl w-[500px] h-[700px] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className="p-1"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                
                <div className="bg-blue-50/30 p-1 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAssistantOpen(!isAssistantOpen)}
                    className="p-2 bg-white border border-gray-200 text-black hover:bg-gray-50 flex items-center gap-2 shadow-md"
                  >
                    <span>Booking Assistant</span>
                    <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white px-1.5 py-0.5 rounded-full font-medium">
                      BETA
                    </span>
                  </Button>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={closeOverlay}
                className="p-1"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="px-4 py-3 border-b">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Step {currentPage + 1} of 7</span>
                <span className="text-sm font-medium">{pageNames[currentPage]}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentPage + 1) / 7) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Page Content */}
            <div className="flex-1 overflow-y-auto">
              {renderPage()}
            </div>

            {/* Footer Navigation */}
            {currentPage < 6 && (
              <div className="p-4 border-t flex justify-between">
                <Button
                  variant="outline"
                  onClick={prevPage}
                  disabled={currentPage === 0}
                >
                  Back
                </Button>
                <Button
                  onClick={nextPage}
                  disabled={!canProceed()}
                  className="blue-button-hover"
                >
                  Next
                </Button>
              </div>
            )}

            {/* Powered by CircuitAI */}
            <div className="px-4 py-3 border-t bg-gray-50/50 flex items-center justify-center gap-2 p-[0px]">
              <span className="text-sm text-gray-500">Powered by</span>
              <img 
                src={circuitAILogo} 
                alt="CircuitAI" 
                className="h-20"
              />
            </div>
          </div>
        </div>
      )}

      {/* Booking Assistant */}
      {isAssistantOpen && isOverlayOpen && (
        <BookingAssistant onClose={() => setIsAssistantOpen(false)} />
      )}
    </div>
  );
}