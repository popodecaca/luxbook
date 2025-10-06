import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { BookingData } from '../App';

interface DateTimePageProps {
  bookingData: BookingData;
  updateBookingData: (updates: Partial<BookingData>) => void;
}

const timeOptions = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM'];
const durationOptions = ['2 hours', '3 hours', '4 hours', '6 hours'];

export function DateTimePage({ bookingData, updateBookingData }: DateTimePageProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 6)); // July 2024

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    updateBookingData({ selectedDate });
  };

  const isDateSelected = (day: number) => {
    if (!bookingData.selectedDate) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.toDateString() === bookingData.selectedDate.toDateString();
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = isDateSelected(day);
      const isDay5 = day === 5 && !bookingData.selectedDate; // Default selected day
      
      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          className={`h-10 w-10 flex items-center justify-center rounded-lg transition-colors ${
            isSelected || isDay5
              ? 'bg-blue-500 text-white'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  // Set default selected date if none selected
  React.useEffect(() => {
    if (!bookingData.selectedDate) {
      handleDateSelect(5);
    }
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-6">When would you like to go?</h2>

      {/* Calendar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-medium">{formatMonth(currentMonth)}</h3>
          <Button variant="ghost" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="h-10 flex items-center justify-center text-sm text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {renderCalendar()}
        </div>
      </div>

      {/* Start Time */}
      <div className="mb-8">
        <h3 className="font-medium mb-3">Start Time</h3>
        <div className="grid grid-cols-3 gap-2">
          {timeOptions.map(time => (
            <button
              key={time}
              onClick={() => updateBookingData({ selectedTime: time })}
              className={`p-3 rounded-lg border transition-colors ${
                bookingData.selectedTime === time
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Charter Duration */}
      <div>
        <h3 className="font-medium mb-3">Charter Duration</h3>
        <div className="grid grid-cols-2 gap-2">
          {durationOptions.map(duration => (
            <button
              key={duration}
              onClick={() => updateBookingData({ duration })}
              className={`p-3 rounded-lg border transition-colors ${
                bookingData.duration === duration
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {duration}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}